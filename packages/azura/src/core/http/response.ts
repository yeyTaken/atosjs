import uWS from "uWebSockets.js";
import { Response } from "../../types";
import { renderView } from "../../functions/renderView";
import { AzuraServer } from "../../AzuraServer";

export function createResponse(res: uWS.HttpResponse, app?: AzuraServer): Response {
  const response = {
    send: (body: any) => {
      if (app && app.responseInterceptors.length > 0) {
        for (const interceptor of app.responseInterceptors) {
          body = interceptor(body);
        }
      }

      if (typeof body === "string") {
        const trimmed = body.trim();
        if (trimmed.startsWith("<!DOCTYPE") || trimmed.startsWith("<html")) {
          res.writeHeader("Content-Type", "text/html; charset=utf-8");
          res.end(body);
          return;
        }
      }
      res.writeHeader("Content-Type", "application/json");
      res.end(typeof body === "string" ? body : JSON.stringify(body));
    },
    status: (code: number) => {
      res.writeStatus(`${code}`);
      return response;
    },
    render: async (view: string, data?: any) => {
      try {
        const html = await renderView(view, data);
        res.writeHeader("Content-Type", "text/html; charset=utf-8");
        res.end(html);
      } catch (error) {
        console.error("Erro ao renderizar a view:", error);
        res.writeHeader("Content-Type", "text/plain; charset=utf-8");
        res.end("Erro ao renderizar a página.");
      }
    },
    end: () => {
      res.end();
    },
    write: (chunk: string) => {
      res.write(chunk);
    },
  };

  return response as Response;
}
