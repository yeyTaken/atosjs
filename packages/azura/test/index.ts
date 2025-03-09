import { AzuraServer } from "../src";

const app = new AzuraServer();

// # Example seting routes normally:
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// # Example seting routes with swagger:
app.get("/test", (req, res, _query, swagger) => {
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
