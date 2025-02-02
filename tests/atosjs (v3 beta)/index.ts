import { gift } from "./atos.config";

async function main() {
    const giftId = await gift.generate({
        type: "test",
        value: { id: 1, wallet: { coins: 100, bank: true } },
        expiration: "7d",
    })

    console.log(`Generated gift with ID: ${giftId}`);

};

main();
console.log("Hello via Bun!");