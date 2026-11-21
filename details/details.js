const params = new URLSearchParams(window.location.search);
const idPokemon = params.get("id") || "1";
const API = "https://pokeapi.co/api/v2/";

const NOMES_STATS = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SpA",
  "special-defense": "SpD",
  speed: "SPD",
};

async function buscarJson(url) {
  const resposta = await fetch(url);

  if (!resposta.ok) {
    throw new Error("HTTP_" + resposta.status);
  }

  return resposta.json();
}

function idDaUrl(url) {
  return url.split("/").filter(Boolean).pop();
}

function imagemOficial(id) {
  return (
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
    id +
    ".png"
  );
}

function criarElemento(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) {
    elemento.className = classe;
  }
  if (texto !== undefined) {
    elemento.textContent = texto;
  }
  return elemento;
}

function formatarId(id) {
  return "ID " + String(id).padStart(4, "0");
}

// junta as fraquezas de todos os tipos do pokémon
function calcularFraquezas(tiposDetalhes) {
  const multiplicadores = {};

  function aplicar(nome, fator) {
    const atual =
      multiplicadores[nome] === undefined ? 1 : multiplicadores[nome];
    multiplicadores[nome] = atual * fator;
  }

  tiposDetalhes.forEach(function (tipo) {
    const rel = tipo.damage_relations;
    rel.double_damage_from.forEach(function (t) {
      aplicar(t.name, 2);
    });
    rel.half_damage_from.forEach(function (t) {
      aplicar(t.name, 0.5);
    });
    rel.no_damage_from.forEach(function (t) {
      aplicar(t.name, 0);
    });
  });

  return Object.keys(multiplicadores).filter(function (nome) {
    return multiplicadores[nome] > 1;
  });
}

// transforma a árvore de evolução em uma lista simples
function listarEvolucoes(no, lista) {
  lista.push({ nome: no.species.name, id: idDaUrl(no.species.url) });
  no.evolves_to.forEach(function (proximo) {
    listarEvolucoes(proximo, lista);
  });
  return lista;
}

function textoEmIngles(lista, campo) {
  const item = lista.find(function (i) {
    return i.language.name === "en";
  });
  return item ? item[campo].replace(/[\n\f]/g, " ") : "";
}

function mostrarTipos(pokemon) {
  const tipos = document.getElementById("tiposPokemon");

  pokemon.types.forEach(function (tipo) {
    const etiqueta = criarElemento("span", "tipo tipo-" + tipo.type.name);
    etiqueta.setAttribute("data-nome", tipo.type.name);

    const icone = criarElemento("i", "bi " + ICONES_TIPO[tipo.type.name]);
    etiqueta.appendChild(icone);
    tipos.appendChild(etiqueta);
  });
}

function mostrarGenero(especie) {
  const campo = document.getElementById("generoPokemon");

  if (especie.gender_rate === -1) {
    campo.textContent = "Genderless";
    return;
  }

  const femea = (especie.gender_rate / 8) * 100;
  const macho = 100 - femea;
  campo.textContent = "♂ " + macho + "%  ♀ " + femea + "%";
}

function mostrarEvolucoes(lista, idAtual) {
  const area = document.getElementById("evolucoes");

  lista.forEach(function (evolucao, indice) {
    if (indice > 0) {
      area.appendChild(criarElemento("span", "seta-evolucao", "→"));
    }

    const link = criarElemento("a", "evolucao");
    link.href = "details.html?id=" + evolucao.id;
    if (Number(evolucao.id) === idAtual) {
      link.classList.add("atual");
    }

    const imagem = criarElemento("img");
    imagem.src = imagemOficial(evolucao.id);
    imagem.alt = evolucao.nome;

    link.append(
      imagem,
      criarElemento("span", "", evolucao.nome),
      criarElemento("small", "", formatarId(evolucao.id)),
    );
    area.appendChild(link);
  });
}

function mostrarHabilidades(pokemon) {
  const area = document.getElementById("habilidades");

  pokemon.abilities.forEach(function (item) {
    const nome = item.ability.name.replace(/-/g, " ");
    const etiqueta = criarElemento("span", "habilidade", nome);
    if (item.is_hidden) {
      etiqueta.classList.add("oculta");
      etiqueta.title = "Hidden ability";
    }
    area.appendChild(etiqueta);
  });
}

function mostrarFraquezas(fraquezas) {
  const area = document.getElementById("fraquezas");

  fraquezas.forEach(function (nome) {
    const etiqueta = criarElemento("span", "fraqueza tipo-" + nome);
    etiqueta.append(criarElemento("i", "bi " + ICONES_TIPO[nome]), " " + nome);
    area.appendChild(etiqueta);
  });
}

function mostrarStats(pokemon) {
  const area = document.getElementById("statsPokemon");
  let total = 0;

  function criarStat(chave, rotulo, valor) {
    const coluna = criarElemento("div", "stat");
    coluna.append(
      criarElemento("span", "stat-rotulo stat-" + chave, rotulo),
      criarElemento("span", "stat-valor", valor),
    );
    area.appendChild(coluna);
  }

  pokemon.stats.forEach(function (item) {
    total += item.base_stat;
    criarStat(item.stat.name, NOMES_STATS[item.stat.name], item.base_stat);
  });

  criarStat("total", "TOT", total);
}

async function configurarVizinho(idLink, id, seta) {
  const link = document.getElementById(idLink);

  if (id < 1) {
    link.style.visibility = "hidden";
    return;
  }

  link.href = "details.html?id=" + id;
  link.textContent =
    seta === "anterior" ? "‹ " + formatarId(id) : formatarId(id) + " ›";

  try {
    const vizinho = await buscarJson(API + "pokemon/" + id);
    link.textContent =
      seta === "anterior"
        ? "‹ " + formatarId(id) + " " + vizinho.name
        : formatarId(id) + " " + vizinho.name + " ›";
  } catch (erro) {
    // se falhar, fica só o ID mesmo
  }
}

function configurarFavorito(pokemon) {
  const botao = document.getElementById("botaoFavorito");

  botao.classList.toggle("favoritado", ehFavorito(pokemon.id));

  botao.addEventListener("click", function () {
    if (ehFavorito(pokemon.id)) {
      removerFavorito(pokemon.id);
    } else {
      salvarPokemon(pokemon);
    }
    botao.classList.toggle("favoritado", ehFavorito(pokemon.id));
  });
}

async function carregarDetalhes() {
  const conteudo = document.getElementById("conteudoDetalhes");
  const caixaErro = document.getElementById("erroDetalhes");

  mostrarLoader("Carregando detalhes do Pokémon...");

  if (caixaErro) {
    caixaErro.hidden = true;
    caixaErro.replaceChildren();
  }
  if (conteudo) {
    conteudo.hidden = false;
  }

  try {
    const pokemon = await buscarJson(API + "pokemon/" + idPokemon);
    const especie = await buscarJson(pokemon.species.url);

    const [cadeia, tiposDetalhes] = await Promise.all([
      buscarJson(especie.evolution_chain.url),
      Promise.all(
        pokemon.types.map(function (t) {
          return buscarJson(t.type.url);
        }),
      ),
    ]);

    document.title = pokemon.name + " - Pokénie";
    document.getElementById("pesquisaPokemon").value = pokemon.name;

    const imagem = imagemOficial(pokemon.id);
    document.getElementById("imagemPokemon").src = imagem;
    document.getElementById("imagemPokemon").alt = pokemon.name;
    document.getElementById("fundoPokemon").src = imagem;

    document.getElementById("idPokemon").textContent = formatarId(pokemon.id);
    document.getElementById("nomePokemon").textContent = pokemon.name;
    document.getElementById("categoriaPokemon").textContent = textoEmIngles(
      especie.genera,
      "genus",
    );
    document.getElementById("sobrePokemon").textContent = textoEmIngles(
      especie.flavor_text_entries,
      "flavor_text",
    );
    document.getElementById("alturaPokemon").textContent =
      pokemon.height / 10 + " m";
    document.getElementById("pesoPokemon").textContent =
      pokemon.weight / 10 + " kg";
    document.getElementById("expPokemon").textContent = pokemon.base_experience;

    mostrarTipos(pokemon);
    mostrarGenero(especie);
    mostrarEvolucoes(listarEvolucoes(cadeia.chain, []), pokemon.id);
    mostrarHabilidades(pokemon);
    mostrarFraquezas(calcularFraquezas(tiposDetalhes));
    mostrarStats(pokemon);
    configurarFavorito(pokemon);

    configurarVizinho("linkAnterior", pokemon.id - 1, "anterior");
    configurarVizinho("linkProximo", pokemon.id + 1, "proximo");
  } catch (erro) {
    console.error("Não foi possível carregar os detalhes:", erro);

    if (conteudo) conteudo.hidden = true;
    if (caixaErro) {
      caixaErro.hidden = false;
      caixaErro.appendChild(
        criarCaixaErro(traduzirErro(erro), carregarDetalhes, true),
      );
    }
  } finally {
    esconderLoader();
  }
}

carregarDetalhes();
