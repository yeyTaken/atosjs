# Azura 🚀

O **Azura** é um framework de alto desempenho para criação de APIs em **TypeScript**, oferecendo uma alternativa ultrarrápida ao Express e Fastify. Com suporte nativo a **WebSockets, autenticação JWT, banco de dados e CLI inteligente**, ele simplifica o desenvolvimento e otimiza a performance.

## ⚡ Recursos Principais

- 🔥 **Desempenho superior** utilizando `http nativo` diretamente.
- 🔄 **Auto-descoberta de rotas** para facilitar a criação de APIs.
- 📦 **Suporte nativo a WebSockets e RPC**.
- 🔐 **Sistema de autenticação embutido** para login simplificado.
- 📊 **Monitoramento de requisições** e CLI inteligente.

## 🚀 Instalação

Instale o UltraFast via **npm** ou **yarn**:

```sh
npm install ultrafast
# ou
yarn add ultrafast
```

## 🏗️ Como Usar

Crie um servidor UltraFast em poucos segundos:

```ts
import { AzuraServer } from "@package";

const app = new AzuraServer();
/* @params: { logging: boolean, jsonParser: boolean, cacheSize: number, cors: boolean, swagger: boolean } */

app.get("/", (_req, res) => {
  res.send({ message: "Hello, Azura!" });
});

app.start(); // ou app.start(3000 | "you port");
```

# 🔗 Swagger

Azura inclui suporte nativo a **Swagger**:


## 🛠️ CLI Inteligente
Rodando o servidor em modo de desenvolvimento:

```sh
npx ultrafast run dev
````

## 📜 Licença

Azura é um projeto **open-source** licenciado sob **MIT** e afiliado ao **AtosJS**.
