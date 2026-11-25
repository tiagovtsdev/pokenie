import { listaPokemons } from "../data/pokemons.js";

const CHAVE = "pokemons";

// lê o array salvo. Se não existir ou estiver quebrado, devolve o array vazio
function lerFavoritos() {
    try {
        const salvos = JSON.parse(localStorage.getItem(CHAVE));

        if (!Array.isArray(salvos)) {
            return [];
        }

        // só aceita itens que sejam objetos com id
        return salvos.filter(function (item) {
            return item && typeof item === "object" && Number.isFinite(Number(item.id));
        });
    } catch (erro) {
        return []; // armazenamento bloqueado ou dados corrompidos
    }
}

function guardarFavoritos(favoritos) {
    try {
        localStorage.setItem(CHAVE, JSON.stringify(favoritos));
    } catch (erro) {
        console.error("Could not save the favorites.", erro);
    }
}

// devolve os pokémons favoritados (objetos completos) na ordem em que foram salvos
export function recuperarPokemons() {
    return lerFavoritos().map(function (item) {
        const completo = listaPokemons.find(function (pokemon) {
            return pokemon.id === Number(item.id);
        });

        return completo || item;
    });
}

export function ehFavorito(id) {
    return letFavoritos().some(function (item) {
        return Number(item.id) === Number(id);
    });
}

export function salvarPokemon(pokemon) {
    if (!ehFavorito(pokemon.id)) {
        guardarFavoritos(lerFavoritos().concat(pokemon));
    }
}

export function removerFavorito(id) {
    guardarFavoritos(lerFavoritos().filter(function (item) {
        return  Number(item.id) !== Number(id);
    }));
}