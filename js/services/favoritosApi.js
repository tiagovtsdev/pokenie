// "API" de favoritos; A PokéAPI só aceita GET (leitura), então os outros métodos HTTP;
// São aplicados aqui, numa API simulada que guarda os dados no navegador (localStorage);
// Todas as funções são async (assíncronas), como seriam as chamadas reais com fetch:
//   GET    /favoritos       -> listarFavoritos()
//   POST   /favoritos       -> adicionarFavorito(pokemon)
//   PUT    /favoritos/{id}  -> atualizarFavorito(pokemon)
//   DELETE /favoritos/{id}  -> excluirFavorito(id)

import { recuperarPokemons, salvarPokemon, atualizarPokemon, removerFavorito } from "./armazenamento.js";

// GET: devolve os Pokémons favoritados
export async function listarFavoritos() {
    return recuperarPokemons();
}

// POST: cria um favorito novo
export async function adicionarFavorito(pokemon) {
    salvarPokemon(pokemon);
    return pokemon;
}

// PUT: troca os dados de um favorito que já existe (usado para manter os dados atualizados)
export async function atualizarFavorito(pokemon) {
    atualizarPokemon(pokemon);
    return pokemon;
}

// DELETE: apaga o favorito
export async function excluirFavorito(id) {
    removerFavorito(id);
}