import fetch from 'node-fetch';

/**
 * Represents the response from the Pokémon API.
 */
interface PokemonAPIResponse {
  name: string;
  id: number;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  sprites: { front_default: string };
  height: number;
  weight: number;
  stats: { stat: { name: string }; base_stat: number }[];
  species: { url: string };
}

/**
 * Represents the response from the Pokémon species API.
 */
interface SpeciesAPIResponse {
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
  evolution_chain: { url: string };
}

/**
 * Represents the structured data of a Pokémon.
 */
interface PokeData {
  name: string;
  id: number;
  type: string[];
  abilities: string[];
  sprite: string;
  height: number;
  weight: number;
  base_stats: Record<string, number>;
  evolution_chain: {
    url: string;
  };
  description: string;
}

/**
 * Represents the query parameters for fetching Pokémon data.
 */
interface PokeDexQuery {
  id?: number | number[];
  name?: string | string[];
}

/**
 * PokeDex class to fetch Pokémon details from the PokéAPI.
 */
export class PokeDex {
  constructor() {}

  /**
   * Fetches Pokémon data based on a given query.
   * @param {PokeDexQuery} query - The query object containing either 'id' or 'name'.
   * @returns {Promise<PokeData | PokeData[]>} - Returns the Pokémon data.
   * @throws {Error} If neither 'id' nor 'name' is provided.
   */
  async fetch(query: PokeDexQuery): Promise<PokeData | PokeData[]> {
    if (query.id) {
      return await this._fetchByField('id', query.id);
    } else if (query.name) {
      return await this._fetchByField('name', query.name);
    } else {
      throw new Error('You must provide either "id" or "name" for the query.');
    }
  }

  /**
   * Fetches Pokémon data by a specific field ('id' or 'name').
   * @param {'id' | 'name'} field - The field type to fetch by.
   * @param {number | string | (number | string)[]} value - The value(s) to search for.
   * @returns {Promise<PokeData | PokeData[]>} - Returns Pokémon data.
   */
  private async _fetchByField(_field: 'id' | 'name', value: number | string | (number | string)[]): Promise<PokeData | PokeData[]> {
    if (Array.isArray(value)) {
      const promises = value.map((v) => this._getPokemonData(v));
      return await Promise.all(promises);
    } else {
      return await this._getPokemonData(value);
    }
  }

  /**
   * Retrieves Pokémon data from the PokéAPI.
   * @param {number | string} identifier - The Pokémon ID or name.
   * @returns {Promise<PokeData>} - Returns the structured Pokémon data.
   * @throws {Error} If the Pokémon is not found or an API error occurs.
   */
  private async _getPokemonData(identifier: number | string): Promise<PokeData> {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
      if (!response.ok) throw new Error(`Pokémon not found: ${identifier}`);

      const data = (await response.json()) as PokemonAPIResponse;
      const speciesResponse = await fetch(data.species.url);
      const speciesData = (await speciesResponse.json()) as SpeciesAPIResponse;

      const flavorEntry = speciesData.flavor_text_entries.find((entry) => entry.language.name === 'en');
      const description = flavorEntry ? flavorEntry.flavor_text.replace(/\n|\f/g, ' ') : '';

      const base_stats: Record<string, number> = {};
      data.stats.forEach((statObj) => {
        base_stats[statObj.stat.name] = statObj.base_stat;
      });

      return {
        name: data.name,
        id: data.id,
        type: data.types.map((t) => t.type.name),
        abilities: data.abilities.map((a) => a.ability.name),
        sprite: data.sprites.front_default,
        height: data.height,
        weight: data.weight,
        base_stats: base_stats,
        evolution_chain: speciesData.evolution_chain,
        description: description
      };
    } catch (err) {
      console.error(err);
      throw new Error('Error fetching Pokémon data.');
    }
  }
}
