const { Watcher } = require("../../../packages/toolkit/dist/index.cjs");

// Cria um Watcher monitorando duas pastas: ./src e ./tests
const watcher = new Watcher(["./src", "./tests"], {
  ignored: [
    "node_modules/**", // ignora node_modules
    "dist/**", // ignora a pasta de build
  ],
  persistent: true, // mantém o watcher ativo
  usePolling: false, // não usa polling, depende dos eventos do sistema
});

// Evento disparado quando um arquivo é criado
watcher.on("add", (file) => {
  console.log("Arquivo adicionado:", file);
});

// Evento disparado quando um arquivo é alterado
watcher.on("change", (file) => {
  console.log("Arquivo alterado:", file);
});

// Evento disparado quando um arquivo é removido
watcher.on("remove", (file) => {
  console.log("Arquivo removido:", file);
});

// Evento disparado quando ocorre algum erro
watcher.on("error", (err) => {
  console.error("Erro no Watcher:", err);
});

// Exemplo de como fechar o watcher após algum tempo (opcional)
setTimeout(() => {
  watcher.close();
  console.log("Watcher fechado.");
}, 60000);
