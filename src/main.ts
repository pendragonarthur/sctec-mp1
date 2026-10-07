import { PokedexController } from "./controller/pokedex-controller.ts";
import { PokeApiService } from "./services/pokeapi-service.ts";
import { CatalogoPokemon } from "./services/catalogo-service.ts";

async function main(): Promise<void> { 
    const pokeApi = new PokeApiService();
    const catalogo = new CatalogoPokemon();
    const controller = new PokedexController(pokeApi, catalogo);

    console.log('---------- Iniciando Pokedex Lite ----------');

    await controller.adicionarPokemon("pikachu");
    await controller.adicionarPokemon("charmander");
    await controller.adicionarPokemon("pikachu");
    await controller.adicionarPokemon("pikaccchu");
    await controller.listarPokemons();
    await controller.removerPokemon(25);
    await controller.listarPokemons();
    await controller.listarPokemonPorNome("charmander");

}

main();
