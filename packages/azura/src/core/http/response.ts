import uWS from "uWebSockets.js";
import { Response } from "../../types";

export function createResponse(res: uWS.HttpResponse): Response {
  return {
    send: (data: any) => {
      if (typeof data === "object") {
        res.writeHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
      } else {
        res.end(data.toString());
      }
    },
  } as Response;
}
