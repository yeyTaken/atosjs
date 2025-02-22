const { gift } = require("./atos.config");

async function main() {
    const giftId = await gift.generate({
        type: "gift card",
        value: 100,
    });

    console.log(`Generated gift with ID: ${giftId}`);
};

main();