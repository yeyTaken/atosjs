const { AtosDB } = require('../../../packages/database/dist/index.cjs');

(async () => {
    const db = new AtosDB({ verbose: false });
  
    await db.set("name", "yeyTaken");
    console.log(await db.get("name")); // Deve imprimir: "yeyTaken"
  
    await db.push("numbers", 1);
    await db.push("numbers", 2);
    console.log(await db.get("numbers")); // Deve imprimir: [1, 2]
  
    console.log(await db.has("name")); // Deve imprimir: true
    await db.delete("name");
    console.log(await db.has("name")); // Deve imprimir: false
  
    await db.close();
  })();
  