import { FSWatcher, watch } from "chokidar";
import { EventEmitter } from "events";

/**
 * Opções de configuração para o Watcher.
 */
export interface WatcherOptions {
  /**
   * Arquivos ou padrões a serem ignorados.
   * Pode ser uma string, RegExp ou array de strings/RegExp.
   * @default /(^|[\/\\])\../ (ignora arquivos ocultos)
   */
  ignored?: string | RegExp | (string | RegExp)[];
  
  /**
   * Se o watcher deve continuar rodando após detectar mudanças.
   * @default true
   */
  persistent?: boolean;
  
  /**
   * Suporte a subpastas (não usado diretamente, mas disponível para futuras versões)
   */
  recursive?: boolean;
  
  /**
   * Se deve usar polling em vez de eventos do sistema.
   * @default false
   */
  usePolling?: boolean;
}

/**
 * Tipos de eventos que o Watcher pode emitir.
 */
export type WatcherEvents = "add" | "change" | "remove" | "error";

/**
 * Classe Watcher para monitoramento de arquivos e pastas em tempo real.
 * Baseada em chokidar, fornece eventos claros e tipados.
 */
export class Watcher extends EventEmitter {
  private watcher: FSWatcher;

  /**
   * Cria um novo Watcher.
   * @param paths Caminho ou array de caminhos a serem monitorados.
   * @param options Configurações opcionais do watcher.
   */
  constructor(paths: string | string[], options: WatcherOptions = {}) {
    super();

    // Converte string única em array para permitir múltiplos caminhos
    const watchPaths = Array.isArray(paths) ? paths : [paths];

    this.watcher = watch(watchPaths, {
      ignored: options.ignored || /(^|[\/\\])\../,
      persistent: options.persistent ?? true,
      usePolling: options.usePolling ?? false,
    });

    this.registerEvents();
  }

  /**
   * Registra os eventos do chokidar e os emite através do EventEmitter.
   * Eventos disponíveis: add, change, remove, error.
   */
  private registerEvents(): void {
    this.watcher
      .on("add", (filePath: string) => this.emit("add", filePath))
      .on("change", (filePath: string) => this.emit("change", filePath))
      .on("unlink", (filePath: string) => this.emit("remove", filePath))
      .on("error", (err: unknown) => {
        if (err instanceof Error) {
          this.emit("error", err);
        } else {
          this.emit("error", new Error(String(err)));
        }
      });
  }

  /**
   * Fecha o watcher e libera todos os recursos.
   */
  public close(): void {
    this.watcher.close();
  }
}
