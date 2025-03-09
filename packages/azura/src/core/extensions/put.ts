import { Request, Response } from "@/types";
import { URLSearchParams } from "node:url";

export abstract class PutExtensions {
  method: string = "PUT";
  path: string;

  constructor() {
    const filename = this.constructor.name.toLowerCase();
    this.path = `/${filename.replace("put", "")}`;
  }

  abstract handle(req: Request, res: Response, query: URLSearchParams, swagger?: any): void;
}
