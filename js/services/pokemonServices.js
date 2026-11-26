import { get } from "./http.js";
import { listarFavoritos } from "./favoritosApi.js";
import { extrairId, obterId, escolherEtapas } from "../data/pokeapi.js";

const URL_BASE = "https://pokeapi.co/api/v2";
const TOTAL_POKEMONS = 1025;

// guarda as respostas já recebidas, para não pedir a mesma coisa duas vezes
const cacheLista = {};
const cachePokemons = {};
const cacheEspecies = {};
const cacheCadeias = {};
const cacheTipos = {};

// se já pedimos antes, devolve a resposta guardada. Se a requisição falhar, não guarda
function comCache(cache, chave, buscar) {
    if (!cache[chave]) {
        cache[chave] = buscar().catch(function (erro) {
            delete cache[chave];
            throw erro;
        });
    }

    return cache[chave];
}

/* listas e pokémons (cards) */
// array "results" da pokéAPI: cada item tem só "name" e "url"
export function carregarPokemons() {
    return comCache(cacheLista, "todos", async function () {
        const dados = await get(URL_BASE + "/pokemon?limit=" + TOTAL_POKEMONS);
        return dados.results;
    });
}

// resposta de /pokemon/{id},
// para o cache e o localstorage não ficarem pesados, todo o resto é o JSON original
export function buscarPokemon(id) {
    return comCache(cachePokemons, String(id), async function () {
        const dados = await get(URL_BASE + "/pokemon/" + id);
        delete dados.moves;
        return dados;
    });
}

// busca vários de uma vez (as requisições acontecem ao mesmo tempo)
export function buscarPokemons(itens) {
    return Promise.all(itens.map(function (item) {
        return buscarPokemon(obterId(item));
    }));
}

// favoritos salvos no navegador (veja favoritosApi.js)
export async function carregarFavoritos() {
    return listarFavoritos();
}

/* pokémon completo (página de detalhes) */

function buscarEspecie(id) {
    return comCache(cacheEspecies, String(id), function () {
        return get(URL_BASE + "/pokemon-species/" + id);
    });
}

function buscarCadeia(url) {
    return comCache(cacheCadeias, url, function () {
        return get(url);
    });
}

function buscarTipo(nome) {
    return comCache(cacheTipos, nome, function () {
        return get(URL_BASE + "/type/" + nome);
    });
}

// junta as respostas que a página de detalhes precisa (cada uma é o JSON original da API):
//   pokemon           -> /pokemon/(id)
//   especie           -> /pokemon-species/(id)
//   cadeia            -> /evolution-chain/(id)
//   etapas            -> itens da árvore de evolução que aparecem na tela
//   pokemonsDasEtapas -> /pokemon/(id) de cada etapa (tipos e imagem)
//   tipos             -> /type/(nome) de cada tipo do Pokémon
export async function carregarPokemonCompleto(id) {
    const pokemon = await buscarPokemon(id);
    const especie = await buscarEspecie(pokemon.id);
    const cadeia = await buscarCadeia(especie.evolution_chain.url);
    const etapas = escolherEtapas(cadeia, especie.name);

    // as buscas abaixo acontecem ao mesmo tempo
    const resultado = await Promise.all([
        Promise.all(etapas.map(function (etapa) {
            return buscarPokemon(extrairId(etapa.species.url));
        })),
        Promise.all(pokemon.types.map(function (item) {
            return buscarTipo(item.type.name);
        }))
    ]);

    return {
        pokemon: pokemon,
        especie: especie,
        cadeia: cadeia,
        etapas: etapas,
        pokemonsDasEtapas: resultado[0],
        tipos: resultado[1]
    };
}