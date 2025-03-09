import { Request, Response } from "@/types";
import { URLSearchParams } from "node:url";

export abstract class DeleteExtensions {
  method: string = "DELETE";
  path: string;

  constructor() {
    const filename = this.constructor.name.toLowerCase();
    this.path = `/${filename.replace("delete", "")}`;
  }

  abstract handle(req: Request, res: Response, query: URLSearchParams, swagger?: any): void;
}
