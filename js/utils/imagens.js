// funções de apoio para as imagens dos pokémon;
// Mostrada quando uma imagem falha ao carregar
const IMAGEM_RESERVA = "../assets/logoPokénie.png";

export function urlImagemPorId(id) {
    return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + id + ".png";
}

// usa a arte oficial que vem no JSON da PokéAPI (sprites.other.official-artwork);
// Se não tiver, usa o sprite normal ou monta a URL a partir do id
export function imagemDoPokemon(pokemon) {
    const sprites = pokemon.sprites || {};
    const outros = sprites.other || {};
    const arte = outros["official-artwork"] && outros["official-artwork"].front_default;

    return arte || sprites.front_default || urlImagemPorId(pokemon.id);
}

// se a imagem falhar ao carregar, troca pela imagem reserva
export function usarImagemReserva(imagem) {
    imagem.addEventListener("error", function () {
        imagem.src = IMAGEM_RESERVA;
        imagem.classList.add("sem-imagem");
    }, { once: true });
}