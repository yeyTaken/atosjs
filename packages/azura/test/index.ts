import { AzuraServer, data } from "../src";

const app = new AzuraServer();

// Exemplo de requisição GET para puxar dados
async function getUser() {
  // Cria uma instância do HTTP apontando para a URL base da API
  const api = new data("https://jsonplaceholder.typicode.com");

  try {
    // Faz uma requisição GET para a rota /users/1 e espera o retorno
    const user = await api.get("/users/1", { fields: ["id", "name", "username"] });
    console.log("Usuário obtido:", user);
  } catch (error) {
    console.error("Erro ao obter usuário:", error);
  }
}

// Exemplo de requisição POST para enviar dados
async function createPost() {
  // Cria uma instância do HTTP apontando para a URL base da API
  const api = new data("https://jsonplaceholder.typicode.com");

  try {
    // Dados que serão enviados para criar um novo post
    const postData = {
      title: "Meu novo post",
      body: "Conteúdo do post",
      userId: 1,
    };

    // Faz uma requisição POST para a rota /posts com os dados do post
    const newPost = await api.post("/posts", {
      body: postData,
    });
    console.log("Post criado:", newPost);
  } catch (error) {
    console.error("Erro ao criar post:", error);
  }
}

// Executa os exemplos
getUser();
createPost();

// # Example seting routes normally:
app.get("/", (_req, res) => {
  res.send("Hello World!");
});

// # Example seting routes with swagger:
app.get("/test", (_req, res, _query, swagger) => {
  swagger({ summary: "Teste", description: "Teste", tags: ["test"] });

  res.send("Teste Swagger");
});

// # Example server start:
app.start();

/* 
# Server started example with callback function:

AzuraServer.start(app, () => {
  console.log("Server started");
}); 
*/
