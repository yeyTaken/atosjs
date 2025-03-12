import { Request, Response, RouteMeta } from "@/types";
import { Get } from "@/core/extensions/get";

export default class Hello extends Get {
  swagger(): RouteMeta {
    return {
      summary: "Hello World",
      description: "Retorna uma mensagem de boas-vindas.",
      
    };
  }

  handle(_req: Request, res: Response, query: URLSearchParams) {
    const q = query.toString();
    res.send({ message: "Hello World!", query: q });
  }
}
