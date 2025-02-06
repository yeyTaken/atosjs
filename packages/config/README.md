# Guia de Uso do Build Global com `unbuild`

Este guia descreve como configurar e usar um sistema de build global com `unbuild` em um projeto que utiliza múltiplos pacotes no formato `packages/*`.

## Pré-requisitos

1. Node.js instalado.
2. Gerenciador de pacotes como `npm` ou `yarn`.
3. Estrutura de monorepo configurada com `packages/`.

---

## Configuração Inicial

### 1. Instale as dependências do projeto base

Navegue até o diretório `packages/config/*` e execute:

```bash
npm install
```

### 2. Criação dos arquivos no pacote (`packages/<seu-projeto>`)

#### **Arquivo: `build.config.ts`**
Este arquivo define as configurações do build para o pacote.

```typescript
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  preset: "../config/build.preset",
  entries: ["src/index"],
});
```

#### **Arquivo: `tsconfig.json`**
Este arquivo estende as configurações globais para o TypeScript e define os caminhos base.

```json
{
  "extends": "../config/base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "#package": ["./src/index.ts"]
    }
  }
}
```

#### **Instale o `unbuild`**
Adicione o `unbuild` como dependência de desenvolvimento ao seu projeto:

```bash
npm install --save-dev unbuild
```

#### **Atualize o `package.json`**
Ajuste o `package.json` para incluir configurações de build e publicação:


#### adicionar:
```json
{
  "type": "module",

  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    }
  },

  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "files": ["dist"],

  "scripts": {
    "build": "unbuild"
  },
```


#### adicionado:
```json
{
  "name": "@atosjs/<nome-do-seu-pacote>",
  "version": "1.0.0",
  "type": "module",
  "publishConfig": {
    "access": "public"
  },
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    }
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "unbuild"
  },
  "devDependencies": {
    "@types/node": "^22.13.0",
    "sucrase": "^3.34.0",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "tscpaths": "^0.0.9",
    "unbuild": "^3.3.1"
  },
  "dependencies": {
    "chalk": "^4.1.2",
    "figures": "^3.2.0"
  }
}
```

---

## Processo de Build

1. Certifique-se de que todos os arquivos foram configurados corretamente.
2. Execute o comando abaixo no terminal dentro do pacote:

```bash
npm run build
```

Isso gerará a saída compilada na pasta `dist` do pacote.

---

## Estrutura Final Esperada

Após configurar e executar o build, sua estrutura de pastas será semelhante a:

```
packages/
├── config/
│   ├── base.json
│   ├── build.preset.js
│   └── ...
├── <seu-pacote>/
│   ├── dist/
│   │   ├── index.d.ts
│   │   ├── index.mjs
│   │   └── index.cjs
│   ├── src/
│   │   └── index.ts
│   ├── build.config.ts
│   ├── tsconfig.json
│   └── package.json
```

---

## Dicas e Boas Práticas

1. **Consistência**: Utilize o mesmo `preset` global (`../config/build.preset`) para manter consistência nos builds de múltiplos pacotes.
2. **Automatização**: Considere usar ferramentas como `lerna` ou `pnpm workspaces` para gerenciar múltiplos pacotes de forma eficiente.
3. **Testes Locais**: Antes de publicar, teste o pacote gerado com `npm link` ou `yarn link` em outro projeto.

---

## Publicação

Para publicar seu pacote no npm, execute:

```bash
npm publish --access public
```

Certifique-se de que:
- Você está autenticado no npm.
- O nome do pacote no `package.json` segue os padrões (`@<seu-escopo>/<seu-pacote>`).

---