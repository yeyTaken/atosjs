import { AzuraServer } from "../src";

const app = new AzuraServer({ logging: true, jsonParser: true, swagger: true, cors: true });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/test", (req, res, swagger) => {
  swagger({ summary: "Teste", description: "Teste", tags: ["test"] });

  res.send("Teste Swagger");
});

app.start();
