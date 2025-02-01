import fs from "fs";
import path from "node:path";
import chalk from "chalk";
import consola from "consola";
import { classesMenu } from "./classes";
import { databaseMenu } from "./database";
import figlet from "figlet";

const PackageJsonPath = path.join(__dirname, "../../../package.json");

const packageJSON = JSON.parse(fs.readFileSync(PackageJsonPath, "utf-8"));

export default async function initialMenu() {
  consola.box({
    title: chalk.hex("#6C5CE7").bold("🚀 AtosJS CLI"),
    message: chalk.gray(
      "Bem-vindo ao AtosJS CLI! Escolha as classes que deseja usar."
    ),
  });

  console.log(
    chalk.blue.bold("$ AtosJS CLI 📦 ") +
      chalk.gray.underline(`v${packageJSON.version}`)
  );
  console.log();

  const selectedClasses = await classesMenu();

  if (selectedClasses.includes("GiftManager")) {
    const selectedDatabase = await databaseMenu();
    consola.success(
      chalk.green.bold("Banco de dados selecionado: ") +
        chalk.blue.bold(selectedDatabase.name)
    );
    console.log({
      selectedDatabase,
      selectedClasses,
    });
  }
}
