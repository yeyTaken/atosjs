const { gift } = require("./atos.config");

async function main() {
    const giftId = await gift.generate({
        value: 100,
        type: "gift card",
    });

    console.log(`Generated gift with ID: ${giftId}`);
};

main();