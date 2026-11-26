// Funções de apoio para ler as respostas da PokéAPI;
// OBS --> elas NÃO mudam o JSON da API: só leem os dados dele e calculam o que a tela precisa.

import { formatarNome } from "../utils/formatacao.js";

// "https://pokeapi.co/api/v2/pokemon/448/" -> 448
export function extrairId(url) {
    return Number(url.split("/").filter(Boolean).pop());
}

// na lista da API, cada item tem só "name" e "url"; Já o pokémon completo tem "id".
export function obterId(item) {
    return item.id !== undefined ? item.id : extrairId(item.url);
}

// A API devolve textos em vários idiomas. Pega o último em inglês.
export function textoEmIngles(lista, campo) {
    const encontrados = lista.filter(function (item) {
        return item.language.name === "en";
    });

    return encontrados.length > 0 ? encontrados[encontrados.length - 1][campo] : "";
}

// gender_rate da espécie = quantas "oitavas" são fêmea (0 a 8). -1 = sem gênero
export function lerGenero(taxa) {
    if (taxa === -1) {
        return { male_percentage: 0, female_percentage: 0, genderless: true };
    }

    const femea = (taxa / 8) * 100;

    return { male_percentage: 100 - femea, female_percentage: femea, genderless: false };
}

// soma os stats base do pokémon (o "TOT")
export function somarStats(stats) {
    return stats.reduce(function (soma, item) {
        return soma + item.base_stat;
    }, 0);
}

// texto curto dizendo como evoluiu, lido de evolution_details.
// Exemplo: "Level 16", "Water Stone", "High Friendship, Daytime"
export function descreverEvolucao(detalhes) {
    const d = detalhes && detalhes[0];

    if (!d) {
        return "";
    }

    const partes = [];

    if (d.min_level) { partes.push("Level " + d.min_level); }
    if (d.item) { partes.push(formatarNome(d.item.name)); }
    if (d.trigger && d.trigger.name === "trade") { partes.push("Trade"); }
    if (d.held_item) { partes.push("Holding " + formatarNome(d.held_item.name)); }
    if (d.min_happiness) { partes.push("High Friendship"); }
    if (d.min_affection) { partes.push("High Affection"); }
    if (d.time_of_day) { partes.push(d.time_of_day === "day" ? "Daytime" : "Night"); }
    if (d.known_move) { partes.push("Knows " + formatarNome(d.known_move.name)); }
    if (d.location) { partes.push("At " + formatarNome(d.location.name)); }

    if (partes.length === 0 && d.trigger) {
        partes.push(formatarNome(d.trigger.name));
    }

    return partes.join(", ");
}

// caminho dentro da árvore de evolução: da primeira forma até o pokémon procurado
function caminhoAte(no, nome) {
    if (no.species.name === nome) {
        return [no];
    }

    for (let i = 0; i < no.evolves_to.length; i++) {
        const caminho = caminhoAte(no.evolves_to[i], nome);

        if (caminho) {
            return [no].concat(caminho);
        }
    }

    return null;
}

// Escolhe quais etapas da evolução aparecem na tela:
// primeira forma ... pokémon atual ... próximas formas
export function escolherEtapas(cadeia, nomeAtual) {
    const caminho = caminhoAte(cadeia.chain, nomeAtual) || [cadeia.chain];
    let ultimo = caminho[caminho.length - 1];

    // segue evoluindo enquanto houver um único caminho
    while (ultimo.evolves_to.length === 1) {
        ultimo = ultimo.evolves_to[0];
        caminho.push(ultimo);
    }

    // se a evolução se divide (Eevee, Poliwhirl...), mostra todas as opções
    ultimo.evolves_to.forEach(function (filho) {
        if (ultimo.evolves_to.length > 1) {
            caminho.push(filho);
        }
    });

    return caminho;
}

// Fraqueza = tipo que causa mais dano que o normal (multiplicador maior que 1);
// Com dois tipos, os multiplicadores se multiplicam. Lê damage_relations de cada tipo
export function calcularFraquezas(tiposDaApi) {
    const multiplicadores = {};

    function multiplicar(nome, fator) {
        multiplicadores[nome] = (multiplicadores[nome] === undefined ? 1 : multiplicadores[nome]) * fator;
    }

    tiposDaApi.forEach(function (tipo) {
        const relacoes = tipo.damage_relations;

        relacoes.double_damage_from.forEach(function (item) { multiplicar(item.name, 2); });
        relacoes.half_damage_from.forEach(function (item) { multiplicar(item.name, 0.5); });
        relacoes.no_damage_from.forEach(function (item) { multiplicar(item.name, 0); });
    });

    return Object.keys(multiplicadores).filter(function (nome) {
        return multiplicadores[nome] > 1;
    });
}