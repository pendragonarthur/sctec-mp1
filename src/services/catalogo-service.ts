import type { PokemonModel } from "../models/pokemon-model";

export class CatalogoPokemon {
    private pokemons: PokemonModel[] = [];

    public adicionar(pokemon: PokemonModel): boolean{
        this.pokemons.push(pokemon);
        console.log(`[OK] Pokémon adicionado ao catálogo com sucesso. `);
        return true;
    }

    public listar(): PokemonModel[] | null { 
        const pokemons = [...this.pokemons];
        return pokemons;
    } 

    public remover(id?: number): boolean { 
        const pokemonExists = this.pokemons.some((p)=> p.id === id);
        
        if(!pokemonExists){
            console.log(`[AVISO] Pokémon de ID ${id} não encontrado.`);
            console.log(`[AVISO] Não foi possível remover Pokémon do catálogo.`)
            return false;
        }        

        this.pokemons.filter((p)=> p.id !== id);
        console.log(`[OK] Pokémon de ID ${id} removido do catálogo.`);
        return true;
    }
}