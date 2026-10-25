
function recuperarPokemons() {
    return JSON.parse(localStorage.getItem("pokemons")) || [];
}

function mostrarFavoritos() {
    const favoritos = recuperarPokemons();

    console.log("Pokémon salvos:", favoritos);
}

function removerFavorito(id){
     const favoritos = recuperarPokemons();

    const favoritosAtualizados = favoritos.filter(function (pokemon) {
        return pokemon.id !== id;
    });
    
    localStorage.setItem("pokemons", JSON.stringify(favoritosAtualizados));

}
mostrarFavoritos();