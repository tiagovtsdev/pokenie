import { iniciarPaginaDeLista } from "./lista.js";
import { carregarFavoritos } from "../services/pokemonServices.js";
import { recuperarPokemons } from "../services/armazenamento.js";

iniciarPaginaDeLista({
    carregar: carregarFavoritos,
    lerAgora: recuperarPokemons, // usada quando um favorito é removido
    mensagemSemItens: "Nothing to see your favorites, sorry!"
});