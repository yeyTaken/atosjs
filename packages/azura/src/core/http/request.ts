import { IncomingMessage } from "http";
import { Request } from "../../@types";

export async function parseRequest(req: IncomingMessage, jsonParser: boolean): Promise<Request> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      try {
        const request: Request = {
          method: req.method!,
          url: req.url!,
          path: req.url?.split("?")[0] || "",
          params: {},
          query: {},
          body: jsonParser && data ? JSON.parse(data) : data,
        };

        resolve(request);
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", (err) => {
      reject(err);
    });
  });
}
