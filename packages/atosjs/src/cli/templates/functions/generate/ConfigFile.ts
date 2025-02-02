import path from "node:path";
import { Spinner } from "cli-spinner";
import consola from "consola";
import chalk from "chalk";
import fs from "fs";

import { generateJSConfig } from "./JSConfig";
import { generateMJSConfig } from "./MJSConfig";
import { generateTSConfig } from "./TSConfig";

export async function generateConfigFile(
    selectedClasses: string[],
    selectedDatabase: any,
    selectedLanguage: any
) {
    const configFilePath = path.join(process.cwd(), `atos.config${selectedLanguage.selectedExtension || selectedLanguage.extensions[0]}`);

    let configContent = '';

    if (selectedLanguage.name === 'TypeScript') {
        configContent = generateTSConfig(selectedClasses, selectedDatabase);
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