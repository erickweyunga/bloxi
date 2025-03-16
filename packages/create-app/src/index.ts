#!/usr/bin/env node

import path from "path";
import chalk from "chalk";
import { Command } from "commander";
import prompts from "prompts";
import { createApp } from "./createApp";

const packageJson = require("../package.json");

let projectPath = "";

const program = new Command(packageJson.name)
  .version(packageJson.version)
  .arguments("<project-directory>")
  .usage(`${chalk.green("<project-directory>")} [options]`)
  .action((name) => {
    projectPath = name;
  })
  .option(
    "--template <template-name>",
    "specify a template for the created project"
  )
  .option("--ts, --typescript", "use TypeScript template", true)
  .option("--use-npm", "use npm instead of yarn", false)
  .option("--skip-git", "skip git initialization", false)
  .allowUnknownOption()
  .parse(process.argv);

const options = program.opts();

async function run() {
  if (!projectPath) {
    const res = await prompts({
      type: "text",
      name: "projectPath",
      message: "What is your project named?",
      initial: "my-bloxi-app",
    });

    if (typeof res.projectPath === "string") {
      projectPath = res.projectPath.trim();
    }
  }

  if (!projectPath) {
    console.log();
    console.log("Please specify the project directory:");
    console.log(
      `  ${chalk.cyan(program.name())} ${chalk.green("<project-directory>")}`
    );
    console.log();
    console.log("For example:");
    console.log(
      `  ${chalk.cyan(program.name())} ${chalk.green("my-bloxi-app")}`
    );
    console.log();
    process.exit(1);
  }

  const resolvedProjectPath = path.resolve(projectPath);
  const projectName = path.basename(resolvedProjectPath);

  const template = options.template || "default";
  const useYarn = !options.useNpm;
  const useGit = !options.skipGit;

  try {
    await createApp({
      appPath: resolvedProjectPath,
      appName: projectName,
      template,
      useYarn,
      useGit,
      useTypeScript: options.typescript,
    });
  } catch (error) {
    console.log();
    console.log("Aborting installation.");
    if (error instanceof Error && 'command' in error) {
      console.log(`  ${chalk.cyan(error.command)} has failed.`);
    } else {
      console.log(chalk.red("Unexpected error. Please report it as a bug:"));
      console.log(error);
    }
    console.log();
    process.exit(1);
  }
}

run();
