# Azura 🚀

O **Azura** é um framework de alto desempenho para criação de APIs em **TypeScript**, oferecendo uma alternativa ultrarrápida ao Express e Fastify. Com suporte nativo a **WebSockets, autenticação JWT, banco de dados e CLI inteligente**, ele simplifica o desenvolvimento e otimiza a performance.

## ⚡ Recursos Principais

- 🔥 **Desempenho superior** utilizando `http nativo` diretamente.
- 🔄 **Auto-descoberta de rotas** para facilitar a criação de APIs.
- 📦 **Suporte nativo a WebSockets e RPC**.
- 🔐 **Sistema de autenticação embutido** para login simplificado.
- 📊 **Monitoramento de requisições** e CLI inteligente.
- 🛠 **Interceptadores de request e response** para personalizar o fluxo.
- 📡 **Streaming de respostas** para envio progressivo de dados.
- 🔄 **Revalidação de cache** para manter dados sempre atualizados.
- 🌐 **DataRequest API** para requisições HTTP simplificadas com suporte a filtros e autenticação.

## 🚀 Instalação

Instale o Azura via **npm** ou **bun**:

```sh
npm install @atosjs/azura
# ou
bun install @atosjs/azura
```

## 🏗️ Como Usar

Crie um servidor Azura em poucos segundos:

```ts
import { AzuraServer } from "@atosjs/azura";

const app = new AzuraServer();
/* parâmetros configurados no arquivo "azura.config.ts" ou "azura.config.js" */

// # Exemplo de rota simples:
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.start(); // ou configure a porta no arquivo de configuração
```

## 🔗 Swagger

Azura inclui suporte nativo a **Swagger**:

```ts
import { Get, Request, Response, RouteMeta } from "@atosjs/azura";

export default class Hello extends Get {
  swagger(): RouteMeta {
    return {
      summary: "Hello World",
      description: "Retorna uma mensagem de boas-vindas.",
    };
  }

  handle(_req: Request, res: Response, query: URLSearchParams) {
    const q = query.toString();
    res.send({ message: "Hello World!", query: q });
  }
}
```

## 🔗 Criando Rotas

Crie uma pasta chamada `routes` dentro do diretório `src` e crie um arquivo chamado `hello.ts` dentro da pasta `routes`. Dentro do arquivo `hello.ts` crie uma classe chamada `Hello` que herda de `Get` (ou de outras extensões como `Post`, etc.) e implemente a função `handle` para executar a lógica da rota.

```ts
import { Get, Request, Response } from "@atosjs/azura";

export default class Hello extends Get {
  handle(req: Request, res: Response, query: URLSearchParams) {
    const q = query.toString();
    res.send({ message: "Hello World!", query: q });
  }
}
```

## 🔎 Criando Redirecionamentos

Crie uma pasta chamada `redirects` dentro do diretório `src` e crie um arquivo chamado `oi.ts` dentro da pasta `redirects`. Dentro do arquivo `oi.ts` crie uma classe chamada `Oi` que herda de `Redirect` e implemente as propriedades `from` e `to` para definir o redirecionamento.

```ts
import { Redirect } from "@atosjs/azura";

export default class Google extends Redirect {
  static from = "/google";
  static to = "https://www.google.com.br";
}
```

## 📝 Renderização de Views

Azura inclui suporte nativo a **Renderização de Views** com o **Engine de Templates EJS**:

```ts
import { Get, Request, Response } from "@atosjs/azura";

export default class GetEjs extends Get {
  async handle(_req: Request, res: Response) {
    await res.render("index", { title: "Página EJS", user: "Dev" });
  }
}
```

## 🚀 Exemplos Avançados

### 🔍 Interceptadores

Você pode interceptar requisições e respostas para personalizar o fluxo do seu aplicativo. Por exemplo:

```ts
import { AzuraServer } from "@atosjs/azura";

const app = new AzuraServer();

// Interceptador de request: registra método e rota da requisição
app.useRequestInterceptor((req, res, next) => {
  console.log(`Interceptando request: ${req.method} ${req.path}`);
  next();
});

// Interceptador de response: modifica a resposta em caso de erro
app.useResponseInterceptor((data) => {
  if (data.error) {
    data.customMessage = "Erro tratado pelo interceptor";
  }
  return data;
});
```

### 📡 Streaming de Respostas

Envie dados de forma progressiva utilizando streaming. Ideal para grandes volumes de dados:

```ts
app.get("/stream", async (_req, res) => {
  res.write("Parte 1...\n");
  setTimeout(() => res.write("Parte 2...\n"), 2000);
  setTimeout(() => res.write("Parte 3...\n"), 4000);
  setTimeout(() => res.end(), 6000);
});
```

### 🌐 WebSockets

Com o Azura, é possível habilitar WebSockets facilmente. Ative a opção no arquivo de configuração e utilize o endpoint `/ws`:

**Configuração (azura.config.json ou azura.config.ts):**

```json
{
  "server": {
    "port": 3000,
    "ipHost": true,
    "node": "development",
    "websocket": true
  },
  ...
}
```

**Exemplo no cliente:**

```js
const socket = new WebSocket("ws://localhost:3000/ws");
socket.onopen = () => {
  socket.send("Olá WebSocket!");
};
socket.onmessage = (event) => console.log("Recebido:", event.data);
```

### 🔄 Revalidação de Cache

Utilize o sistema de cache integrado para armazenar e revalidar dados automaticamente:

```ts
// Rota que utiliza cache para armazenar resposta
app.get("/data", async (req, res) => {
  // Se houver cache, ele será retornado automaticamente
  res.send({ data: "Dados atualizados" });
});

// Rota para atualizar dados e invalidar o cache
app.post("/update", async (req, res) => {
  // Lógica de atualização dos dados
  // Invalida o cache da rota /data
  app.cache.delete("GET:/data");
  res.send({ success: true });
});
```

## 🌐 DataRequest API

A classe **Data** permite realizar requisições HTTP de forma simples e flexível, com suporte a interceptadores, autenticação Bearer, e a opção de filtrar campos da resposta. Veja alguns exemplos:

### Exemplo 1: GET - Retornando a Resposta Completa

```ts
import { Data } from "@atosjs/azura";

const api = new Data("https://jsonplaceholder.typicode.com");

async function fetchTodoCompleto() {
  try {
    // Retorna todos os campos do todo
    const todo = await api.get("/todos/1");
    console.log("Todo completo:", todo);
  } catch (error) {
    console.error("Erro no GET:", error);
  }
}

fetchTodoCompleto();
```

### Exemplo 2: GET - Filtrando Apenas Alguns Campos

```ts
import { Data } from "@atosjs/azura";

const api = new Data("https://jsonplaceholder.typicode.com");

async function fetchTodoFiltrado() {
  try {
    // Mesmo que a API retorne vários campos, com a opção "fields" serão retornados
    // somente os campos especificados (por exemplo, 'id' e 'title')
    const todo = await api.get("/todos/1", { fields: ["id", "title"] });
    console.log("Todo filtrado:", todo); // Exemplo: { id: 1, title: "delectus aut autem" }
  } catch (error) {
    console.error("Erro no GET:", error);
  }
}

fetchTodoFiltrado();
```

### Exemplo 3: POST - Enviando Dados com Autenticação

```ts
import { Data } from "@atosjs/azura";

const api = new Data("https://jsonplaceholder.typicode.com");

async function createTodo() {
  try {
    const newTodo = await api.post("/todos", {
      body: { title: "Novo Todo", completed: false },
      authToken: "seu_token_aqui"
    });
    console.log("Todo criado:", newTodo);
  } catch (error) {
    console.error("Erro no POST:", error);
  }
}

createTodo();
```

## ⚙ Arquivo de Configuração

O arquivo de configuração é um arquivo JSON ou TypeScript que contém as configurações do servidor. O nome do arquivo é `azura.config.json` ou `azura.config.ts`.

**Exemplo de arquivo de configuração JSON:**

```json
{
  "server": {
    "port": 3000,
    "ipHost": true,
    "node": "development", // "production" ou "development" (production não realiza logging)
    "websocket": true
  },
  "logging": true,
  "jsonParser": true,
  "cacheSize": 1000,
  "cors": true,
  "swagger": true,
  "database": {
    "uri": "mongodb://localhost:27017/azura",
    "name": "azura"
  },
  "routesPath": "src/routes",
  "redirectsPath": "src/redirects",
  "redirects": [
    {
      "from": "/old-route",
      "to": "/new-route"
    }
  ],
  "ejsEngine": {
    "viewsPath": "src/views"
  }
}
```

**Exemplo de arquivo de configuração TypeScript:**

```ts
import { ServerOptions } from "@atosjs/azura";

const config: ServerOptions = {
  server: {
    port: 3000,
    ipHost: true,
    node: "development", // "production" ou "development"
    websocket: true
  },
  logging: true,
  jsonParser: true,
  cacheSize: 1000,
  cors: true,
  swagger: true,
  database: {
    uri: "mongodb://localhost:27017/azura",
    name: "azura"
  },
  routesPath: "src/routes",
  redirectsPath: "src/redirects",
  redirects: [
    {
      from: "/old-route",
      to: "/new-route"
    }
  ],
  ejsEngine: {
    viewsPath: "src/views"
  }
};

export default config;
```

## 📜 Licença

Azura é um projeto **open-source** licenciado sob **MIT** e afiliado ao **AtosJS**.