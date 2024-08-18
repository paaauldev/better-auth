import { betterAuth } from "better-auth";

export const auth = betterAuth({
	basePath: "/api/auth",
	providers: [],
	database: {
		provider: "sqlite",
		url: "./db.sqlite",
	},
	secret: process.env.AUTH_SECRET as string,
});