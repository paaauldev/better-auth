import { and, eq, or, SQL } from "drizzle-orm";
import type { Adapter, Where } from "../../types";
import type { FieldType } from "../../db";
import * as prettier from "prettier";
import { getAuthTables } from "../../db/get-tables";
import { existsSync } from "fs";
import fs from "fs/promises";
import { BetterAuthError } from "../../error/better-auth-error";

export interface DrizzleAdapterOptions {
	schema?: Record<string, any>;
	provider: "pg" | "mysql" | "sqlite";
}

function getSchema(modelName: string, schema: Record<string, any>) {
	const key = Object.keys(schema).find((key) => {
		const modelName = schema[key].name;
		return modelName === modelName;
	});
	if (!key) {
		throw new Error("Model not found");
	}
	return schema[key];
}

function whereConvertor(where: Where[], schemaModel: any) {
	if (!where) return [];
	if (where.length === 1) {
		const w = where[0];
		if (!w) {
			return [];
		}
		return [eq(schemaModel[w.field], w.value)];
	}
	const andGroup = where.filter((w) => w.connector === "AND" || !w.connector);
	const orGroup = where.filter((w) => w.connector === "OR");

	const andClause = and(
		...andGroup.map((w) => {
			return eq(schemaModel[w.field], w.value);
		}),
	);
	const orClause = or(
		...orGroup.map((w) => {
			return eq(schemaModel[w.field], w.value);
		}),
	);
	const clause: SQL<unknown>[] = [];

	if (andGroup.length) clause.push(andClause!);
	if (orGroup.length) clause.push(orClause!);
	return clause;
}

interface DB {
	[key: string]: any;
}

export const drizzleAdapter = (
	db: DB,
	options: DrizzleAdapterOptions,
): Adapter => {
	const schema = options?.schema || db._.schema;
	if (!schema) {
		throw new BetterAuthError(
			"Drizzle adapter failed to initialize. Schema not found. Please provide a schema object in the adapter options object.",
		);
	}
	const databaseType = options?.provider;
	return {
		id: "drizzle",
		async create(data) {
			const { model, data: val } = data;
			const schemaModel = getSchema(model, schema);
			const res = await db.insert(schemaModel).values(val).returning();
			return res[0];
		},
		async findOne(data) {
			const { model, where, select: included } = data;
			const schemaModel = getSchema(model, schema);
			const wheres = whereConvertor(where, schemaModel);

			let res = null;
			if (!!included?.length) {
				res = await db
					.select(
						...included.map((include) => {
							return {
								[include]: schemaModel[include],
							};
						}),
					)
					.from(schemaModel)
					.where(...wheres);
			} else {
				res = await db
					.select()
					.from(schemaModel)
					.where(...wheres);
			}

			if (!!res.length) return res[0];
			else return null;
		},
		async findMany(data) {
			const { model, where } = data;
			const schemaModel = getSchema(model, schema);
			const wheres = where ? whereConvertor(where, schemaModel) : [];

			return await db
				.select()
				.from(schemaModel)
				.findMany(...wheres);
		},
		async update(data) {
			const { model, where, update } = data;
			const schemaModel = getSchema(model, schema);
			const wheres = whereConvertor(where, schemaModel);
			const res = await db
				.update(schemaModel)
				.set(update)
				.where(...wheres)
				.returning();
			return res[0];
		},
		async delete(data) {
			const { model, where } = data;
			const schemaModel = getSchema(model, schema);
			const wheres = whereConvertor(where, schemaModel);
			const res = await db.delete(schemaModel).where(...wheres);

			return res[0];
		},
		async createSchema(options, file) {
			const tables = getAuthTables(options);
			const filePath = file || "./schema.ts";
			const timestampAndBoolean =
				databaseType !== "sqlite" ? "timestamp, boolean" : "";
			const int = databaseType === "mysql" ? "int" : "integer";
			let code = "";

			const fileExist = existsSync(filePath);
			if (fileExist) {
				const file = await fs.readFile(filePath, "utf-8");
				if (file.includes("import")) {
					code = file;
				} else {
					code = `import { ${databaseType}Table, text, ${int}, ${timestampAndBoolean} } from "drizzle-orm/${databaseType}-core";
				`;
				}
			} else {
				code = `import { ${databaseType}Table, text, ${int}, ${timestampAndBoolean} } from "drizzle-orm/${databaseType}-core";
			`;
			}

			for (const table in tables) {
				const tableName = tables[table].tableName;
				const fields = tables[table].fields;
				function getType(name: string, type: FieldType) {
					if (type === "string") {
						return `text('${name}')`;
					}
					if (type === "number") {
						return `${int}('${name}')`;
					}
					if (type === "boolean") {
						if (databaseType === "sqlite") {
							return `integer('${name}', {
								mode: "boolean"
							})`;
						}
						return `boolean('${name}')`;
					}
					if (type === "date") {
						if (databaseType === "sqlite") {
							return `integer('${name}', {
								mode: "timestamp"
							})`;
						}
						return `timestamp('${name}')`;
					}
				}
				const schema = `export const ${table} = ${databaseType}Table("${tableName}", {
					id: text("id").primaryKey(),
					${Object.keys(fields)
						.map((field) => {
							const attr = fields[field];
							return `${field}: ${getType(field, attr.type)}${
								attr.required ? ".notNull()" : ""
							}${attr.unique ? ".unique()" : ""}${
								attr.references
									? `.references(()=> ${attr.references.model}.${attr.references.field})`
									: ""
							}`;
						})
						.join()}
				});`;
				code += `\n${schema}\n`;
			}
			const formattedCode = await prettier.format(code, {
				semi: true,
				parser: "typescript",
				tabWidth: 4,
			});
			return {
				code: formattedCode,
				fileName: filePath,
				append: fileExist,
			};
		},
	};
};
