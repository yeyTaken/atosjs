<div align="center">
  <img src="../../assets/images/atosPNG.png" width="456" alt="@atosjs/toolkit"></img>

  <p>
  <!-- @atosjs/toolkit badges -->
  <a href="https://www.npmjs.com/package/@atosjs/toolkit">
    <img src="https://img.shields.io/npm/v/@atosjs/toolkit?style=for-the-badge&color=36a5f4&label=npm&logo=npm" />
  </a>
  <a href="https://www.npmjs.com/package/@atosjs/toolkit">
    <img src="https://img.shields.io/npm/dt/@atosjs/toolkit?style=for-the-badge&color=f5a97f&label=downloads&logo=npm" />
  </a>
  <a href="https://github.com/yeyTaken/atosjs">
    <img src="https://img.shields.io/badge/github-atosjs-8da6ce?style=for-the-badge&logo=github" />
  </a>
</p>
</div>

A modern and easy-to-use JavaScript/TypeScript toolkit that provides utilities such as file watching, scheduling, and more.

## Installation

```sh
npm install @atosjs/toolkit
```

## Usage

### Importing the Library

For **CommonJS**:

```js
const { Watcher } = require("@atosjs/toolkit");
```

For **ES Modules**:

```js
import { Watcher } from "@atosjs/toolkit";
```

## Example: File Watcher

```js
const { Watcher } = require("@atosjs/toolkit");

// Create a watcher monitoring two folders: ./src and ./tests
const watcher = new Watcher(["./src", "./tests"], {
  ignored: [
    "node_modules/**", // ignore node_modules
    "dist/**",         // ignore build output
  ],
  persistent: true,   // keep the watcher alive
  usePolling: false,  // rely on system events instead of polling
});

// Fired when a new file is created
watcher.on("add", (file) => {
  console.log("File added:", file);
});

// Fired when a file is modified
watcher.on("change", (file) => {
  console.log("File changed:", file);
});

// Fired when a file is removed
watcher.on("remove", (file) => {
  console.log("File removed:", file);
});

// Fired when an error occurs
watcher.on("error", (err) => {
  console.error("Watcher error:", err);
});

// Example: close the watcher after 60 seconds
setTimeout(() => {
  watcher.close();
  console.log("Watcher closed.");
}, 60000);
```

## Watcher Events

* **`add`** → Triggered when a new file is created inside the watched directories.
  Example: creating a new `index.ts` file.

* **`change`** → Triggered when an existing file is modified.
  Example: saving changes to `app.js`.

* **`remove`** → Triggered when a file is deleted.
  Example: removing `old.test.js` from the project.

* **`error`** → Triggered when an internal error occurs in the watcher.
  Example: permission issues or invalid paths.

## Links

* [Website](https://atos.js.org/en) | [Documentation](https://atos.js.org/en/docs) | [Discord](https://atos.js.org/discord)
* [GitHub](https://github.com/yeyTaken/atosjs)
* [NPM](https://www.npmjs.com/package/@atosjs/toolkit), Latest version: `v1.0.0`.

<p align="center">
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/footers/gray0_ctp_on_line.svg?sanitize=true"></img>
</p>

<p align="center">
  Copyright &copy; 2025,
  <a href="https://github.com/yeyTaken" target="_blank">Israel R. Jatobá</a> 
  &amp; 
  <a href="https://www.arcstudio.online/" target="_blank">ARC Studio, Inc</a>.
</p>

<p align="center">
  <a href="https://github.com/yeyTaken/atosjs/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/yeyTaken/atosjs?style=for-the-badge&color=b7bdf8" />
  </a>
</p>