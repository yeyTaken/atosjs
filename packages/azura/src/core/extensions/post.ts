import { Request, Response } from "@/types";
import { URLSearchParams } from "node:url";

export abstract class PostExtensions {
  method: string = "POST";
  path: string;

  constructor() {
    const filename = this.constructor.name.toLowerCase();
    this.path = `/${filename.replace("post", "")}`;
  }

  abstract handle(req: Request, res: Response, query: URLSearchParams, swagger?: any): void;
}
