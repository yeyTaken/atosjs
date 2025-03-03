<div align="center">
  <img src="../../assets/images/atosPNG.png" width="456" alt="@atosjs/pokemon"></img>
  
  <p>
  <!-- @atosjs/pokemon badges -->
  <a href="https://www.npmjs.com/package/@atosjs/pokemon">
    <img src="https://img.shields.io/npm/v/@atosjs/pokemon?style=for-the-badge&color=36a5f4&label=npm&logo=npm" />
  </a>
  <a href="https://www.npmjs.com/package/@atosjs/pokemon">
    <img src="https://img.shields.io/npm/dt/@atosjs/pokemon?style=for-the-badge&color=f5a97f&label=downloads&logo=npm" />
  </a>
  <a href="https://github.com/yeyTaken/atosjs">
    <img src="https://img.shields.io/badge/github-atosjs-8da6ce?style=for-the-badge&logo=github" />
  </a>
</p>
</div>

A simple and easy-to-use JavaScript/TypeScript library to fetch Pokémon data from the PokeAPI.

## Installation

To use PokeDex in your project, install it via npm:

```sh
npm install @atosjs/pokemon
```

Or using yarn:

```sh
yarn add @atosjs/pokemon
```

## Usage

### Importing the Library

If you're using CommonJS:

```js
const { PokeDex } = require("@atosjs/pokemon");
```

If you're using ES Modules:

```js
import { PokeDex } from "@atosjs/pokemon";
```

### Fetching Pokémon Data

Create an instance of `PokeDex` and use the `fetch` method to retrieve Pokémon details.

#### Fetch by Name

```js
const pokedex = new PokeDex();

async function getPokemon() {
  const pikachu = await pokedex.fetch({ name: "pikachu" });
  console.log(pikachu);
}

getPokemon();
```

#### Fetch by ID

```js
async function getPokemonById() {
  const bulbasaur = await pokedex.fetch({ id: 1 });
  console.log(bulbasaur);
}

getPokemonById();
```

#### Fetch Multiple Pokémon

```js
async function getMultiplePokemon() {
  const pokemons = await pokedex.fetch({ id: [25, 4, 7] }); // Pikachu, Charmander, Squirtle
  console.log(pokemons);
}

getMultiplePokemon();
```

### Accessing Pokémon Data

The returned object contains the following properties:

```js
{
  name: "pikachu",
  id: 25,
  type: ["electric"],
  abilities: ["static", "lightning-rod"],
  sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  height: 4,
  weight: 60,
  base_stats: {
    hp: 35,
    attack: 55,
    defense: 40,
    speed: 90,
  },
  evolution_chain: {
    url: "https://pokeapi.co/api/v2/evolution-chain/10/"
  },
  description: "Whenever Pikachu comes across something new, it blasts it with electricity."
}
```

### Fetch and Display Pokémon Sprite

```js
async function getSprite() {
  const pikachu = await pokedex.fetch({ name: "pikachu" });
  console.log("Sprite URL:", pikachu.sprite);
}

getSprite();
```

## Error Handling

If an invalid Pokémon name or ID is provided, an error will be thrown.

```js
async function invalidPokemon() {
  try {
    const unknown = await pokedex.fetch({ name: "unknownpokemon" });
  } catch (error) {
    console.error("Error:", error.message);
  }
}

invalidPokemon();
```

## Links
- [GitHub](https://github.com/yeyTaken/atosjs/packages/pokemon) monorep.
- [NPM](https://www.npmjs.com/package/@atosjs/pokemon), Latest version: `v1.0.0`.

<p align="center">
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/footers/gray0_ctp_on_line.svg?sanitize=true"></img>
</p>


<p align="center">
  Copyright &copy; 2025, Israel R. Jatobá & TakenStudios.
</p>

<p align="center">
  <a href="https://github.com/yeyTaken/atosjs/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/yeyTaken/atosjs?style=for-the-badge&color=b7bdf8" />
  </a>
</p>
