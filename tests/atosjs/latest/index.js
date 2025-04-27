const { t, gift } = require("./atos.config");

// TimeFormat
(async () => {
  console.log(t.ms("1s")); // 1000
  console.log(t.ms(1000)); // 1s

  t.time(1000, 3, (count) => {
    console.log(`repeat ${count}.`);
  });

  t.time(t.ms("3.5s"), () => console.log("timeout."));

  await t.sleep(t.ms("10s"));
  console.log("10 seconds passed.");

  const task1 = async () => {
    console.log("Task 1 started");
    await t.sleep(t.ms("1m"));
    console.log("Task 1 finished");
  };

  const task2 = async () => {
    console.log("Task 2 started");
    await t.sleep(t.ms("5s"));
    console.log("Task 2 finished");
  };

  // Execução na ordem:
  // 1. Task1 (1 minuto)
  // 2. Task2 (5 segundo)
  // 3. "All tasks completed"
  t.queue([task1, task2])
    .then(() => console.log("All tasks completed."))
    .catch((error) => console.error("Error in tasks:", error));
})();

// GiftManager
(async () => {

  // gift example one
  const giftCoin = await gift.generate({
    type: "coin",
    value: 100
  });

  console.log({
    GiftId: giftCoin,
    log: await gift.view(giftCoin)
  });

  // gift example two
  const PROMOTION = await gift.generate({
    type: "CUPOM",
    value: 30,
    maxRedeem: 13,
    edit: {
      code: "NATAL2026"
    }
  });

  console.log({
    GiftId: PROMOTION,
    log: await gift.view(PROMOTION)
  });

})();



// const { GiftManager } = require("atosjs");
// const gift = new GiftManager();

// (async () => {
// const invalidCode = 'UYFSGDYUTFGU';
// const coin = await gift.generate({
//     type: "coin",
//     value: 30000,
//     edit: { expiration: '7d' }
// });

// const viewGift = await gift.view(coin);
// const invalidGift = await gift.view(invalidCode);

// if (viewGift.valid) {
//     console.log(`O gift ${coin} é um código válido.`)
// } else {
//     console.log(`O gift ${coin} é um código inválido.`)
// }

// if (invalidGift.valid) {
//     console.log(`O gift ${invalidCode} é um código válido.`)
// } else {
//     console.log(`O gift ${invalidCode} é um código inválido.`)
// }

// })();