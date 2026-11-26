const CHAVE = "pokemons";

// lê o array salvo. Se não existir ou estiver quebrado, devolve um array vazio
function lerFavoritos() {
    try {
        const salvos = JSON.parse(localStorage.getItem(CHAVE));

        if (!Array.isArray(salvos)) {
            return [];
        }

        // só aceita itens que sejam objetos com id
        return salvos.filter(function (item) {
            return item && typeof item === "object" && Number.isFinite(Number(item.id)) && Array.isArray(item.types);
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

// devolve os pokémons favoritados
export function recuperarPokemons() {
    return lerFavoritos();
}

export function ehFavorito(id) {
    return lerFavoritos().some(function (item) {
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
        return Number(item.id) !== Number(id);
    }));
}

// troca os dados de um favorito que já existe
export function atualizarPokemon(pokemon) {
    guardarFavoritos(lerFavoritos().map(function (item) {
        return Number(item.id) === Number(pokemon.id) ? pokemon : item;
    }));
}