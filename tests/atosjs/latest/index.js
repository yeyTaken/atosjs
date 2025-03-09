const { time, queue, sleep, ms } = require("./atos.config");

// TimeFormat
(async () => {
  console.log(ms("1s")); // 1000
  console.log(ms(1000)); // 1s

  time(1000, 3, (count) => {
    console.log(`repeat ${count}.`);
  });

  time(ms("3.5s"), () => console.log("timeout."));

  await sleep(ms("10s"));
  console.log("10 seconds passed.");

  const task1 = async () => {
    console.log("Task 1 started");
    await sleep(ms("1m"));
    console.log("Task 1 finished");
  };

  const task2 = async () => {
    console.log("Task 2 started");
    await sleep(ms("5s"));
    console.log("Task 2 finished");
  };

  // Execução na ordem:
  // 1. Task1 (1 minuto)
  // 2. Task2 (5 segundo)
  // 3. "All tasks completed"
  queue([task1, task2])
    .then(() => console.log("All tasks completed."))
    .catch((error) => console.error("Error in tasks:", error));
})();
