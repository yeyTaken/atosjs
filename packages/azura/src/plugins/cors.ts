import { AzuraServer } from "../AzuraServer";

export default function setupCors(server: AzuraServer) {
  server.use((_req, res, next) => {
    res.writeHeader("Access-Control-Allow-Origin", "*");
    res.writeHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.writeHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });
}
