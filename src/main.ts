import { PokedexController } from "./controller/pokedex-controller.ts";
import { PokeApiService } from "./services/pokeapi-service.ts";
import { CatalogoPokemon } from "./services/catalogo-service.ts";

async function main(): Promise<void> { 
    const pokeApi = new PokeApiService();
    const catalogo = new CatalogoPokemon();
    const controller = new PokedexController(pokeApi, catalogo);

    console.log('---------- Iniciando Pokedex Lite ----------');

    await controller.adicionarPokemon("pikachu");
    await controller.listarPokemons();
}

main();
