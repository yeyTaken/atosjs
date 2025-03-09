import { ServerResponse } from "node:http";
import { Response } from "../../types";

export function createResponse(res: ServerResponse): Response {
  return Object.assign(res, {
    send(data: any) {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
    },
  });
}
