import type { ApiResponseModel } from "../models/api-response-model.ts";
import type { PokemonModel } from "../models/pokemon-model.ts";

export class PokeApiService { 
    private readonly baseUrl = `https://pokeapi.co/api/v2/pokemon`

    public async getPokemonByName(name: string): Promise<PokemonModel | null>  { 
        try {
            const res = await fetch(`${this.baseUrl}/${name.trim().toLowerCase()}`);

            if (!res.ok){
                console.log(`[AVISO] Falha no servidor.`);
                return null;
            };

            const data = await res.json() as ApiResponseModel;

            const pokemon: PokemonModel = { 
                id: data.id,
                name: data.name,
                height: data.height,
                weight: data.weight,
                types: data.types.map((i)=>i.type.name)
            }
            
            return pokemon;

        } catch(error) {
            console.log(error)
            return null;
        }
    }
}