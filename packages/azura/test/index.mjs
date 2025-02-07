import { AzuraServer } from "../dist/index.mjs";

const app = new AzuraServer();

app.get("/", (_req, res, swagger) => {
  swagger({
    summary: "Hello World",
    description: "This is a sample route",
    tags: ["Sample"],
  });

  res.send({ message: "Hello, Azura!" });
});

app.start();
