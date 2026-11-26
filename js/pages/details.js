import { carregarPokemons, carregarPokemonCompleto } from "../services/pokemonServices.js";
import { ehFavorito } from "../services/armazenamento.js";
import { adicionarFavorito, atualizarFavorito, excluirFavorito } from "../services/favoritosApi.js";
import { criarIconeTipo } from "../components/iconeTipo.js";
import { atualizarBotaoFavorito } from "../components/favoritado.js";
import { mostrarLoader, esconderLoader, mostrarErro, esconderErro } from "../components/interface.js";
import { criarElemento, formatarNome, formatarNomePokemon, formatarId } from "../utils/formatacao.js";
import { imagemDoPokemon, usarImagemReserva } from "../utils/imagens.js";
import { obterId, textoEmIngles, lerGenero, somarStats, descreverEvolucao, calcularFraquezas } from "../data/pokeapi.js";
import { filtrarPokemons, piscarErro } from "../utils/pesquisa.js";

// Ordem dos stats e a sigla de cada um
const ORDEM_STATS = [
    ["hp", "HP"],
    ["attack", "ATK"],
    ["defense", "DEF"],
    ["special-attack", "SpA"],
    ["special-defense", "SpD"],
    ["speed", "SPD"]
];

const campoPesquisa = document.getElementById("pesquisaPokemon");
const barraPesquisa = document.querySelector(".barra-de-pesquisa");

function pegar(id) {
    return document.getElementById(id);
}

/* tipos, gênero e evolução */

function criarChipTipo(nomeTipo) {
    const chip = criarElemento("span", "chip-tipo tipo-" + nomeTipo);
    chip.append(criarIconeTipo(nomeTipo), criarElemento("span", "", formatarNome(nomeTipo)));
    return chip;
}

// cria um lado da barra de gênero (macho ou fêmea) com o ícone ao lado do texto
function criarSegmentoGenero(lado, texto, icone, porcentagem, inativo, metade) {
    const segmento = criarElemento("span", "genero genero-" + lado);

    // gênero que não predomina
    if (inativo) {
        segmento.classList.add("inativo");
    }

    // os dois gêneros iguais (50% e 50%)
    if (metade) {
        segmento.classList.add("metade");
    }

    segmento.title = porcentagem + "% " + texto.toLowerCase();

    const simbolo = criarElemento("img");
    simbolo.src = icone;
    simbolo.alt = "";

    segmento.append(simbolo, criarElemento("span", "", texto));

    return segmento;
}

function preencherGenero(especie) {
    const alvo = pegar("generoPokemon");
    const genero = lerGenero(especie.gender_rate);

    alvo.replaceChildren();

    // sem gênero (somente o texto)
    if (genero.genderless) {
        alvo.appendChild(criarElemento("span", "genero genero-neutro", "Genderless"));
        return;
    }

    // mais de 50% macho: a barra de fêmea fica com 20%; Mais de 50% fêmea: a barra de macho fica com 20%;
    // e quando é exatamente 50% para cada: as duas ficam com 50%
    const maisMacho = genero.male_percentage > 50;
    const maisFemea = genero.female_percentage > 50;
    const iguais = genero.male_percentage === genero.female_percentage;

    alvo.append(
        criarSegmentoGenero("macho", "Male", "../assets/male.png", genero.male_percentage, maisFemea, iguais),
        criarSegmentoGenero("femea", "Female", "../assets/female.png", genero.female_percentage, maisMacho, iguais)
    );
}

// um pokémon da cadeia de evolução (vira link, menos o Pokémon da página atual)
function criarNoEvolucao(item, idAtual) {
    const ehAtual = item.id === idAtual;
    const no = criarElemento(ehAtual ? "div" : "a", ehAtual ? "evo-no atual" : "evo-no");

    if (!ehAtual) {
        no.href = "./details.html?id=" + item.id;
    }

    const imagem = criarElemento("img");
    imagem.src = item.imagem;
    imagem.alt = formatarNomePokemon(item.name);
    imagem.loading = "lazy";
    usarImagemReserva(imagem);
    no.appendChild(imagem);

    // nome e ID à esquerda, ícones dos tipos de elementos à direita
    const rodape = criarElemento("div", "evo-rodape");
    const textos = criarElemento("div", "evo-textos");
    textos.append(
        criarElemento("span", "evo-nome", formatarNomePokemon(item.name)),
        criarElemento("span", "evo-id", "ID " + formatarId(item.id))
    );

    const tipos = criarElemento("div", "evo-tipos");
    item.types.forEach(function (tipo) {
        tipos.appendChild(criarIconeTipo(tipo));
    });

    rodape.append(textos, tipos);
    no.appendChild(rodape);

    return no;
}

// seta entre dois pokémon, com a forma de evoluir escrita embaixo
function criarSetaEvolucao(rotulo) {
    const seta = criarElemento("div", "evo-seta");

    // seta de evolução (imagem fusao.png)
    const fusao = criarElemento("img", "evo-fusao");
    fusao.src = "../assets/fusao.png";
    fusao.alt = "evolves to";
    seta.appendChild(fusao);

    if (rotulo) {
        seta.appendChild(criarElemento("span", "", rotulo));
    }

    return seta;
}

// monta, com os JSONs da API, a lista que a tela de evolução desenha
function listarEtapas(dados) {
    return dados.etapas.map(function (etapa, indice) {
        const pokemonDaEtapa = dados.pokemonsDasEtapas[indice];

        return {
            name: etapa.species.name,
            id: pokemonDaEtapa.id,
            imagem: imagemDoPokemon(pokemonDaEtapa),
            types: pokemonDaEtapa.types.map(function (item) {
                return item.type.name;
            }),
            label: descreverEvolucao(etapa.evolution_details)
        };
    });
}

function preencherEvolucao(dados) {
    const pokemon = dados.pokemon;
    const alvo = pegar("evolucao");
    const cadeia = listarEtapas(dados);

    alvo.replaceChildren();
    alvo.className = "evolucao-caixa";

    // sem nenhuma evolução
    if (cadeia.length === 1) {
        const unico = criarElemento("div", "evo-unico");
        const logo = criarElemento("img");
        logo.src = "../assets/logoPokénie.png";
        logo.alt = "";
        unico.append(logo, criarElemento("span", "", "Unevolved"));
        alvo.appendChild(unico);
        return;
    }

    // muitas evoluções (exemplo: eevee): o primeiro, uma seta e todos os outros
    if (cadeia.length > 4) {
        const grupo = criarElemento("div", "evo-grupo");

        cadeia.slice(1).forEach(function (item) {
            grupo.appendChild(criarNoEvolucao(item, pokemon.id));
        });

        alvo.append(
            criarNoEvolucao(cadeia[0], pokemon.id),
            criarSetaEvolucao(""),
            grupo
        );
        return;
    }

    // cadeia normal: um depois do outro, em uma única linha
    alvo.classList.add("evo-linear");

    cadeia.forEach(function (item, indice) {
        if (indice > 0) {
            // embaixo da seta, a forma de evoluir; Exemplo: (Level 16)
            alvo.appendChild(criarSetaEvolucao(item.label ? "(" + item.label + ")" : ""));
        }

        alvo.appendChild(criarNoEvolucao(item, pokemon.id));
    });
}

/* informações, habilidades e stats */

function preencherInformacoes(pokemon, tiposDaApi) {
    // a altura vem em decímetros e o peso em hectogramas
    pegar("alturaPokemon").textContent = (pokemon.height / 10).toFixed(1) + " m";
    pegar("pesoPokemon").textContent = (pokemon.weight / 10).toFixed(1) + " kg";
    pegar("expPokemon").textContent = pokemon.base_experience;

    const fraquezas = pegar("fraquezasPokemon");
    fraquezas.replaceChildren();
    calcularFraquezas(tiposDaApi).forEach(function (tipo) {
        fraquezas.appendChild(criarChipTipo(tipo));
    });
}

function preencherHabilidades(pokemon) {
    const alvo = pegar("habilidadesPokemon");
    alvo.replaceChildren();

    pokemon.abilities.forEach(function (item) {
        const habilidade = criarElemento("span", "habilidade", formatarNome(item.ability.name));

        // habilidades ocultas têm a borda cinza
        if (item.is_hidden) {
            habilidade.classList.add("oculta");
            habilidade.title = "Hidden ability";
        }

        alvo.appendChild(habilidade);
    });
}

function criarStat(chave, rotulo, valor) {
    const stat = criarElemento("div", "stat");
    stat.dataset.stat = chave; // o details.css usa isso para escolher a cor

    stat.append(
        criarElemento("span", "stat-rotulo", rotulo),
        criarElemento("span", "stat-valor", valor)
    );

    return stat;
}

function preencherStats(pokemon) {
    const alvo = pegar("statsPokemon");
    alvo.replaceChildren();

    ORDEM_STATS.forEach(function (item) {
        const encontrado = pokemon.stats.find(function (s) {
            return s.stat.name === item[0];
        });

        if (encontrado) {
            alvo.appendChild(criarStat(item[0], item[1], encontrado.base_stat));
        }
    });

    alvo.appendChild(criarStat("total", "TOT", somarStats(pokemon.stats)));
}

/* botão de favorito, anterior/próximo e pesquisa */

function configurarFavorito(pokemon) {
    const botao = pegar("botaoFavorito");
    const nome = formatarNomePokemon(pokemon.name);

    botao.addEventListener("click", async function () {
        // POST (adicionar) ou DELETE (remover) na API de favoritos
        if (ehFavorito(pokemon.id)) {
            await excluirFavorito(pokemon.id);
        } else {
            await adicionarFavorito(pokemon);
        }

        atualizarBotaoFavorito(botao, ehFavorito(pokemon.id), nome);
    });

    atualizarBotaoFavorito(botao, ehFavorito(pokemon.id), nome);
}

function configurarLinkVizinho(link, vizinho) {
    const texto = link.querySelector(".nav-texto");

    // primeiro ou último pokémon: não existe vizinho
    if (!vizinho) {
        link.classList.add("desativada");
        link.removeAttribute("href");
        link.setAttribute("aria-disabled", "true");
        link.tabIndex = -1;
        texto.textContent = "—";
        return;
    }

    const idVizinho = obterId(vizinho);

    link.href = "./details.html?id=" + idVizinho;
    texto.textContent = "ID " + formatarId(idVizinho) + "  " + formatarNomePokemon(vizinho.name);
}

// digite um nome ou um ID e aperte Enter para abrir esse pokémon
function configurarPesquisa(pokemon, todos) {
    campoPesquisa.value = formatarNomePokemon(pokemon.name);

    campoPesquisa.addEventListener("focus", function () {
        campoPesquisa.select();
    });

    campoPesquisa.addEventListener("keydown", function (evento) {
        if (evento.key !== "Enter") {
            return;
        }

        const encontrados = filtrarPokemons(todos, campoPesquisa.value);

        if (campoPesquisa.value.trim() !== "" && encontrados.length > 0) {
            window.location.href = "./details.html?id=" + obterId(encontrados[0]);
        } else {
            piscarErro(barraPesquisa);
        }
    });
}

// "Go back" volta para a página anterior (home ou favoritos) quando possível
function configurarBotaoVoltar() {
    const botao = document.querySelector(".botao-voltar");

    botao.addEventListener("click", function (evento) {
        const veioDoSite = document.referrer.startsWith(window.location.origin);

        if (veioDoSite && window.history.length > 1) {
            evento.preventDefault();
            window.history.back();
        }
    });
}

/* montagem da página */

function mostrarPokemon(dados, todos) {
    const pokemon = dados.pokemon;
    const especie = dados.especie;

    // a lista da API já vem ordenada por ID: o anterior e o próximo são os vizinhos dela
    const indice = todos.findIndex(function (p) {
        return obterId(p) === pokemon.id;
    });

    const nome = formatarNomePokemon(pokemon.name);

    const imagem = pegar("imagemPokemon");
    imagem.src = imagemDoPokemon(pokemon);
    imagem.alt = nome;
    usarImagemReserva(imagem);

    const fundo = pegar("fundoPokemon");
    fundo.onerror = function () {
        fundo.hidden = true;
    };
    fundo.hidden = false;
    fundo.src = imagemDoPokemon(pokemon);

    pegar("idPokemon").textContent = "ID " + formatarId(pokemon.id);
    pegar("nomePokemon").textContent = nome;
    pegar("especiePokemon").textContent = textoEmIngles(especie.genera, "genus");
    pegar("sobrePokemon").textContent = textoEmIngles(especie.flavor_text_entries, "flavor_text").replace(/[\n\f\r]+/g, " ") || "No description available.";

    const tipos = pegar("tiposPokemon");
    tipos.replaceChildren();
    pokemon.types.forEach(function (tipo) {
        tipos.appendChild(criarChipTipo(tipo.type.name));
    });

    preencherGenero(especie);
    preencherEvolucao(dados);
    preencherInformacoes(pokemon, dados.tipos);
    preencherHabilidades(pokemon);
    preencherStats(pokemon);
    configurarFavorito(pokemon);
    configurarPesquisa(pokemon, todos);
    configurarBotaoVoltar();

    configurarLinkVizinho(pegar("linkAnterior"), indice === -1 ? undefined : todos[indice - 1]);
    configurarLinkVizinho(pegar("linkProximo"), indice === -1 ? undefined : todos[indice + 1]);

    // PUT: se ele já é favorito, atualiza os dados salvos com os dados mais recentes
    if (ehFavorito(pokemon.id)) {
        atualizarFavorito(pokemon);
    }
}

// carrega os dados e cuida dos estados de carregamento e de erro
async function carregarPagina() {
    esconderErro();
    mostrarLoader();

    const id = Number(new URLSearchParams(window.location.search).get("id"));

    if (!Number.isInteger(id) || id < 1) {
        esconderLoader();
        mostrarErro("Pokémon not found.");
        return;
    }

    let dados;
    let todos;

    try {
        // as duas buscas acontecem ao mesmo tempo
        const resultado = await Promise.all([carregarPokemonCompleto(id), carregarPokemons()]);
        dados = resultado[0];
        todos = resultado[1];
    } catch (erro) {
        esconderLoader();

        // 404 = esse pokémon não existe; Qualquer outro erro = problema de comunicação
        if (erro.status === 404) {
            mostrarErro("Pokémon not found.");
        } else {
            mostrarErro("We couldn't load the Pokémon. Please try again.", carregarPagina);
        }
        return;
    }

    esconderLoader();
    mostrarPokemon(dados, todos);
}

carregarPagina();