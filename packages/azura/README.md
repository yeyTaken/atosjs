# Azura 🚀

O **Azura** é um framework de alto desempenho para criação de APIs em **TypeScript**, oferecendo uma alternativa ultrarrápida ao Express e Fastify. Com suporte nativo a **WebSockets, autenticação JWT, banco de dados e CLI inteligente**, ele simplifica o desenvolvimento e otimiza a performance.

## ⚡ Recursos Principais

- 🔥 **Desempenho superior** utilizando `http nativo` diretamente.
- 🔄 **Auto-descoberta de rotas** para facilitar a criação de APIs.
- 📦 **Suporte nativo a WebSockets e RPC**.
- 🔐 **Sistema de autenticação embutido** para login simplificado.
- 📊 **Monitoramento de requisições** e CLI inteligente.

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
/* params configured in the config file "azura.config.ts" or "azura.config.js" */

// # Example seting routes normally:
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.start(); // or configure the port in the config file "azura.config.ts" or "azura.config.js"
```

# 🔗 Swagger

Azura inclui suporte nativo a **Swagger**:

```ts
import { AzuraServer } from "@atosjs/azura";

const app = new AzuraServer();

// # Example seting routes with swagger:
app.get("/test", (req, res, swagger) => {
  swagger({ summary: "Test", description: "Test", tags: ["test"] });

  res.send("Test Swagger"); // view your swagger at http://localhost:3000/docs route or you swagger json file at http://localhost:3000/swagger.json
});

app.start();
```

# 🔗 Criando Rotas

Crie uma pasta chamada `routes` dentro do diretório `src` e crie um arquivo chamado `hello.ts` dentro da pasta `routes`. Dentro do arquivo `hello.ts` crie uma classe chamada `Hello` que herda de `GetExtensions` ou `PostExtensions` ou `PutExtensions` ou `DeleteExtensions`. Em seguida, implemente a função `handle` para que ela execute a lógica da rota.

```ts
import { GetExtensions } from "@atosjs/azura";

export default class Hello extends GetExtensions {
  handle(req: Request, res: Response, query: URLSearchParams) {
    const q = query.toString();
    res.send({ message: "Hello World!", query: q });
  }
}
```

# 🔎 Criando Redirecionamentos

Crie uma pasta chamada `redirects` dentro do diretório `src` e crie um arquivo chamado `oi.ts` dentro da pasta `redirects`. Dentro do arquivo `oi.ts` crie uma classe chamada `Oi` que herda de `RedirectExtensions`. Em seguida, implemente as propriedades `from` e `to` para que ela execute a lógica do redirecionamento.

```ts
import { RedirectExtensions } from "@atosjs/azura";

export default class Google extends RedirectExtensions {
  static from = "/google";
  static to = "https://www.google.com.br";
}
```

# ⚙ Arquivo de configuração

O arquivo de configuração é um arquivo JSON que contém as configurações do servidor. O arquivo de configuração padrão é o `azura.config.json` e está localizado no diretório atual. Você pode criar um arquivo de configuração personalizado ou usar o arquivo padrão.

Exemplo de arquivo de configuração:

```json
{
  "server": {
    "port": 3000,
    "ipHost": true,
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
  "routesPath": "src/routes", // default: src/routes (automatically finds routes in src/routes)
  "redirectsPath": "src/redirects" // default: src/redirects (automatically finds redirects in src/redirects)
  "redirects": [
    {
      "from": "/old-route",
      "to": "/new-route"
    }
  ]
}
```

As configurações disponíveis no arquivo de configuração são:

- `server`: Configurações do servidor, como porta, IP, etc.
- `logging`: Habilita ou desabilita o registro de eventos no console.
- `jsonParser`: Habilita ou desabilita o parser de JSON.
- `cacheSize`: Tamanho do cache do servidor.
- `cors`: Habilita ou desabilita o CORS.
- `swagger`: Habilita ou desabilita a documentação do Swagger.
- `database`: Configurações do banco de dados.
- `routesPath`: Caminho para a pasta de rotas personalizada ou utilizar a pasta padrão.
- `redirectsPath`: Caminho para a pasta de redirecionamentos personalizada ou utilizar a pasta padrão.
- `redirects`: Array de redirecionamentos caso queira utilizar uma pasta pode ser utilizada "/src/redirects" ou uma personalizada no parametro redirectsPath.

## 📜 Licença

Azura é um projeto **open-source** licenciado sob **MIT** e afiliado ao **AtosJS**.
