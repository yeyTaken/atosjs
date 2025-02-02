import fs from "fs";
import path from "node:path";
import chalk from "chalk";
import consola from "consola";
import { classesMenu } from "./classes";
import { databaseMenu } from "./database";
import { languageMenu } from './language';
import { Spinner } from 'cli-spinner';

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

    // Display the results
    // console.log({
    //     selectedClasses,
    //     selectedDatabase,
    //     selectedLanguage,
    // });
}

async function generateConfigFile(selectedClasses: string[], selectedDatabase: any, selectedLanguage: any) {
    const configFilePath = path.join(process.cwd(), `atos.config${selectedLanguage.selectedExtension || selectedLanguage.extensions[0]}`);

    let configContent = '';

    if (selectedLanguage.name === 'TypeScript') {
        configContent = generateTypeScriptConfig(selectedClasses, selectedDatabase);
    } else if (selectedLanguage.name === 'JavaScript (ES6)' && selectedLanguage.selectedExtension === '.mjs') {
        configContent = generateMJSConfig(selectedClasses, selectedDatabase);
    } else if (selectedLanguage.name === 'JavaScript (ES6)' && selectedLanguage.selectedExtension === '.js') {
        configContent = generateMJSConfig(selectedClasses, selectedDatabase);
    } else {
        configContent = generateJSConfig(selectedClasses, selectedDatabase);
    }

    // Use cli-spinner to show the creation of the file
    console.log();
    const spinner = new Spinner('Creating configuration file...');
    spinner.setSpinnerString(18);
    spinner.start();

    // Simulate a wait of 3 seconds
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Write the config file
    fs.writeFileSync(configFilePath, configContent, 'utf-8');

    spinner.stop(true);
    consola.success(`Configuration file created at: ${chalk.green(configFilePath)}`);
}

function generateTypeScriptConfig(selectedClasses: string[], selectedDatabase: any): string {
    let configContent = ``;

    // Create the import in a single line
    if (selectedClasses.length > 0) {
        configContent += `import { ${selectedClasses.join(", ")} } from 'atosjs';\n\n`;
    }

    if (selectedClasses.includes('TimeFormat')) {
        configContent += `export const time = new TimeFormat();\n\n`;
    }

    if (selectedClasses.includes('GiftManager') && selectedDatabase) {
        if (selectedDatabase.name === 'MongoDB') {
            configContent += `export const gift = new GiftManager({\n`;
            configContent += `  mongodb: {\n`;
            configContent += `    connect: '${selectedDatabase.MongoUri}',\n`;
            configContent += `    dbName: '${selectedDatabase.databaseName}',\n`;
            configContent += `  },\n`;
            configContent += `});\n\n`;
        } else if (selectedDatabase.name === 'QuickDB') {
            configContent += `export const gift = new GiftManager({\n`;
            configContent += `  dbLocal: {\n`;
            configContent += `    filePath: '${selectedDatabase.filePath}',\n`;
            configContent += `  },\n`;
            configContent += `});\n\n`;
        }
    }

    return configContent;
}

function generateMJSConfig(selectedClasses: string[], selectedDatabase: any): string {
    let configContent = ``;

    // Create the import in a single line
    if (selectedClasses.length > 0) {
        configContent += `import { ${selectedClasses.join(", ")} } from 'atosjs';\n\n`;
    }

    if (selectedClasses.includes('TimeFormat')) {
        configContent += `export const time = new TimeFormat();\n\n`;
    }

    if (selectedClasses.includes('GiftManager') && selectedDatabase) {
        if (selectedDatabase.name === 'MongoDB') {
            configContent += `export const gift = new GiftManager({\n`;
            configContent += `  mongodb: {\n`;
            configContent += `    connect: '${selectedDatabase.MongoUri}',\n`;
            configContent += `    dbName: '${selectedDatabase.databaseName}',\n`;
            configContent += `  },\n`;
            configContent += `});\n\n`;
        } else if (selectedDatabase.name === 'QuickDB') {
            configContent += `export const gift = new GiftManager({\n`;
            configContent += `  dbLocal: {\n`;
            configContent += `    filePath: '${selectedDatabase.filePath}',\n`;
            configContent += `  },\n`;
            configContent += `});\n\n`;
        }
    }

    return configContent;
}

function generateJSConfig(selectedClasses: string[], selectedDatabase: any): string {
    let configContent = ``;
    let exportsList: string[] = [];

    // Create the import line in a single line
    if (selectedClasses.length > 0) {
        configContent += `const { ${selectedClasses.join(", ")} } = require('atosjs');\n\n`;
    }

    if (selectedClasses.includes('TimeFormat')) {
        configContent += `const time = new TimeFormat();\n\n`;
        exportsList.push("time");
    }

    if (selectedClasses.includes('GiftManager') && selectedDatabase) {
        if (selectedDatabase.name === 'MongoDB') {
            configContent += `const gift = new GiftManager({\n`;
            configContent += `  mongodb: {\n`;
            configContent += `    connect: '${selectedDatabase.MongoUri}',\n`;
            configContent += `    dbName: '${selectedDatabase.databaseName}',\n`;
            configContent += `  },\n`;
            configContent += `});\n\n`;
        } else if (selectedDatabase.name === 'QuickDB') {
            configContent += `const gift = new GiftManager({\n`;
            configContent += `  dbLocal: {\n`;
            configContent += `    filePath: '${selectedDatabase.filePath}',\n`;
            configContent += `  },\n`;
            configContent += `});\n\n`;
        }
        exportsList.push("gift");
    }

    if (exportsList.length > 0) {
        configContent += `module.exports = { ${exportsList.join(", ")} };`;
    }

    return configContent;
}
