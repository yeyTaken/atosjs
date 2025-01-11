![npm](https://img.shields.io/npm/v/atosjs) ![license](https://img.shields.io/github/license/yeyTaken/atosjs) [![README_PT](https://img.shields.io/badge/README-PT--BR-blue?logo=github&style=flat-square)](https://github.com/yeyTaken/atosjs/blob/master/README_PT.md) ![downloads](https://img.shields.io/npm/dt/atosjs) [![GitHub](https://img.shields.io/badge/GitHub-yeyTaken%2Fatosjs-181717?logo=github)](https://github.com/yeyTaken/atosjs)
---

<h1 align="center">🏷️ AtosJS</h1>  
<h2 align="center">🎁 A simple, efficient, and powerful code manager for reward systems! 🎯</h2>

---

### 📖 About  

**AtosJS** is an easy-to-use library designed for managing "gifts" (reward codes). It’s perfect for promotions, reward systems, and any scenario where you need to generate, view, and redeem codes effectively and efficiently. 🚀  

---

### 📦 Installation  

Add **AtosJS** to your project using **npm** or **yarn**:  

```bash
npm install atosjs
# or
yarn add atosjs
```

---

### 🛠️ Usage Examples  

#### 1️⃣ Initializing AtosJS  

```js
const { GiftManager } = require('atosjs');
// or
import { GiftManager } from 'atosjs';

const gm = new GiftManager({
    fileName: 'gift-test', // the file name to be created.
    fileType: 2, // the type of file to be created.
});

/** 
 * @fileType 1 = .json
 * @fileType 2 = .yaml
 * @fileType != 1 or 2 = error
*/

// This will create a file named gift-test.yaml
```

#### 2️⃣ Generating a Gift  

```js
const giftId = await gm.generate({
    type: 'coins', // gift type
    value: 500, // reward value
    expiration: '3d', // expires in 3 days
    maxRedeem: 12 // can be redeemed 12 times (default: 1)
});

console.log(`Generated code: ${giftId}`);
```

#### 3️⃣ Viewing a Gift  

```js
const giftDetails = await gm.view(giftId);
console.log(giftDetails);
// Output: { valid: true, type: 'coins', value: 500 }
```

#### 4️⃣ Redeeming a Gift  

```js
const result = await gm.redeem(giftId);
if (result.success) {
    console.log('🎉 Gift redeemed successfully!');
} else {
    console.log('❌ The gift is invalid or has already been redeemed.');
}
```

---

### ⚙️ Configurations  

#### `GiftManager` Options  

- **`fileName`**: File name for data storage (default: `gifts`).
- **`fileType`**: File type, can be `.json` or `.yaml`.

#### Gift Generation Parameters  

- **`type`**: Gift type (e.g.: `coins`, `item`).
- **`value`**: Reward value for the gift.
- **`expiration`**: Expiration time in formats like `60s`, `10m`, `7d`, `1y`.
- **`maxRedeem`**: Maximum number of allowed redemptions (default: `1`).

---

### 📚 Technologies Used  

- **Node.js**  
- **JavaScript**  
- **TypeScript**  
- **quick.db**  

---

### 🤝 How to Contribute  

Contributions are welcome! Follow these steps to get started:  

1. Fork this repository.  
2. Create a new **branch**: `git checkout -b my-change`.  
3. Make your changes and **commit**: `git commit -m 'Description of change'`.  
4. Push to your branch: `git push origin my-change`.  
5. Open a **Pull Request**.

---

### 📄 License  

This project is licensed under the [MIT License](LICENSE).  

---

### 👨‍💻 Author  

Created with 💻 by [yeyTaken](https://github.com/yeyTaken) and [Israel R. Jatobá](https://github.com/).