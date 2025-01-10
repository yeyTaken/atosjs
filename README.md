![npm](https://img.shields.io/npm/v/atosjs) ![license](https://img.shields.io/github/license/yeyTaken/atosjs) ![downloads](https://img.shields.io/npm/dt/atosjs)  
[![GitHub](https://img.shields.io/badge/GitHub-yeyTaken%2Fatosjs-181717?logo=github)](https://github.com/yeyTaken/atosjs)

---

<h1 align="center">🏷️ AtosJS</h1>  
<h2 align="center">🎁 Um gerenciador de códigos simples, eficiente e poderoso para sistemas de recompensas! 🎯</h2>

---


AtosJS é um gerenciador de "gifts" fácil de usar, perfeito para sistemas de recompensas, promoções e outros cenários onde a geração, visualização e resgate de códigos é necessária. 🚀  

---

<h2 align="center">📦 Instalação</h2>  

Adicione o AtosJS ao seu projeto com npm ou yarn:  

```bash
npm install atosjs
# ou
yarn add atosjs
```

---

<h2 align="center">🛠️ Exemplos de Uso</h2>  

### 1️⃣ Inicializando o AtosJS  

```typescript
import { GiftManager } from 'atosjs';

const giftManager = new GiftManager({ fileName: 'meuBancoDeGifts' });
```

### 2️⃣ Gerando um Gift  

```typescript
const giftId = await giftManager.generate({
    type: 'coins',
    amount: 500,
    expiration: '3d', // Expira em 3 dias
    maxRedeem: 12 // pode ser usado 12 vezes
});
console.log(`Código gerado: ${giftId}`);
```

### 3️⃣ Visualizando um Gift  

```typescript
const giftDetails = await giftManager.view(giftId);
console.log(giftDetails);
// Saída: { valid: true, type: 'coins', amount: 500 }
```

### 4️⃣ Resgatando um Gift  

```typescript
const result = await giftManager.redeem(giftId);
if (result.success) {
    console.log('🎉 Gift resgatado com sucesso!');
} else {
    console.log('❌ O gift é inválido ou já foi resgatado.');
}
```

---

<h2 align="center">⚙️ Configurações</h2>  

### Opções  

- **`fileName`**: Nome do arquivo para armazenamento dos dados (padrão: `gifts`).

### Parâmetros de Geração  

- **`type`**: Tipo do gift (ex: "coins", "item").
- **`amount`**: Valor associado ao gift.
- **`expiration`**: Tempo de expiração, no formato `60s`, `10m`, `7d`, `1y`.
- **`maxRedeem`**: Valor máximo de uso.

---

<h2 align="center">📚 Tecnologias Utilizadas</h2>  

- **Node.js**  
- **TypeScript**  
- **quick.db**  

---

<h2 align="center">🤝 Contribuições</h2>  

Contribuições são bem-vindas!  

1. Faça um fork.  
2. Crie um branch: `git checkout -b minha-mudanca`.  
3. Faça um push: `git push origin minha-mudanca`.  
4. Abra um Pull Request.  

---

<h2 align="center">📄 Licença</h2>  

Este projeto está sob a licença [MIT](LICENSE).  

---

<h2 align="center">👨‍💻 Autor</h2>  

Criado com 💻 por [yeyTaken](https://github.com/yeyTaken).
