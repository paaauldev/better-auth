#!/usr/bin/env node

import { Command } from "commander";
import "dotenv/config";
import { migrate } from "./commands/migrate";
import { generate } from "./commands/generate";
async function main() {
	const program = new Command().name("better-auth");
	program.addCommand(migrate).addCommand(generate);
	program.parse();
}

main();
