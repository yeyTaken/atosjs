import { Request } from "../../types";
import uWS from "uWebSockets.js";

export function parseRequest(
  res: uWS.HttpResponse,
  req: uWS.HttpRequest,
  jsonParser: boolean
): Promise<Request> {
  const method = Buffer.from(req.getMethod()).toString();
  const url = Buffer.from(req.getUrl()).toString();

  return new Promise((resolve, reject) => {
    let body = "";
    res.onData((ab: ArrayBuffer, isLast: boolean) => {
      const chunk = Buffer.from(ab).toString();
      body += chunk;
      if (isLast) {
        let parsedBody: any = body;
        if (jsonParser && body) {
          try {
            parsedBody = JSON.parse(body);
          } catch (error) {
            return reject(new Error("Invalid JSON"));
          }
        }
        const result: Request = {
          method,
          url,
          path: "",
          params: {},
          query: new URLSearchParams(),
          body: parsedBody,
        };
        resolve(result);
      }
    });
  });
}
