import { Get } from "@/core/extensions/get";
import { Request, Response } from "@/types";

export default class GetEjs extends Get {
  async handle(_req: Request, res: Response) {
    await res.render("index", { title: "Página EJS", user: "Dev" });
  }
}
