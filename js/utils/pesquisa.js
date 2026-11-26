import { obterId } from "../data/pokeapi.js";

// "gen" acha nomes que contêm o texto. "448", "0448" e "#448" acham o ID
export function filtrarPokemons(lista, textoDigitado) {
    const termo = textoDigitado.trim().toLowerCase().replace("#", "");

    if (termo === "") {
        return lista;
    }

    const buscaPorId = /^\d+$/.test(termo);

    return lista.filter(function (pokemon) {
        if (buscaPorId) {
            return obterId(pokemon) === Number(termo);
        }

        return pokemon.name.toLowerCase().includes(termo);
    });
}

// faz a barra de pesquisa piscar em vermelho (animação está no arquivo.css)
export function piscarErro(barra) {
    barra.classList.remove("erro");
    void barra.offsetWidth; // reinicia a animação se ela já estiver rodando
    barra.classList.add("erro");

    barra.addEventListener("animationend", function () {
        barra.classList.remove("erro");
    }, { once: true });
}