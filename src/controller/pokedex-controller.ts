import { PokeApiService } from "../services/pokeapi-service.ts"
import type { PokemonModel } from "../models/pokemon-model.ts";
import type { CatalogoPokemon } from "../services/catalogo-service.ts";

export class PokedexController  { 
    private readonly pokeApi: PokeApiService
    private readonly catalogo: CatalogoPokemon

    constructor(pokeApi: PokeApiService, catalogo: CatalogoPokemon) {
        this.pokeApi = pokeApi;
        this.catalogo = catalogo;
    };

    async listarPokemons(): Promise<void>{ 

        const pokemons = this.catalogo.listar();

        if(pokemons?.length === 0){
            console.log(`[AVISO] Catálogo vazio.`)
            return;
        }

        console.log(pokemons);
        return;
    }

    async adicionarPokemon(name: string): Promise<void> { 
        const pokemon = await this.pokeApi.getPokemonByName(name);

        if(pokemon === null) { 
            console.log(`[AVISO] ${name} não encontrado.`);
            return;
        }

        const adicionar = this.catalogo.adicionar(pokemon);
        
        console.log(adicionar ? `[OK] Pokémon adicionado ao catálogo com sucesso.` : `[AVISO] Falha ao adicionar Pokémon ao catálogo.`);

        return;
    }

}