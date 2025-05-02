<div align="center">
  <img src="./assets/images/atosPNG.png" width="456" alt="AtosJS"></img>
  
  <p>
  <!-- AtosJS badges -->
  <a href="https://atos.js.org/discord">
    <img src="https://img.shields.io/badge/discord-atosjs-8da6ce?style=for-the-badge" />
  </a>
</p>
</div>


## 🚀 **Get Started**: Project built with [`Bun`](https://bun.sh/).

### 1. **Installation**  
Ensure you have Bun installed on your system. If you don’t have it yet, install it globally:  

```bash
npm install -g bun
```  

Then, install the project dependencies:  

```bash
bun install
```  
---

### 2. **Project Structure**  
The project structure is organized as follows:  

```
atosjs/
├── apps/
│   ├── api/          # API-related files
│   └── website/      # Website-related files
├── assets/           # Static assets
│   └── images/       # Static images
├── packages/         # Core packages for AtosJS
│   ├── atosjs/       # Principal NPM core files
│   └── config/       # Build configuration files
├── tests/            # Test files
│   └── atosjs/       # Tests for specific packages (e.g., `atosjs-auth`, `atosjs-user-management`)
```
---

### 3. **Run the Global Project**  
To run the complete project, we use the `turbo.json` file. Follow the steps below:  

```bash
# Run tests
bun run test

# Build the project
bun run build

# Start the project
bun start
```

---

## 🏗️ AtosJS Monorepo Structure  

### 🚀 `turbo.json` Configuration  

The `turbo.json` file is configured to apply only to the following directories:  

- `packages/*`  
- `tests/*`  

The `apps/*` directory uses **Webpack**, so the option to use `turbopack` has been removed.  

---

### ⚡ Package Management with `bun`  

The project uses **Bun** to efficiently manage local packages. This allows referencing internal dependencies directly, for example:  

```json
"@atosjs/config": "workspace:*"
```

This way, any package with `"name": "@atosjs/config"` will be used locally without needing to be published to NPM.  

---

### 🏷️ Versioning System  

Currently, the project is at version **v1.0.0**.  

The versioning format follows this structure:  

> `X.Y.Z` (Example: **2.16.22**)  

- **X (Major Changes)** → Significant changes, such as restructurings or major overhauls.  
  - Example: If the number is `2`, it means there have been **two major restructurings**.  

- **Y (New Features and Improvements)** → Addition/modification of packages, new systems, or websites.  
  - Example: The number `16` indicates **16 improvements and additions** in the current version.  
  - If a major version (`X`) change occurs, the improvements count (`Y`) resets to `0`.  

- **Z (Bug Fixes)** → Number of bugs fixed within an improvement (`Y`).  
  - Example: The number `22` means that **22 bugs were fixed** in change `16`.  
  - When `Y` increases (e.g., `16` → `17`), the bug counter (`Z`) resets to `0`.

---

## 🔗 Links:
- [Website](https://atos.js.org/en) | [Documentation](https://atos.js.org/en/docs) | [Discord](https://atos.js.org/discord)

<p align="center">
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/footers/gray0_ctp_on_line.svg?sanitize=true"></img>
</p>

<p align="center">
  Copyright &copy; 2025, Israel R. Jatobá & TakenStudios.
</p>

<p align="center">
  <a href="https://github.com/yeyTaken/atosjs/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/yeyTaken/atosjs?style=for-the-badge&color=b7bdf8" />
  </a>
</p>
