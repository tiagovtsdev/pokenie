function mostrarFavoritos() {
    const favoritos = recuperarPokemons();
    mostrarPokemons(favoritos);
}

// Mostra os favoritos quando a página é carregada
mostrarFavoritos();