import fs from "fs";
import path from "node:path";
import chalk from "chalk";
import consola from "consola";
import { classesMenu } from "./classes";
import { databaseMenu } from "./database";
import { languageMenu } from './language';

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

    // Obter as classes selecionadas
    const selectedClasses = await classesMenu();

    // Verificar se a classe GiftManager foi selecionada
    const hasGiftManager = selectedClasses.includes('GiftManager');

    // Se a classe GiftManager foi selecionada, mostrar o menu de banco de dados
    let selectedDatabase = null;
    if (hasGiftManager) {
        selectedDatabase = await databaseMenu();
    }

    // Obter a linguagem selecionada
    const selectedLanguage = await languageMenu();

    // Exibir os resultados
    console.log({
        selectedClasses,
        selectedDatabase,
        selectedLanguage,
    });
}