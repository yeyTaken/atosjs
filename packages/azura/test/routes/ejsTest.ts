import { GetExtensions } from "@/core/extensions/get";
import { renderView } from "@/functions/renderView";
import { Request, Response } from "@/types";

export default class GetEjs extends GetExtensions {
  async handle(_req: Request, res: Response) {
    try {
      const html = await renderView("index", { title: "Página EJS", user: "Dev" });

      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(html);
    } catch (error) {
      console.error(error); // Adicione um log para capturar o erro
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Erro ao renderizar a página." + error);
    }
  }
}
