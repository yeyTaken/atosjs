export function generateJSConfig(selectedClasses: string[], selectedDatabase: any): string {
    let configContent = ``;
    let exportsList: string[] = [];

    const isMongoDBWithGiftManager = selectedClasses.includes('GiftManager') && selectedDatabase?.name === 'MongoDB';

    
    if (selectedClasses.length > 0) {
        configContent += `const { ${selectedClasses.join(", ")} } = require('atosjs');\n\n`;
    }
    
    if (isMongoDBWithGiftManager) {
        configContent += `require('dotenv/config');\n\n`;
    }

    if (selectedClasses.includes('TimeFormat')) {
        configContent += `const time = new TimeFormat();\n\n`;
        exportsList.push("time");
    }

    if (selectedClasses.includes('GiftManager') && selectedDatabase) {
        if (selectedDatabase.name === 'MongoDB') {
            configContent += `const gift = new GiftManager({\n`;
            configContent += `  mongodb: {\n`;
            configContent += `    connect: process.env.MONGO_URI,\n`;
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