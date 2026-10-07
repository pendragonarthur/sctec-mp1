import type { PokemonModel } from "../models/pokemon-model";

export class CatalogoPokemon {
    private pokemons: PokemonModel[] = [];

    public adicionar(pokemon: PokemonModel): boolean{
        const pokemonExists = this.pokemons.some((p) => p.id === pokemon.id);

        if(pokemonExists){
            console.log(`[AVISO] Pokémon ${pokemon.name} já existe no catálogo.`);
            return false;
        }
        
        this.pokemons.push(pokemon);

        return true;
    }

    public listar(): PokemonModel[] { 
        const pokemons = [...this.pokemons];
        
        return pokemons;
    } 

    public listarPokemon(name: string): PokemonModel | undefined { 
        const pokemonExists = this.pokemons.some((p) => p.name === name);

        if (!pokemonExists) return undefined;

        const pokemon = this.pokemons.find((p) => p.name === name);

        return pokemon;
    }

    public remover(id: number): boolean { 
        const pokemonExists = this.pokemons.some((p)=> p.id === id);
        
        if (!pokemonExists) return false;

        this.pokemons = this.pokemons.filter((p)=> p.id !== id);

        return true;
    }
}