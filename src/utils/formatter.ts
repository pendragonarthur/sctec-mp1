import type { PokemonModel } from "../models/pokemon-model";

export default function PokemonFormatter(pokemon: PokemonModel): string{
    return `#${pokemon.id} - ${pokemon.name} | Tipos: ${pokemon.types.join(", ")} | Altura: ${pokemon.height} | Peso: ${pokemon.weight}`;
}