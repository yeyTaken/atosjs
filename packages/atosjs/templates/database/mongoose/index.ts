import { classesMenu, databaseMenu } from '../../../src/cli';

async function MongoDbTemplate() {
    const selectedDatabase = await databaseMenu();
    const selectedClasses = await classesMenu();
    
    if (selectedDatabase.name === "MongoDB" && selectedClasses.includes('GiftManager')) {
        const mongoDbGiftManagerTS = `
        import { GiftManager } from 'atosjs';

        const gift = new GiftManager({
            mongodb: {
                connect: selectedDatabase.MongoUri!,
                dbName: selectedDatabase.databaseName,
            }
        });
        `;

        return mongoDbGiftManagerTS;
    }
    
};

MongoDbTemplate();
