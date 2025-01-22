const { TimeFormat } = require('atosjs');

const t = new TimeFormat(); // Instância de TimeFormat

console.log('Iniciando testes para TimeFormat...\n');

// Teste: Convertendo para milissegundos
console.log('Teste: convertToMilliseconds');
console.log(`10s -> ${t.convertToMilliseconds('10s')}ms`);
console.log(`5m -> ${t.convertToMilliseconds('5m')}ms`);
console.log(`2h -> ${t.convertToMilliseconds('2h')}ms\n`);

// Teste: Convertendo de milissegundos
console.log('Teste: convertFromMilliseconds');
console.log(`3661000ms -> ${t.convertFromMilliseconds(3661000)}\n`);

// Teste: Elapsed time
console.log('Teste: elapsedSince');
const timestamp = Date.now() - 5000;
console.log(`Elapsed time (aprox. 5000ms) -> ${t.elapsedSince(timestamp)}ms\n`);

// Teste: Repeat com número limitado
console.log('Teste: repeat');
t.repeat(3, '1s', () => {
  console.log('Repeat callback executado!');
});

// Teste: Repeat infinito
console.log('Teste: repeatInfinite');
const infiniteId = t.repeatInfinite('1s', () => {
  console.log('RepeatInfinite callback executado!');
  clearInterval(infiniteId); // Finaliza após um ciclo
});

// Teste: Countdown
console.log('Teste: countdown');
t.countdown('2s', () => {
  console.log('Countdown completo!\n');
});

// Teste: DailyAt
console.log('Teste: dailyAt');
t.dailyAt(new Date().getHours(), new Date().getMinutes() + 1, () => {
  console.log('Callback dailyAt executado!\n');
});

// Teste: After
console.log('Teste: after');
t.after('2s', () => {
  console.log('After callback executado!\n');
});

// Teste: Every
console.log('Teste: every');
const everyId = t.every('1s', () => {
  console.log('Every callback executado!');
  clearInterval(everyId); // Finaliza após um ciclo
});

console.log('\nTestes concluídos! Verifique os logs.');


/*
$ npm init -y
Wrote to /workspaces/atosjs/tests/my-project/package.json:

{
  "name": "my-project",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}



$ npm i atosjs@latest

added 41 packages, and audited 42 packages in 3s

9 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
*/
