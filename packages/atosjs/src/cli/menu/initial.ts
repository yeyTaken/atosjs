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

    // Gerar o arquivo de configuração
    await generateConfigFile(selectedClasses, selectedDatabase, selectedLanguage);

    // Exibir os resultados
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

    // Usar cli-spinner para mostrar a criação do arquivo
    console.log();
    const spinner = new Spinner('Criando arquivo de configuração...');
    spinner.setSpinnerString(18);
    spinner.start();

    // Simular uma espera de 3 segundos
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Escrever o arquivo de configuração
    fs.writeFileSync(configFilePath, configContent, 'utf-8');

    spinner.stop(true);
    consola.success(`Arquivo de configuração criado em: ${chalk.green(configFilePath)}`);
}

function generateTypeScriptConfig(selectedClasses: string[], selectedDatabase: any): string {
    let configContent = ``;

    // Criar a importação em uma única linha
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

    // Criar a importação em uma única linha
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

    // Criar a linha de importação em uma única linha
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
