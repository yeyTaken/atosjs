import { templateManager } from "../utils/templateManager";

export async function renderView(view: string, data: Record<string, any> = {}): Promise<string> {
  return templateManager.render(view, data);
}
