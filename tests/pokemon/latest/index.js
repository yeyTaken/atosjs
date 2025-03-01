const { PokeDex } = require("../../../packages/pokemon/dist/index.cjs");

const pokedex = new PokeDex();

async function main() {
  const pikachu = await pokedex.fetch({ name: "pikachu" }); // or { id: 25 }, { id: [25, 18]} and name: ["Pokemon-1", "Pokemon-2"]. 

  // all info:
  console.log("Pikachu:", pikachu);

  // sprite:
  console.log("Sprite:", pikachu.sprite);
}

main();
