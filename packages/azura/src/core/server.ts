import uWS from "uWebSockets.js";
import os from "os";
import chalk from "chalk";
import figures from "figures";

import { AzuraServer } from "../AzuraServer";
import { createResponse } from "./http/response";
import { parseRequest } from "./http/request";
import { RouteMeta, Response } from "../types";

export default function serverConnection(
  app: AzuraServer,
  port: number = 3000,
  callback?: () => void
) {
  const isProd = app.options.server?.node === "production";
  const routesMap = app.router.getRoutes();

  if (app.options.logging && !isProd) {
    console.log(chalk.cyan.bold("📌 Routes Registered:"));
    for (const [method, routes] of routesMap.entries()) {
      for (const path of routes.keys()) {
        console.log(chalk.green(`✅ ${method} ${chalk.bold(path)}`));
      }
    }
  }

  const server = uWS.App();

  server.any("/*", async (res, req) => {
    let aborted = false;
    res.onAborted(() => {
      aborted = true;
    });

    const start = performance.now();
    const method = req.getMethod().trim().toUpperCase();
    const url = req.getUrl().trim();
    const cacheKey = `${method}:${url}`;

    if (aborted) return;

    try {
      if (app.cache.has(cacheKey)) {
        const response = createResponse(res);
        if (app.options.logging && !isProd)
          console.log(chalk.yellow(`${figures.info} ${method} ${url} - Cache Hit`));
        response.send(app.cache.get(cacheKey));
        return;
      }

      let parsedReq: any;
      try {
        parsedReq = await parseRequest(res, req, app.options.jsonParser!);
      } catch (parseErr) {
        console.error("Erro ao parsear a requisição:", parseErr);
        const response = createResponse(res);
        response.send({ error: "Internal Server Error" });
        return;
      }
      parsedReq.method = method;
      parsedReq.path = url.split("?")[0];

      for (let i = 0, len = app.middleware.length; i < len; i++) {
        try {
          await new Promise<void>((resolve, _reject) => {
            app.middleware[i](parsedReq, res as unknown as Response, resolve);
          });
        } catch (mwErr) {
          console.error("Erro no middleware:", mwErr);
          const response = createResponse(res);
          response.send({ error: "Internal Server Error" });
          return;
        }
      }

      const route = routesMap.get(method)?.get(parsedReq.path);
      if (route) {
        try {
          const response = createResponse(res);
          const swagger = (meta: RouteMeta) => {
            parsedReq.routeMeta = meta;
          };
          const queryString = url.split("?")[1] || "";
          const query = queryString ? new URLSearchParams(queryString) : new URLSearchParams();

          await Promise.resolve(route.handler(parsedReq, response, query, swagger));
          if (!isProd) {
            const duration = performance.now() - start;
            console.log(
              chalk.green(`${figures.pointer} ${method} ${url} - ${duration.toFixed(2)}ms`)
            );
          }
        } catch (handlerErr) {
          console.error("Erro no handler da rota:", handlerErr);
          const response = createResponse(res);
          response.send({ error: "Internal Server Error" });
        }
      } else {
        const response = createResponse(res);
        response.send({ error: "404 - Not Found" });
        if (!isProd) {
          console.log(chalk.red(`${figures.cross} ${method} ${url} - 404 Not Found`));
        }
      }
    } catch (err) {
      console.error("Erro não tratado na requisição:", err);
      try {
        const response = createResponse(res);
        response.send({ error: "Internal Server Error" });
      } catch (sendErr) {
        console.error("Erro ao enviar resposta de erro:", sendErr);
      }
    }
  });

  server.listen(port, (token) => {
    if (token) {
      if (!callback)
        console.log(chalk.blue.bold(`🚀 Server is running on http://localhost:${port}`));
      if (app.options.server?.ipHost) getIP(port);
      callback && callback();
    } else {
      console.error(chalk.red("❌ Failed to start server."));
      process.exit(1);
    }
  });
}

function getIP(port: number) {
  const networkInterfaces = os.networkInterfaces();
  Object.values(networkInterfaces).forEach((ifaceList) => {
    ifaceList?.forEach((iface) => {
      if (iface.family === "IPv4" && !iface.internal) {
        console.log(chalk.blue.bold(`🌎 Accessible on http://${iface.address}:${port}`));
      }
    });
  });
}
