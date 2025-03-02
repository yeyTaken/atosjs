<div align="center">
  <img src="./assets/images/atosPNG.png" width="456" alt="AtosJS"></img>
  
  <p>
  <!-- AtosJS badges -->
  <a href="https://atos.js.org/discord">
    <img src="https://img.shields.io/badge/discord-atosjs-8da6ce?style=for-the-badge" />
  </a>
</p>
</div>

# 🚀 **Get Started**: Project built with [`Bun`](https://bun.sh/).

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
bun test

# Build the project
bun run build

# Start the project
bun start
```

---

# 🏗️ Estrutura do Monorepo AtosJS  

## 🚀 Configuração do `turbo.json`  

O `turbo.json` está configurado para se aplicar apenas às seguintes pastas:  

- `packages/*`  
- `tests/*`  

A pasta `apps/*` utiliza **Webpack**, então a opção de `turbopack` foi removida.  

## ⚡ Gerenciamento de Pacotes com `bun`  

O projeto utiliza **Bun** para gerenciar pacotes locais de forma eficiente. Isso permite referenciar dependências internas diretamente, por exemplo:  

```json
"@atosjs/config": "workspace:*"
```

Dessa forma, qualquer pacote com `"name": "@atosjs/config"` será usado localmente sem necessidade de publicação no NPM.  

## 🏷️ Sistema de Versionamento  

Atualmente, o projeto está na versão **v1.0.0**.  

O formato de versionamento segue a estrutura:  

> `X.Y.Z` (Exemplo: **2.16.22**)  

- **X (Alterações maiores)** → Mudanças significativas, como reformulações ou grandes reestruturações.  
  - Exemplo: Se o número for `2`, significa que houve **duas grandes reformulações**.  

- **Y (Novas funcionalidades e melhorias)** → Adição/modificação de pacotes, novos sistemas ou sites.  
  - Exemplo: O número `16` indica **16 melhorias e adições** na versão atual.  
  - Se houver uma grande mudança na versão principal (`X`), o número de melhorias (`Y`) volta para `0`.  

- **Z (Correções de bugs)** → Quantidade de bugs resolvidos dentro de uma melhoria (`Y`).  
  - Exemplo: O número `22` significa que **22 bugs foram corrigidos** na alteração `16`.  
  - Quando `Y` aumenta (exemplo: `16` → `17`), o contador de bugs (`Z`) é resetado para `0`.  


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
