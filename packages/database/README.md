<div align="center">
  <img src="../../assets/images/atosPNG.png" width="456" alt="@atosjs/database"></img>
  
  <p>
  <!-- @atosjs/database badges -->
  <a href="https://www.npmjs.com/package/@atosjs/database">
    <img src="https://img.shields.io/npm/v/@atosjs/database?style=for-the-badge&color=36a5f4&label=npm&logo=npm" />
  </a>
  <a href="https://www.npmjs.com/package/@atosjs/database">
    <img src="https://img.shields.io/npm/dt/@atosjs/database?style=for-the-badge&color=f5a97f&label=downloads&logo=npm" />
  </a>
  <a href="https://github.com/yeyTaken/atosjs">
    <img src="https://img.shields.io/badge/github-atosjs-8da6ce?style=for-the-badge&logo=github" />
  </a>
</p>
</div>

A simple and lightweight database wrapper using **better-sqlite3**, designed for Node.js applications.  

## **Installation**  

To install `@atosjs/database`, use npm:

```sh
npm install @atosjs/database
```

---

## **Usage**  

### **Importing the Library**  

If you're using **CommonJS**:  

```js
const { AtosDB } = require("@atosjs/database");
```

If you're using **ES Modules**:  

```js
import { AtosDB } from "@atosjs/database";
```

---

### **General Usage Example**

Below is a generic example of how to use `AtosDB`, including setting values, manipulating data, and performing basic operations such as adding, subtracting, and checking keys.

```js
const { AtosDB } = require('../../../packages/database/dist/index.cjs');

(async () => {
    // Instantiate the AtosDB class to interact with the database.
    const db = new AtosDB({
      filePath: './db/atos.db'
    });

    /**
     * Example configuration for the AtosDB instance.
     * filePath: Path to the SQLite database file (default is `json.sqlite` if not specified).
     * verbose: Boolean flag (true or false) to enable/disable logging of SQL queries to the console.
     */
    // const db = new AtosDB({ filePath: 'path/to/db.json', verbose: true });

    const user = {
      name: 'Jonh', // User's name
      id: 123456789 // User's unique identifier (could be any string or number)
    };

    // Test 1: Setting and getting a simple value in the database.
    // Set the user's name in the database with a key based on the user's ID.
    await db.set(`name_${user.id}`, user.name);
    // Retrieve the name from the database using the same key.
    const name = await db.get(`name_${user.id}`);
    console.log(name); // Should print: "Jonh"

    // Test 2: Pushing values into an array in the database.
    // Add values to the 'numbers' key, which will be treated as an array.
    await db.push("numbers", 1);
    await db.push("numbers", 2);
    // Retrieve the updated 'numbers' array from the database.
    let numbers = await db.get("numbers");
    console.log(numbers); // Should print: [1, 2]

    // Test 3: Checking if a key exists in the database.
    // Check if the key `name_${user.id}` exists in the database.
    console.log(await db.has(`name_${user.id}`)); // Should print: true

    // Test 4: Deleting a key and checking its existence again.
    // Delete the key `name_${user.id}` from the database.
    await db.delete(`name_${user.id}`);
    // Check again if the key `name_${user.id}` exists after deletion.
    console.log(await db.has(`name_${user.id}`)); // Should print: false

    // Test 5: Adding and subtracting values for a specific key.
    // Set an initial value of 100 for the `wallet_${user.id}.cash` key.
    await db.set(`wallet_${user.id}.cash`, 100);
    // Retrieve the initial value for the `wallet_${user.id}.cash` key.
    const initialCash = await db.get(`wallet_${user.id}.cash`);
    console.log(initialCash); // Should print: 100

    // Add 100 to the current value of the `wallet_${user.id}.cash` key.
    await db.add(`wallet_${user.id}.cash`, 100);
    // Retrieve the updated value after addition.
    const afterAdd = await db.get(`wallet_${user.id}.cash`);
    console.log(afterAdd); // Should print: 200

    // Subtract 100 from the current value of the `wallet_${user.id}.cash` key.
    await db.sub(`wallet_${user.id}.cash`, 100);
    // Retrieve the updated value after subtraction.
    const afterSub = await db.get(`wallet_${user.id}.cash`);
    console.log(afterSub); // Should print: 100

    // Clean up: Close the database connection when done.
    await db.close();
})();
```

---

## **Links**
- [Website](https://atos.js.org/en) | [Documentation](https://atos.js.org/en/docs) | [Discord](https://atos.js.org/discord)
- [GitHub](https://github.com/yeyTaken/atosjs/packages/database) monorepo.  
- [NPM](https://www.npmjs.com/package/@atosjs/database), Latest version: `v1.0.0`.  

<p align="center">
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/footers/gray0_ctp_on_line.svg?sanitize=true"></img>
</p>

<p align="center">
  &copy; 2025, Israel R. Jatobá & TakenStudios.
</p>

<p align="center">
  <a href="https://github.com/yeyTaken/atosjs/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/yeyTaken/atosjs?style=for-the-badge&color=b7bdf8" />
  </a>
</p>