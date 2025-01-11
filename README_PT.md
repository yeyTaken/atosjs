![npm](https://img.shields.io/npm/v/atosjs) ![license](https://img.shields.io/github/license/yeyTaken/atosjs) ![downloads](https://img.shields.io/npm/dt/atosjs) [![GitHub](https://img.shields.io/badge/GitHub-yeyTaken%2Fatosjs-181717?logo=github)](https://github.com/yeyTaken/atosjs)

---

<h1 align="center">🏷️ AtosJS</h1>  
<h2 align="center">🎁 Um gerenciador de códigos simples, eficiente e poderoso para sistemas de recompensas! 🎯</h2>

---

### 📖 Sobre  

**AtosJS** é uma biblioteca fácil de usar, projetada para gerenciar "gifts" (códigos de recompensa). Ideal para sistemas de promoções, recompensas e outros cenários onde seja necessário gerar, visualizar e resgatar códigos de forma prática e eficiente. 🚀  

---

### 📦 Instalação  

Adicione o **AtosJS** ao seu projeto com **npm** ou **yarn**:  

```bash
npm install atosjs
# ou
yarn add atosjs
```

---

### 🛠️ Exemplos de Uso  

#### 1️⃣ Inicializando o AtosJS  

```js
const { GiftManager } = require('atosjs');
// ou
import { GiftManager } from 'atosjs';

const gm = new GiftManager({
    fileName: 'gift-test', // nome do arquivo que será gerado.
    fileType: 2, // tipo do arquivo que será gerado.
});

/** 
 * @fileType 1 = .json
 * @fileType 2 = .yaml
 * @fileType != 1 ou 2 = erro
*/

// Isso criará um arquivo chamado gift-test.yaml
```

#### 2️⃣ Gerando um Gift  

```js
const giftId = await gm.generate({
    type: 'coins', // tipo do gift
    value: 500, // valor associado ao gift
    expiration: '3d', // expira em 3 dias
    maxRedeem: 12 // pode ser resgatado 12 vezes (padrão: 1)
});

console.log(`Código gerado: ${giftId}`);
```

#### 3️⃣ Visualizando um Gift  

```js
const giftDetails = await gm.view(giftId);
console.log(giftDetails);
// Saída: { valid: true, type: 'coins', value: 500 }
```

#### 4️⃣ Resgatando um Gift  

```js
const result = await gm.redeem(giftId);
if (result.success) {
    console.log('🎉 Gift resgatado com sucesso!');
} else {
    console.log('❌ O gift é inválido ou já foi resgatado.');
}
```

---

### ⚙️ Configurações  

#### Opções do `GiftManager`  

- **`fileName`**: Nome do arquivo para armazenamento (padrão: `gifts`).
- **`fileType`**: Tipo do arquivo, pode ser `.json` ou `.yaml`.

#### Parâmetros de Geração de Gifts  

- **`type`**: Tipo do gift (ex.: `coins`, `item`).
- **`value`**: Valor associado ao gift.
- **`expiration`**: Tempo de expiração no formato `60s`, `10m`, `7d`, `1y`.
- **`maxRedeem`**: Número máximo de resgates permitidos (padrão: `1`).

---

### 📚 Tecnologias Utilizadas  

- **Node.js**  
- **JavaScript**  
- **TypeScript**  
- **quick.db**  

---

### 🤝 Como Contribuir  

Contribuições são bem-vindas! Siga os passos abaixo para colaborar:  

1. Faça um **fork** deste repositório.  
2. Crie um **branch**: `git checkout -b minha-mudanca`.  
3. Realize suas alterações e faça um **commit**: `git commit -m 'Descrição da mudança'`.  
4. Envie suas alterações: `git push origin minha-mudanca`.  
5. Abra um **Pull Request**.

---

### 📄 Licença  

Este projeto está licenciado sob a [MIT License](LICENSE).  

---

### 👨‍💻 Autor  

Criado com 💻 por [yeyTaken](https://github.com/yeyTaken) e [Israel R. Jatobá](https://github.com/).