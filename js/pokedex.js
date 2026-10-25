const listaPokemons = [
    {
        "id": 62,
        "name": "poliwrath",
        "about": "Is a dual-type Water/Fighting Pokémon introduced in Generation I. It is known as the Tadpole Pokémon and evolves from Poliwhirl when exposed to a Water Stone.",
        "gender_rate": {
            "male_percentage": 50.0,
            "female_percentage": 50.0,
            "genderless": false
        },
        "height": 13,
        "weight": 540,
        "base_experience": 255,
        "abilities": [
            {
                "ability": { "name": "water-absorb", "url": "https://pokeapi.co" },
                "is_hidden": false,
                "slot": 1
            },
            {
                "ability": { "name": "damp", "url": "https://pokeapi.co" },
                "is_hidden": false,
                "slot": 2
            },
            {
                "ability": { "name": "swift-swim", "url": "https://pokeapi.co" },
                "is_hidden": true,
                "slot": 3
            }
        ],
        "types": [
            { "slot": 1, "type": { "name": "water", "url": "https://pokeapi.co" } },
            { "slot": 2, "type": { "name": "fighting", "url": "https://pokeapi.co" } }
        ],
        "stats": [
            { "base_stat": 90, "effort": 0, "stat": { "name": "hp", "url": "https://pokeapi.co" } },
            { "base_stat": 95, "effort": 3, "stat": { "name": "attack", "url": "https://pokeapi.co" } },
            { "base_stat": 95, "effort": 0, "stat": { "name": "defense", "url": "https://pokeapi.co" } },
            { "base_stat": 70, "effort": 0, "stat": { "name": "special-attack", "url": "https://pokeapi.co" } },
            { "base_stat": 90, "effort": 0, "stat": { "name": "special-defense", "url": "https://pokeapi.co" } },
            { "base_stat": 70, "effort": 0, "stat": { "name": "speed", "url": "https://pokeapi.co" } }
        ],
        "total_base_stat": 510,
        "evolution_chain": {
            "from": "poliwhirl",
            "trigger": "water-stone",
            "full_chain": ["poliwag", "poliwhirl", "poliwrath"]
        },
        "weaknesses": ["flying", "grass", "electric", "psychic", "fairy"]
    },

    {
        "id": 448,
        "name": "lucario",
        "about": "A Fighting and Steel type. Lucario is a bipedal, canine-like Pokémon that possesses the unique ability to sense and manipulate a special energy called Aura. By reading the aura of its opponents, it can predict their movements and track them from over half a mile away. Extremely loyal to its Trainer, Lucario has a strong sense of justice and can communicate through telepathy.",
        "gender_rate": {
            "male_percentage": 87.5,
            "female_percentage": 12.5,
            "genderless": false
        },
        "height": 12,
        "weight": 540,
        "base_experience": 184,
        "abilities": [
            {
                "ability": { "name": "steadfast", "url": "https://pokeapi.co" },
                "is_hidden": false,
                "slot": 1
            },
            {
                "ability": { "name": "inner-focus", "url": "https://pokeapi.co" },
                "is_hidden": false,
                "slot": 2
            },
            {
                "ability": { "name": "justified", "url": "https://pokeapi.co" },
                "is_hidden": true,
                "slot": 3
            }
        ],
        "types": [
            { "slot": 1, "type": { "name": "fighting", "url": "https://pokeapi.co" } },
            { "slot": 2, "type": { "name": "steel", "url": "https://pokeapi.co" } }
        ],
        "stats": [
            { "base_stat": 70, "effort": 0, "stat": { "name": "hp", "url": "https://pokeapi.co" } },
            { "base_stat": 110, "effort": 1, "stat": { "name": "attack", "url": "https://pokeapi.co" } },
            { "base_stat": 70, "effort": 0, "stat": { "name": "defense", "url": "https://pokeapi.co" } },
            { "base_stat": 115, "effort": 1, "stat": { "name": "special-attack", "url": "https://pokeapi.co" } },
            { "base_stat": 70, "effort": 0, "stat": { "name": "special-defense", "url": "https://pokeapi.co" } },
            { "base_stat": 90, "effort": 0, "stat": { "name": "speed", "url": "https://pokeapi.co" } }
        ],
        "total_base_stat": 525,
        "evolution_chain": {
            "from": "riolu",
            "trigger": "high-friendship-day",
            "full_chain": ["riolu", "lucario"]
        },
        "weaknesses": ["fighting", "ground", "fire"]
    },

    {
        "id": 493,
        "name": "arceus",
        "about": "Is one of the most unique and dynamic assets in the Pokémon franchise due to its form-changing mechanic. Known as the creator deity of the Pokémon universe, its design blends equine, centaur-like, and celestial elements into a majestic, holy silhouette.",
        "gender_rate": {
            "male_percentage": 0.0,
            "female_percentage": 0.0,
            "genderless": true
        },
        "height": 32,
        "weight": 3200,
        "base_experience": 324,
        "abilities": [
            {
                "ability": { "name": "multitype", "url": "https://pokeapi.co" },
                "is_hidden": false,
                "slot": 1
            }
        ],
        "types": [
            { "slot": 1, "type": { "name": "normal", "url": "https://pokeapi.co" } }
        ],
        "stats": [
            { "base_stat": 120, "effort": 3, "stat": { "name": "hp", "url": "https://pokeapi.co" } },
            { "base_stat": 120, "effort": 0, "stat": { "name": "attack", "url": "https://pokeapi.co" } },
            { "base_stat": 120, "effort": 0, "stat": { "name": "defense", "url": "https://pokeapi.co" } },
            { "base_stat": 120, "effort": 0, "stat": { "name": "special-attack", "url": "https://pokeapi.co" } },
            { "base_stat": 120, "effort": 0, "stat": { "name": "special-defense", "url": "https://pokeapi.co" } },
            { "base_stat": 120, "effort": 0, "stat": { "name": "speed", "url": "https://pokeapi.co" } }
        ],
        "total_base_stat": 720,
        "evolution_chain": {
            "from": null,
            "trigger": null,
            "full_chain": ["arceus"]
        },
        "weaknesses": ["fighting"]
    },

    {
        "id": 658,
        "name": "greninja",
        "height": 15,
        "weight": 400,
        "sprites": {
            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/658.png"
        },
        "types": [
            { "slot": 1, "type": { "name": "water", "url": "https://pokeapi.co/api/v2/type/11/" } },
            { "slot": 2, "type": { "name": "dark", "url": "https://pokeapi.co/api/v2/type/17/" } }
        ]
    },

    {
        "id": 63,
        "name": "abra",
        "height": 9,
        "weight": 195,
        "sprites": {
            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/63.png"
        },
        "types": [
            { "slot": 1, "type": { "name": "psychic", "url": "https://pokeapi.co/api/v2/type/14/" } }
        ]
    },

    {
        "id": 137,
        "name": "porygon",
        "height": 8,
        "weight": 365,
        "sprites": {
            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/137.png"
        },
        "types": [
            { "slot": 1, "type": { "name": "normal", "url": "https://pokeapi.co/api/v2/type/1/" } }
        ]
    },

    {
        "id": 94,
        "name": "gengar",
        "height": 15,
        "weight": 405,
        "sprites": {
            "front_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png"
        },
        "types": [
            { "slot": 1, "type": { "name": "ghost", "url": "https://pokeapi.co/api/v2/type/8/" } },
            { "slot": 2, "type": { "name": "poison", "url": "https://pokeapi.co/api/v2/type/4/" } }
        ]
  },

  {
        "id": 133,
        "name": "eevee",
        "height": 3,
        "weight": 65,
        "sprites": {
            "front_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png"
        },
        "types": [
            {
            "slot": 1,
            "type": { "name": "normal", "url": "https://pokeapi.co/api/v2/type/1/" } }
        ]
  },

  {
        "id": 3,
        "name": "venusaur",
        "height": 20,
        "weight": 1000,
        "sprites": {
            "front_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png"
        },
        "types": [
            { "slot": 1, "type": { "name": "grass", "url": "https://pokeapi.co/api/v2/type/12/" } },
            { "slot": 2, "type": { "name": "poison", "url": "https://pokeapi.co/api/v2/type/4/" } }
        ]
  },

  {
    "id": 149,
    "name": "dragonite",
    "height": 22,
    "weight": 2100,
     "sprites": {
        "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png"
    },
    "types": [
        { "slot": 1, "type": { "name": "dragon", "url": "https://pokeapi.co/api/v2/type/16/" } },
        { "slot": 2, "type": { "name": "flying", "url": "https://pokeapi.co/api/v2/type/3/" } }
    ]
  },
];

const container = document.getElementById("listaDePokemons");
const campoPesquisa = document.getElementById("pesquisaPokemon");

// Lista que está sendo exibida na página
let listaAtual = listaPokemons;

// Recupera os favoritos salvos no navegador
function recuperarPokemons() {
    return JSON.parse(localStorage.getItem("pokemons")) || [];
}

// Salva os favoritos no navegador
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

// Remove um Pokémon dos favoritos
function removerFavorito(id) {
    const favoritos = recuperarPokemons();

    const favoritosAtualizados = favoritos.filter(function (pokemon) {
        return pokemon.id !== id;
    });

    localStorage.setItem("pokemons", JSON.stringify(favoritosAtualizados));
}

// Verifica se um Pokémon já é favorito
function ehFavorito(id) {
    const favoritos = recuperarPokemons();

    return favoritos.some(function (pokemon) {
        return pokemon.id === id;
    });
}

// Escolhe a imagem do Pokémon
function imagemDoPokemon(pokemon) {
    if (pokemon.sprites && pokemon.sprites.front_default) {
        return pokemon.sprites.front_default;
    }

    return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + pokemon.id + ".png";
}

// Cria o card de cada Pokémon
    return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + pokemon.id + ".png";
}

function criarCard(pokemon) {
    const card = document.createElement("article");
    card.classList.add("card");

    const id = document.createElement("span");
    id.classList.add("card-id");
    id.textContent = "#" + String(pokemon.id).padStart(3, "0");

    const imagem = document.createElement("img");
    imagem.src = imagemDoPokemon(pokemon);
    imagem.alt = pokemon.name;
    imagem.loading = "lazy";

    const nome = document.createElement("h2");
    nome.textContent = pokemon.name;

    const medidas = document.createElement("p");
    medidas.textContent = "Height: " + pokemon.height + " | Weight: " + pokemon.weight;

    const tipos = document.createElement("p");
    tipos.classList.add("card-tipos");
    tipos.textContent = pokemon.types.map(function (tipo) {
        return tipo.type.name;
    }).join(", ");

    // Botão de favorito
    const botaoFavorito = document.createElement("button");
    botaoFavorito.type = "button";
    botaoFavorito.classList.add("botao-favorito");
    botaoFavorito.textContent = ehFavorito(pokemon.id)
        ? "❤️ Remover favorito"
        : "🩶 Favoritar";

    botaoFavorito.setAttribute(
        "aria-label",
        "Alternar favorito de " + pokemon.name
    );

    botaoFavorito.addEventListener("click", function () {
        if (ehFavorito(pokemon.id)) {
            removerFavorito(pokemon.id);
        } else {
            salvarPokemon(pokemon);
        }

        // Atualiza a lista de acordo com a página
        if (window.location.pathname.includes("favorites")) {
            mostrarPokemons(recuperarPokemons());
        } else {
            mostrarPokemons(listaAtual);
        }
    });

    card.append(id, imagem, nome, medidas, tipos, botaoFavorito);

    return card;
}

// Exibe os cards na tela
function mostrarPokemons(lista) {
    if (!container) {
        return;
    }

    listaAtual = lista;
    container.replaceChildren();

    if (lista.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.textContent = "Nenhum Pokémon encontrado.";
        container.appendChild(mensagem);
        return;
    }

    lista.forEach(function (pokemon) {
        container.appendChild(criarCard(pokemon));
    });
}

// Pesquisa Pokémon pelo nome
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

// Exibe os Pokémon na página inicial, quando houver o container
if (container) {
    mostrarPokemons(listaPokemons);
}
