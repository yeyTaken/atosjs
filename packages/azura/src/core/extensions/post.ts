import { Request, Response, RouteMeta } from "@/types";
import { URLSearchParams } from "node:url";

export abstract class Post {
  method: string = "POST";
  path: string;

  constructor() {
    const filename = this.constructor.name.toLowerCase();
    this.path = `/${filename.replace("post", "")}`;
  }

  swagger?(): RouteMeta;

  abstract handle(req: Request, res: Response, query: URLSearchParams): void;
}
