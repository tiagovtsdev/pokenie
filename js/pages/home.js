import { iniciarPaginaDeLista } from "./lista.js";
import { carregarPokemons, buscarPokemons } from "../services/pokemonServices.js";

iniciarPaginaDeLista({
    carregar: carregarPokemons, // lista leve (id e nome) de todos os pokémon
    preparar: buscarPokemons, // busca os tipos com limite de 10 pokémons da página
    mensagemSemItens: "No Pokémon found."
});