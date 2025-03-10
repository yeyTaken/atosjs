import { Request, Response } from "@/types";
import { GetExtensions } from "@/core/extensions/get";

export default class Hello extends GetExtensions {
  handle(_req: Request, res: Response, query: URLSearchParams) {
    const q = query.toString();
    res.send({ message: "Hello World!", query: q });
  }
}
