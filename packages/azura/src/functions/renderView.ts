import { TemplateManager } from "@/utils/templateManager";

export async function renderView(
  view: string, 
  data: Record<string, any> = {}, 
  viewsPath?: string
): Promise<string> {
  const templateManager = new TemplateManager(viewsPath);
  
  return templateManager.render(view, data);
}
