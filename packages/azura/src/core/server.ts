import http from "http";
import os from "os";
import chalk from "chalk";
import figures from "figures";

import { AzuraServer } from "..";
import { createResponse } from "./http/response";
import { parseRequest } from "./http/request";
import { Response, RouteMeta } from "../@types";

export default function serverConnection(
  app: AzuraServer,
  port: number = 3000,
  callback?: () => void
) {
  if (app.options.logging) {
    console.log(chalk.cyan.bold("🔧 Routes Registered:"));
    const routes = app.router.getRoutes();
    Object.keys(routes).forEach((method) => {
      Object.keys(routes[method]).forEach((path) => {
        console.log(chalk.green(`${figures.tick} ${method.toUpperCase()} ${chalk.bold(path)}`));
      });
    });
  }

  const server = http.createServer(async (req: http.IncomingMessage, res: http.ServerResponse) => {
    const start = Date.now();
    const cacheKey = `${req.method}:${req.url}`;

    if (app.cache.has(cacheKey)) {
      const response = createResponse(res);
      if (app.options.logging)
        console.log(chalk.yellow(`${figures.info} ${req.method} ${req.url} - Cache Hit`));
      return response.send(app.cache.get(cacheKey));
    }

    const parsedReq = await parseRequest(req, app.options.jsonParser!);
    let index = 0;

    const next = () => {
      if (index < app.middleware.length) {
        const middleware = app.middleware[index++];
        middleware(parsedReq, res as Response, next);
      } else {
        const routes = app.router.getRoutes();
        const route = routes[parsedReq.method]?.[parsedReq.path];

        if (route) {
          const response = createResponse(res);
          const swagger = (meta: RouteMeta) => {
            parsedReq.routeMeta = meta;
          };

          route.handler(parsedReq, response, swagger);

          const end = Date.now();
          const duration = end - start;
          console.log(chalk.green(`${figures.pointer} ${req.method} ${req.url} - ${duration}ms`));
        } else {
          const response = createResponse(res);
          response.send({ error: "404 - Not Found" });
          console.log(chalk.red(`${figures.cross} ${req.method} ${req.url} - 404 Not Found`));
        }
      }
    };

    next();
  });

  server.listen(port, () => {
    console.log(chalk.blue.bold(`🚀 Server is running on http://localhost:${port}`));
    getIP(port);
    callback && callback();
  });
}

function getIP(port: number) {
  const networkInterfaces = os.networkInterfaces();
  Object.values(networkInterfaces).forEach((interfaces) => {
    interfaces?.forEach((iface) => {
      if (iface.family === "IPv4" && !iface.internal) {
        console.log(chalk.blue.bold(`🌎 Accessible on http://${iface.address}:${port}`));
      }
    });
  });
}
