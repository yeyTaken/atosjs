import { classesMenu, databaseMenu } from '../../../src/cli';

async function QuickDbTemplate() {
    const selectedDatabase = await databaseMenu();
    const selectedClasses = await classesMenu();
    
    if (selectedDatabase.name === "MongoDB" && selectedClasses.includes('GiftManager')) {
        const quickDbGiftManagerTS = `
        import { GiftManager } from 'atosjs';

        const gift = new GiftManager({
            dbLocal: {
                filePath: selectedDatabase.filePath
            }
        });
        `;

        return quickDbGiftManagerTS;
    }
    
};

QuickDbTemplate();
