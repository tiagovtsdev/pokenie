// Simula uma requisição assíncrona (nenhuma pokéAPI foi implementada.);
// Ele espera um pouco e depois devolve os dados, para as páginas mostrarem o carregamento;
// Coloque ?simularErro=1 no endereço da página para a PRIMEIRA tentativa falhar,
// assim dá para ver a mensagem de erro e o botão de "Try again".

import { listaPokemons } from "../data/pokemons.js";
import { recuperarPokemons } from "./armazenamento.js";

const ATRASO_SIMULADO = 800; // ms

let tentativas = 0;

function deveFalhar() {
    const pediuErro = new URLSearchParams(window.location.search).get("simularErro") === "1";
    return pediuErro && tentativas === 1;
}

function simularRequisicao(obterDados) {
    tentativas++;

    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (deveFalhar()) {
                reject(new Error("Simulated network error"));
                return;
            }

            resolve(obterDados());
        }, ATRASO_SIMULADO);
    });
}

export function carregarPokemons() {
    return simularRequisicao(function () {
        return listaPokemons;
    });
}

export function carregarFavoritos() {
    return simularRequisicao(recuperarPokemons);
}