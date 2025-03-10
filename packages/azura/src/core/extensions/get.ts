import { Request, Response, RouteMeta } from "@/types";
import { URLSearchParams } from "node:url";

export abstract class GetExtensions {
  method: string = "GET";
  path: string;

  constructor() {
    const filename = this.constructor.name.toLowerCase();
    this.path = `/${filename.replace("get", "")}`;
  }

  swagger?(): RouteMeta;

  abstract handle(req: Request, res: Response, query: URLSearchParams): void;
}
