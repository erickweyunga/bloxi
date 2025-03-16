import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import { execSync } from "child_process";

interface CreateAppOptions {
  appPath: string;
  appName: string;
  template: string;
  useYarn: boolean;
  useGit: boolean;
  useTypeScript: boolean;
}

export async function createApp({
  appPath,
  appName,
  template,
  useYarn,
  useGit,
  useTypeScript,
}: CreateAppOptions): Promise<void> {
  const root = path.resolve(appPath);
  const packageJsonPath = path.join(root, "package.json");

  if (!fs.existsSync(root)) {
    fs.ensureDirSync(root);
  } else {
    const files = fs.readdirSync(root);
    if (files.length > 0) {
      console.log(`The directory ${chalk.green(appName)} is not empty.`);
      console.log();
      console.log("Try using a new directory name, or remove the files first.");
      process.exit(1);
    }
  }

  console.log(`Creating a new Bloxi app in ${chalk.green(root)}.`);
  console.log();

  // Create package.json
  const packageJson = {
    name: appName,
    version: "0.1.0",
    private: true,
    scripts: {
      dev: "vite",
      build: "vite build",
      serve: "vite preview",
      typecheck: "tsc --noEmit",
    },
    dependencies: {
      "@bloxi/core": "^0.1.0",
      react: "^18.2.0",
      "react-dom": "^18.2.0",
    },
    devDependencies: {
      "@types/react": "^18.0.12",
      "@types/react-dom": "^18.0.5",
      typescript: "^4.7.3",
      vite: "^2.9.10",
      "@vitejs/plugin-react": "^1.3.2",
    },
  };

  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2) + "\n"
  );

  // Copy template files
  const templateDir = path.resolve(
    __dirname,
    "../template",
    useTypeScript ? "typescript" : "javascript",
    template
  );

  if (fs.existsSync(templateDir)) {
    fs.copySync(templateDir, root);
  } else {
    console.error(
      `Could not locate supplied template: ${chalk.red(templateDir)}`
    );
    return;
  }

  // Rename gitignore to .gitignore
  const gitignorePath = path.join(root, "gitignore");
  if (fs.existsSync(gitignorePath)) {
    fs.renameSync(gitignorePath, path.join(root, ".gitignore"));
  }

  // Change directory to the new app
  process.chdir(root);

  // Initialize git repo
  if (useGit) {
    try {
      execSync("git init", { stdio: "ignore" });
      execSync("git add .", { stdio: "ignore" });
      execSync('git commit -m "Initial commit from Create Bloxi App"', {
        stdio: "ignore",
      });
      console.log("Initialized a git repository.");
      console.log();
    } catch (error) {
      console.warn("Git initialization failed. Continuing without git.");
    }
  }

  // Install dependencies
  console.log("Installing packages. This might take a few minutes.");
  console.log();

  try {
    const installCommand = useYarn ? "yarn" : "npm install";
    execSync(installCommand, { stdio: "inherit" });
    console.log();
  } catch (error) {
    console.error("Failed to install packages.");
    console.error(error);
    process.exit(1);
  }

  // Display success message
  console.log(
    `Success! Created ${chalk.green(appName)} at ${chalk.green(appPath)}`
  );
  console.log("Inside that directory, you can run several commands:");
  console.log();
  console.log(chalk.cyan(`  ${useYarn ? "yarn" : "npm run"} dev`));
  console.log("    Starts the development server.");
  console.log();
  console.log(chalk.cyan(`  ${useYarn ? "yarn" : "npm run"} build`));
  console.log("    Bundles the app into static files for production.");
  console.log();
  console.log(chalk.cyan(`  ${useYarn ? "yarn" : "npm run"} serve`));
  console.log("    Serves the built app locally.");
  console.log();
  console.log("We suggest that you begin by typing:");
  console.log();
  console.log(chalk.cyan("  cd"), appName);
  console.log(`  ${chalk.cyan(`${useYarn ? "yarn" : "npm run"} dev`)}`);
  console.log();
  console.log("Happy coding!");
}
