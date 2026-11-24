let listaPokemons = [];

const URL_API = "https://pokeapi.co/api/v2/pokemon";

const POR_PAGINA = 18;
let paginaAtual = 1;
let totalPokemons = 0;

let carregando = false;

function mostrarLoader(mensagem) {
  const loader = document.getElementById("loader");
  const loaderTexto = document.getElementById("loaderTexto");

  if (loaderTexto && mensagem) {
    loaderTexto.textContent = mensagem;
  }
  if (loader) {
    loader.classList.remove("some");
  }
}

function esconderLoader() {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.classList.add("some");
  }
}

function traduzirErro(erro) {
  if (!navigator.onLine) {
    return "Você está sem conexão com a internet. Verifique sua rede e tente novamente.";
  }
  if (erro && erro.message === "HTTP_404") {
    return "Pokémon não encontrado na PokéAPI.";
  }
  if (erro && erro.message && erro.message.startsWith("HTTP_5")) {
    return "A PokéAPI está temporariamente instável. Tente novamente em instantes.";
  }
  return "Não foi possível carregar os dados da PokéAPI. Verifique sua conexão e tente novamente.";
}

function criarCaixaErro(mensagem, aoTentarNovamente, mostrarBotaoInicio) {
  const caixa = document.createElement("div");
  caixa.className = "estado-erro";
  caixa.setAttribute("role", "alert");

  const icone = document.createElement("i");
  icone.className = !navigator.onLine
    ? "bi bi-wifi-off"
    : "bi bi-exclamation-triangle-fill";

  const titulo = document.createElement("h2");
  titulo.textContent = "Ops! Algo deu errado";

  const texto = document.createElement("p");
  texto.textContent = mensagem;

  const acoes = document.createElement("div");
  acoes.className = "erro-acoes";

  const btnRetry = document.createElement("button");
  btnRetry.type = "button";
  btnRetry.className = "btn-retry";
  btnRetry.textContent = "Tentar novamente";
  btnRetry.addEventListener("click", aoTentarNovamente);
  acoes.appendChild(btnRetry);

  if (mostrarBotaoInicio) {
    const linkInicio = document.createElement("a");
    linkInicio.href = "../home/index.html";
    linkInicio.className = "btn-voltar";
    linkInicio.textContent = "Voltar para a Pokédex";
    acoes.appendChild(linkInicio);
  }

  caixa.append(icone, titulo, texto, acoes);
  return caixa;
}

function mostrarSkeletons(quantidade) {
  if (!container) return;

  container.replaceChildren();
  for (let i = 0; i < quantidade; i++) {
    const card = document.createElement("div");
    card.className = "card-skeleton";
    card.setAttribute("aria-hidden", "true");
    card.innerHTML = `
            <span class="skeleton-bloco skeleton-id"></span>
            <div class="skeleton-bloco skeleton-img"></div>
            <span class="skeleton-bloco skeleton-nome"></span>
            <span class="skeleton-bloco skeleton-tipos"></span>
        `;
    container.appendChild(card);
  }
}

async function buscarPokemons(pagina) {
  const offset = (pagina - 1) * POR_PAGINA;
  const resposta = await fetch(
    URL_API + "?limit=" + POR_PAGINA + "&offset=" + offset,
  );

  if (!resposta.ok) {
    throw new Error("HTTP_" + resposta.status);
  }

  const dados = await resposta.json();
  totalPokemons = dados.count;

  const detalhes = await Promise.all(
    dados.results.map(async function (item) {
      const r = await fetch(item.url);
      if (!r.ok) {
        throw new Error("HTTP_" + r.status);
      }
      return r.json();
    }),
  );

  return detalhes;
}

async function carregarPokemons(pagina) {
  if (carregando) return;
  carregando = true;

  const btnAnterior = document.getElementById("btnAnterior");
  const btnProxima = document.getElementById("btnProxima");
  const paginacao = document.getElementById("paginacao");

  if (btnAnterior) btnAnterior.disabled = true;
  if (btnProxima) btnProxima.disabled = true;

  const primeiroCarregamento = listaPokemons.length === 0;
  if (primeiroCarregamento) {
    mostrarLoader("Carregando Pokémons...");
  } else {
    mostrarSkeletons(POR_PAGINA);
  }

  try {
    listaPokemons = await buscarPokemons(pagina);
    paginaAtual = pagina;
    primeiraExibicao = true;

    if (paginacao) paginacao.style.display = "flex";
    mostrarPokemons(listaPokemons);
    atualizarPaginacao();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (erro) {
    console.error("Não foi possível carregar os Pokémon:", erro);

    if (paginacao) paginacao.style.display = "none";
    if (container) {
      container.replaceChildren(
        criarCaixaErro(
          traduzirErro(erro),
          function () {
            carregarPokemons(pagina);
          },
          false,
        ),
      );
    }
  } finally {
    carregando = false;
    esconderLoader();
  }
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
  return (
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
    pokemon.id +
    ".png"
  );
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
  fairy: "bi-stars",
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
    "Alternar favorito de " + pokemon.name,
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

let todosOsPokemons = [];

async function pesquisarPokemons(texto) {
  const termo = texto.trim().toLowerCase();

  // campo vazio: volta para a lista normal
  if (termo === "") {
    mostrarPokemons(listaPokemons);
    return;
  }

  // 1) baixa a lista com TODOS os nomes (só na primeira vez)
  if (todosOsPokemons.length === 0) {
    const resposta = await fetch(URL_API + "?limit=100000");
    const dados = await resposta.json();
    todosOsPokemons = dados.results;
  }

  // 2) filtra pelo nome ou pelo id
  const achados = todosOsPokemons.filter(function (item) {
    const id = item.url.split("/")[6];
    return item.name.includes(termo) || id === termo;
  });

  // 3) busca os detalhes só dos primeiros 18 achados
  const detalhes = await Promise.all(
    achados.slice(0, POR_PAGINA).map(function (item) {
      return fetch(item.url).then(function (r) {
        return r.json();
      });
    }),
  );

  // 4) mostra na tela
  mostrarPokemons(detalhes);
}

function pesquisarNosFavoritos(texto) {
  const termo = texto.trim().toLowerCase();

  const resultado = recuperarPokemons().filter(function (pokemon) {
    return pokemon.name.includes(termo) || String(pokemon.id) === termo;
  });

  mostrarPokemons(resultado);
}

if (campoPesquisa) {
  campoPesquisa.addEventListener("input", function () {
    if (window.location.pathname.includes("favorites")) {
      pesquisarNosFavoritos(campoPesquisa.value);
    } else if (container) {
      pesquisarPokemons(campoPesquisa.value);
    }
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
