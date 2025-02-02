import fs from "fs";
import path from "node:path";
import chalk from "chalk";
import consola from "consola";

import { classesMenu } from "./classes";
import { databaseMenu } from "./database";
import { languageMenu } from './language';
import { generateConfigFile, generateDotenvFile } from "../templates/functions";

const PackageJsonPath = path.join(__dirname, "../../../package.json");
const packageJSON = JSON.parse(fs.readFileSync(PackageJsonPath, "utf-8"));

export default async function initialMenu() {
    consola.box({
        title: chalk.hex("#6C5CE7").bold("🚀 AtosJS CLI"),
        message: chalk.gray(
            "Welcome to AtosJS CLI! Choose the classes you want to use."
        ),
    });

    console.log(
        chalk.blue.bold("$ AtosJS CLI 📦 ") +
        chalk.gray.underline(`v${packageJSON.version}`)
    );
    console.log();

    // Get the selected classes
    const selectedClasses = await classesMenu();

    // Check if the GiftManager class was selected
    const hasGiftManager = selectedClasses.includes('GiftManager');

    // If the GiftManager class was selected, show the database menu
    let selectedDatabase = null;
    if (hasGiftManager) {
        selectedDatabase = await databaseMenu();
    }

    // Get the selected language
    const selectedLanguage = await languageMenu();

    // Generate the config file
    await generateConfigFile(selectedClasses, selectedDatabase, selectedLanguage);
    await generateDotenvFile(selectedClasses, selectedDatabase);

    // Display the results
    // console.log({
    //     selectedClasses,
    //     selectedDatabase,
    //     selectedLanguage,
    // });
}