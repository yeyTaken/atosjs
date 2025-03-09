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

### **Creating a Database Instance**  

```js
const db = new AtosDB({
  filePath: "data.sqlite", // Optional (default: "json.sqlite")
  verbose: true,           // Optional (logs SQL queries)
});
```

This will create (or open) a SQLite database file called `data.sqlite`.

---

## **Basic CRUD Operations**  

### **Set a Value**  

```js
await db.set("username", "yeyTaken");
```

Stores a key-value pair in the database.

---

### **Get a Value**  

```js
const username = await db.get("username");
console.log(username); // "yeyTaken"
```

Retrieves the value associated with the given key.

---

### **Check if a Key Exists**  

```js
const exists = await db.has("username");
console.log(exists); // true
```

Returns `true` if the key exists, otherwise `false`.

---

### **Delete a Key**  

```js
await db.delete("username");
```

Removes the key-value pair from the database.

---

### **Delete All Data**  

```js
await db.deleteAll();
```

Deletes all entries in the database.

---

## **Array Operations**  

### **Push a Value to an Array**  

```js
await db.push("scores", 100);
await db.push("scores", 200);

console.log(await db.get("scores")); // [100, 200]
```

If the key doesn't exist, it creates an array and adds the value. If it exists and isn't an array, it converts it into one.

---

## **Closing the Database**  

```js
await db.close();
```

Closes the database connection.

---

## **Error Handling**  

If an invalid key is provided, an error will be thrown:

```js
try {
  await db.get("");
} catch (error) {
  console.error("Error:", error.message);
}
```

## **Example use**

```js
const { AtosDB } = require('@atosjs/database');

(async () => {
    const db = new AtosDB({ verbose: false });
  
    await db.set("name", "Jonh");
    console.log(await db.get("name"));
  
    await db.push("numbers", 1);
    await db.push("numbers", 2);
    console.log(await db.get("numbers"));
  
    console.log(await db.has("name"));
    await db.delete("name");
    console.log(await db.has("name"));
  
    await db.close();
  })();
  
```

console output:

```
Jonh
[ 1, 2 ]
true
false
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