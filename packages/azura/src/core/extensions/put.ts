import { Request, Response, RouteMeta } from "@/types";
import { URLSearchParams } from "node:url";

export abstract class Put {
  method: string = "PUT";
  path: string;

  constructor() {
    const filename = this.constructor.name.toLowerCase();
    this.path = `/${filename.replace("put", "")}`;
  }

  swagger?(): RouteMeta;

  abstract handle(req: Request, res: Response, query: URLSearchParams): void;
}
