let listaPokemons = [];

const URL_API = "https://pokeapi.co/api/v2/pokemon";

const POR_PAGINA = 18;
let paginaAtual = 1;
let totalPokemons = 0;

async function buscarPokemons(pagina) {
    const offset = (pagina - 1) * POR_PAGINA;

    const resposta = await fetch(URL_API + "?limit=" + POR_PAGINA + "&offset=" + offset);

    if (!resposta.ok) {
        throw new Error("Erro na API: " + resposta.status);
    }

    const dados = await resposta.json();
    totalPokemons = dados.count;

    const detalhes = await Promise.all(
        dados.results.map(function (item) {
            return fetch(item.url).then(function (r) {
                return r.json();
            });
        })
    );

    return detalhes;
}

function atualizarPaginacao() {
    const btnAnterior = document.getElementById("btnAnterior");
    const btnProxima = document.getElementById("btnProxima");
    const infoPagina = document.getElementById("infoPagina");

    if (!btnAnterior || !btnProxima || !infoPagina) {
        return;
    }

    const totalPaginas = Math.ceil(totalPokemons / POR_PAGINA);

    infoPagina.textContent = "Página " + paginaAtual + " de " + totalPaginas;
    btnAnterior.disabled = paginaAtual === 1;
    btnProxima.disabled = paginaAtual >= totalPaginas;
}

async function carregarPokemons(pagina) {
    try {
        listaPokemons = await buscarPokemons(pagina);
        paginaAtual = pagina;
        primeiraExibicao = true;
        mostrarPokemons(listaPokemons);
        atualizarPaginacao();
        window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (erro) {
        console.error("Não foi possível carregar os Pokémon:", erro);
    }
}

const container = document.getElementById("listaDePokemons");
const campoPesquisa = document.getElementById("pesquisaPokemon");

let primeiraExibicao = true;

// Lista que está sendo exibida na página
let listaAtual = listaPokemons;

function recuperarPokemons() {
    return JSON.parse(localStorage.getItem("pokemons")) || [];
}

function salvarPokemon(pokemon) {
    const favoritos = recuperarPokemons();

    const jaExiste = favoritos.some(function (p) {
        return p.id === pokemon.id;
    });

    if (!jaExiste) {
        favoritos.push(pokemon);
        localStorage.setItem("pokemons", JSON.stringify(favoritos));
    }
}

function removerFavorito(id) {
    const favoritos = recuperarPokemons();

    const favoritosAtualizados = favoritos.filter(function (pokemon) {
        return pokemon.id !== id;
    });

    localStorage.setItem("pokemons", JSON.stringify(favoritosAtualizados));
}

function ehFavorito(id) {
    const favoritos = recuperarPokemons();

    return favoritos.some(function (pokemon) {
        return pokemon.id === id;
    });
}

function imagemDoPokemon(pokemon) {
    return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + pokemon.id + ".png";
}

const ICONES_TIPO = {
    normal: "bi-circle",
    fire: "bi-fire",
    water: "bi-droplet-fill",
    electric: "bi-lightning-charge-fill",
    grass: "bi-tree-fill",
    ice: "bi-snow",
    fighting: "bi-hammer",
    poison: "bi-droplet-half",
    ground: "bi-layers-fill",
    flying: "bi-wind",
    psychic: "bi-eye-fill",
    bug: "bi-bug-fill",
    rock: "bi-gem",
    ghost: "bi-emoji-dizzy-fill",
    dragon: "bi-shield-fill",
    dark: "bi-moon-fill",
    steel: "bi-gear-fill",
    fairy: "bi-stars"
};

function criarCard(pokemon) {
    const card = document.createElement("article");
    card.classList.add("card");

    const id = document.createElement("span");
    id.classList.add("card-id");
    id.textContent = "ID " + String(pokemon.id).padStart(4, "0");

    const imagem = document.createElement("img");
    imagem.src = imagemDoPokemon(pokemon);
    imagem.alt = pokemon.name;
    imagem.loading = "lazy";

    const nome = document.createElement("h2");
    nome.textContent = pokemon.name;

    const medidas = document.createElement("p");

    const tipos = document.createElement("div");
    tipos.classList.add("card-tipos");
        pokemon.types.forEach(function (tipo) {
        const etiqueta = document.createElement("span");
        etiqueta.classList.add("tipo", "tipo-" + tipo.type.name);
        etiqueta.setAttribute("aria-label", tipo.type.name);
                etiqueta.setAttribute("data-nome", tipo.type.name);

        const icone = document.createElement("i");
        icone.classList.add("bi", ICONES_TIPO[tipo.type.name]);
        etiqueta.appendChild(icone);

        tipos.appendChild(etiqueta);
    });

    const botaoFavorito = document.createElement("button");
    botaoFavorito.type = "button";
    botaoFavorito.classList.add("botao-favorito");

    const iconeFavorito = document.createElement("img");
    iconeFavorito.src = "../assets/favorito.png";
    botaoFavorito.appendChild(iconeFavorito);
    if (ehFavorito(pokemon.id)) {
        botaoFavorito.classList.add("favoritado");
    }

    botaoFavorito.setAttribute(
        "aria-label",
        "Alternar favorito de " + pokemon.name
    );

    botaoFavorito.addEventListener("click", function (event) {
        event.stopPropagation();

        if (ehFavorito(pokemon.id)) {
            removerFavorito(pokemon.id);
        } else {
            salvarPokemon(pokemon);
        }

        if (window.location.pathname.includes("favorites")) {
            mostrarPokemons(recuperarPokemons());
        } else {
            mostrarPokemons(listaAtual);
        }
    });

    card.addEventListener("click", function () {
        window.location.href = "../details/details.html?id=" + pokemon.id;
    });

    card.append(id, imagem, nome, medidas, tipos, botaoFavorito);

    return card;
}

function mostrarPokemons(lista) {
    if (!container) {
        return;
    }

    listaAtual = lista;
    container.replaceChildren();

    if (lista.length === 0) {
        const mensagem = document.createElement("p");
        container.appendChild(mensagem);
        return;
    }

    lista.forEach(function (pokemon, indice) {
        const card = criarCard(pokemon);

        if (primeiraExibicao) {
            card.classList.add("entrada");
            card.style.animationDelay = indice * 80 + "ms";
        }

        container.appendChild(card);
    });

    primeiraExibicao = false;
}

if (campoPesquisa) {
    campoPesquisa.addEventListener("input", function () {
        const termo = campoPesquisa.value.trim().toLowerCase();

        const listaParaPesquisar = window.location.pathname.includes("favorites")
            ? recuperarPokemons()
            : listaPokemons;

        const resultado = listaParaPesquisar.filter(function (pokemon) {
            return pokemon.name.toLowerCase().includes(termo);
        });

        mostrarPokemons(resultado);
    });
}

if (container && !window.location.pathname.includes("favorites")) {
    const btnAnterior = document.getElementById("btnAnterior");
    const btnProxima = document.getElementById("btnProxima");

    if (btnAnterior) {
        btnAnterior.addEventListener("click", function () {
            carregarPokemons(paginaAtual - 1);
        });
    }

    if (btnProxima) {
        btnProxima.addEventListener("click", function () {
            carregarPokemons(paginaAtual + 1);
        });
    }

    carregarPokemons(1);
}

const loader = document.getElementById("loader");
window.addEventListener("load", function () {
    setTimeout(function () {
        if (loader) {
            loader.classList.add("some");
        }
    }, 700);
});