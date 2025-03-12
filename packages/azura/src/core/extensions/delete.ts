import { Request, Response, RouteMeta } from "@/types";
import { URLSearchParams } from "node:url";

export abstract class Delete {
  method: string = "DELETE";
  path: string;

  constructor() {
    const filename = this.constructor.name.toLowerCase();
    this.path = `/${filename.replace("delete", "")}`;
  }

  swagger?(): RouteMeta;

  abstract handle(req: Request, res: Response, query: URLSearchParams): void;
}
