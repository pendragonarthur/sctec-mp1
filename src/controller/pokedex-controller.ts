import { PokeApiService } from "../services/pokeapi-service.ts"
import type { CatalogoPokemon } from "../services/catalogo-service.ts";
import PokemonFormatter from "../utils/formatter.ts";

export class PokedexController  { 
    private readonly pokeApi: PokeApiService
    private readonly catalogo: CatalogoPokemon

    constructor(pokeApi: PokeApiService, catalogo: CatalogoPokemon) {
        this.pokeApi = pokeApi;
        this.catalogo = catalogo;
    }

    listarPokemons(): void { 
        const pokemons = this.catalogo.listar();

        if(pokemons.length === 0){
            console.log(`[AVISO] Catálogo vazio.`);
            return;
        }

        pokemons.forEach((p)=>console.log(PokemonFormatter(p)));

        return;
    }

    listarPokemonPorNome(name: string): void {
        const pokemon = this.catalogo.listarPokemon(name);

        console.log(pokemon ? `[OK] Pokémon encontrado: ${pokemon.name} \n ${PokemonFormatter(pokemon)}` : `[ERRO] Falha ao buscar Pokémon.`);

        return;
    }

    async adicionarPokemon(name: string): Promise<void> { 
        const pokemon = await this.pokeApi.buscarPokemon(name);

        if(pokemon === null) { 
            console.log(`[ERRO] Pokémon ${name} não encontrado. Inexistente ou nome inválido.`);
            return;
        }

        const adicionar = this.catalogo.adicionar(pokemon);
        
        console.log(adicionar ? `[OK] ${pokemon.name} adicionado ao catálogo com sucesso.` : `[ERRO] Falha ao adicionar Pokémon ao catálogo.`);

        return;
    }
    
    removerPokemon(id: number): void { 
        const remover  = this.catalogo.remover(id);

        console.log(remover ? `[OK] Pokémon removido do catálogo com sucesso.` : `[ERRO] Falha ao remover Pokémon do catálogo.`);

        return;
    }
}