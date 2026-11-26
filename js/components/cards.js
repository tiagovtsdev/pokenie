import { ehFavorito } from "../services/armazenamento.js";
import { adicionarFavorito, excluirFavorito } from "../services/favoritosApi.js";
import { criarElemento, formatarNomePokemon, formatarId } from "../utils/formatacao.js";
import { imagemDoPokemon, usarImagemReserva } from "../utils/imagens.js";
import { criarIconeTipo } from "./iconeTipo.js";
import { atualizarBotaoFavorito } from "./favoritado.js";

// botão de bookmark (adiciona ou remove o pokémon dos favoritos)
function criarBotaoFavorito(pokemon, aoMudarFavorito) {
    const nome = formatarNomePokemon(pokemon.name);

    const botao = criarElemento("button", "card-bookmark");
    botao.type = "button";

    const imagem = criarElemento("img");
    imagem.alt = "";
    botao.appendChild(imagem);

    atualizarBotaoFavorito(botao, ehFavorito(pokemon.id), nome);

    botao.addEventListener("click", async function () {
        // POST (adicionar) ou DELETE (remover) na API de favoritos (favoritosApi.js)
        if (ehFavorito(pokemon.id)) {
            await excluirFavorito(pokemon.id);
        } else {
            await adicionarFavorito(pokemon);
        }

        // o botão troca de cor e de imagem na hora
        atualizarBotaoFavorito(botao, ehFavorito(pokemon.id), nome);

        aoMudarFavorito(); // a página decide se precisa redesenhar a lista
    });

    return botao;
}

export function criarCard(pokemon, aoMudarFavorito) {
    const nome = formatarNomePokemon(pokemon.name);

    const card = criarElemento("article", "card");

    // o card inteiro é um link para a página de detalhes
    const link = criarElemento("a", "card-link");
    link.href = "../details/details.html?id=" + pokemon.id;
    link.setAttribute("aria-label", "See details of " + nome);

    const imagem = criarElemento("img", "card-imagem");
    imagem.src = imagemDoPokemon(pokemon);
    imagem.alt = nome;
    imagem.loading = "lazy";
    usarImagemReserva(imagem);

    const info = criarElemento("div", "card-info");
    info.append(
        criarElemento("h2", "card-nome", nome),
        criarElemento("span", "card-id", "ID " + formatarId(pokemon.id))
    );

    const tipos = criarElemento("div", "card-tipos");
    pokemon.types.forEach(function (tipo) {
        tipos.appendChild(criarIconeTipo(tipo.type.name));
    });

    const rodape = criarElemento("div", "card-rodape");
    rodape.append(info, tipos);

    link.append(imagem, rodape);
    card.append(link, criarBotaoFavorito(pokemon, aoMudarFavorito));

    return card;
}