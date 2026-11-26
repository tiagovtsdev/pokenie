const IMAGEM_FAVORITO = "../assets/favorito.png";
const IMAGEM_FAVORITADO = "../assets/favoritado.png";

// o botão precisa ter uma <img> dentro.
// --> favoritado: fundo amarelo (classe "favoritado") e imagem favoritado.png.
// --> não favoritado: volta para a cor da base e para a imagem favorito.png.
export function atualizarBotaoFavorito(botao, favorito, nomePokemon) {
    botao.classList.toggle("favoritado", favorito);
    botao.setAttribute("aria-pressed", String(favorito));
    botao.setAttribute("aria-label", (favorito ? "Remove from favorites: " : "Add to favorites: ") + nomePokemon);
    botao.querySelector("img").src = favorito ? IMAGEM_FAVORITADO : IMAGEM_FAVORITO;
}