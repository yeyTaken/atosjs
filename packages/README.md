<div align="center">
  <img src="../assets/images/atosPNG.png" width="456" alt="AtosJS"></img>
  
  <p>
  <!-- AtosJS badges -->
  <a href="https://atos.js.org/discord">
    <img src="https://img.shields.io/badge/discord-atosjs-8da6ce?style=for-the-badge" />
  </a>
</p>
</div>

# 📦 Packages Directory  

This directory contains the core packages of **AtosJS**. 🚀 **Important:** The use of **Bun** is mandatory to ensure proper integration of local packages. 🔧  

## How to Create a New Package in `packages/*`  

1. **Create a new directory**:  
   Create your project folder using the command below:  
   ```bash
   mkdir example
   ```  
   📁 **Tip:** You can also copy the basic project structure from the template available in `config/template`. This template serves as a general base for npm projects in TypeScript with a global build system.  

   ### **Linux (Bash)**  
   ```bash
   cp -r config/template example
   ```  

   ### **Windows (PowerShell)**  
   ```powershell
   Copy-Item -Recurse config\template example
   ``` 

   ```
   atosjs/  
   ├── packages/         # Core packages for AtosJS  
   │   └── example/      # Example package  
   │       ├── src/
   │       ├── package.json  
   │       ├── build.config.ts  
   │       └── tsconfig.json  
   ```

2. **Navigate to the created directory**:  
   Move into the newly created folder:  
   ```bash
   cd example
   ```  

3. **Initialize the project using Bun**:  
   Use Bun to initialize your project with the default settings:  
   ```bash
   bun init -y
   ```  

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