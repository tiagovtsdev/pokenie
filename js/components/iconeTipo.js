import { criarElemento, formatarNome } from "../utils/formatacao.js";

// cria o ícone a partir da imagem assets/icon-<tipo>.png
export function criarIconeTipo(nomeTipo) {
    const icone = criarElemento("span", "icone-tipo tipo-" + nomeTipo);
    icone.title = formatarNome(nomeTipo);

    const imagem = criarElemento("img");
    imagem.alt = "";

    // se a imagem não existir, mostra só o círculo com a cor do tipo
    imagem.addEventListener("error", function () {
        imagem.remove();
        icone.classList.add("sem-icone");
    }, { once: true });

    imagem.src = "../assets/icon-" + nomeTipo + ".png";

    // texto para leitores de tela
    const textoLeitor = criarElemento("span", "sr-only", formatarNome(nomeTipo));

    icone.append(imagem, textoLeitor);

    return icone;
}