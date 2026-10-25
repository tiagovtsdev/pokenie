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
        "about": "A Water and Dark type known as the Ninja Pokémon. It is the final evolution of Froakie, introduced in Generation VI. Greninja moves with incredible speed, hurling compressed water shurikens from its palms to slice through its foes.",
        "gender_rate": {
            "male_percentage": 87.5,
            "female_percentage": 12.5,
            "genderless": false
        },
        "height": 15,
        "weight": 400,
        "base_experience": 239,
        "sprites": {
            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/658.png"
        },
        "abilities": [
            {
                "ability": { "name": "torrent", "url": "https://pokeapi.co" },
                "is_hidden": false,
                "slot": 1
            },
            {
                "ability": { "name": "battle-bond", "url": "https://pokeapi.co" },
                "is_hidden": true,
                "slot": 3
            }
        ],
        "types": [
            { "slot": 1, "type": { "name": "water", "url": "https://pokeapi.co/api/v2/type/11/" } },
            { "slot": 2, "type": { "name": "dark", "url": "https://pokeapi.co/api/v2/type/17/" } }
        ],
        "stats": [
            { "base_stat": 72, "effort": 0, "stat": { "name": "hp", "url": "https://pokeapi.co" } },
            { "base_stat": 95, "effort": 0, "stat": { "name": "attack", "url": "https://pokeapi.co" } },
            { "base_stat": 67, "effort": 0, "stat": { "name": "defense", "url": "https://pokeapi.co" } },
            { "base_stat": 103, "effort": 0, "stat": { "name": "special-attack", "url": "https://pokeapi.co" } },
            { "base_stat": 71, "effort": 0, "stat": { "name": "special-defense", "url": "https://pokeapi.co" } },
            { "base_stat": 122, "effort": 3, "stat": { "name": "speed", "url": "https://pokeapi.co" } }
        ],
        "total_base_stat": 530,
        "evolution_chain": {
            "from": "frogadier",
            "trigger": "level-up",
            "full_chain": ["froakie", "frogadier", "greninja"]
        },
        "weaknesses": ["fighting", "bug", "grass", "electric", "fairy"]
    },

    {
        "id": 63,
        "name": "abra",
        "about": "A Psychic type known as the Psi Pokémon, introduced in Generation I. Abra sleeps up to 18 hours a day and teleports away the moment it senses danger, even while asleep. It evolves into Kadabra, which in turn evolves into Alakazam.",
        "gender_rate": {
            "male_percentage": 75.0,
            "female_percentage": 25.0,
            "genderless": false
        },
        "height": 9,
        "weight": 195,
        "base_experience": 62,
        "sprites": {
            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/63.png"
        },
        "abilities": [
            {
                "ability": { "name": "synchronize", "url": "https://pokeapi.co" },
                "is_hidden": false,
                "slot": 1
            },
            {
                "ability": { "name": "inner-focus", "url": "https://pokeapi.co" },
                "is_hidden": false,
                "slot": 2
            },
            {
                "ability": { "name": "magic-guard", "url": "https://pokeapi.co" },
                "is_hidden": true,
                "slot": 3
            }
        ],
        "types": [
            { "slot": 1, "type": { "name": "psychic", "url": "https://pokeapi.co/api/v2/type/14/" } }
        ],
        "stats": [
            { "base_stat": 25, "effort": 0, "stat": { "name": "hp", "url": "https://pokeapi.co" } },
            { "base_stat": 20, "effort": 0, "stat": { "name": "attack", "url": "https://pokeapi.co" } },
            { "base_stat": 15, "effort": 0, "stat": { "name": "defense", "url": "https://pokeapi.co" } },
            { "base_stat": 105, "effort": 1, "stat": { "name": "special-attack", "url": "https://pokeapi.co" } },
            { "base_stat": 55, "effort": 0, "stat": { "name": "special-defense", "url": "https://pokeapi.co" } },
            { "base_stat": 90, "effort": 0, "stat": { "name": "speed", "url": "https://pokeapi.co" } }
        ],
        "total_base_stat": 310,
        "evolution_chain": {
            "from": null,
            "trigger": null,
            "full_chain": ["abra", "kadabra", "alakazam"]
        },
        "weaknesses": ["bug", "ghost", "dark"]
    },

    {
        "id": 137,
        "name": "porygon",
        "about": "A Normal type known as the Virtual Pokémon, introduced in Generation I. It is the first artificial Pokémon, made entirely of programming code, which allows it to move freely through cyberspace. It evolves into Porygon2 and then Porygon-Z.",
        "gender_rate": {
            "male_percentage": 0.0,
            "female_percentage": 0.0,
            "genderless": true
        },
        "height": 8,
        "weight": 365,
        "base_experience": 79,
        "sprites": {
            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/137.png"
        },
        "abilities": [
            {
                "ability": { "name": "trace", "url": "https://pokeapi.co" },
                "is_hidden": false,
                "slot": 1
            },
            {
                "ability": { "name": "download", "url": "https://pokeapi.co" },
                "is_hidden": false,
                "slot": 2
            },
            {
                "ability": { "name": "analytic", "url": "https://pokeapi.co" },
                "is_hidden": true,
                "slot": 3
            }
        ],
        "types": [
            { "slot": 1, "type": { "name": "normal", "url": "https://pokeapi.co/api/v2/type/1/" } }
        ],
        "stats": [
            { "base_stat": 65, "effort": 0, "stat": { "name": "hp", "url": "https://pokeapi.co" } },
            { "base_stat": 60, "effort": 0, "stat": { "name": "attack", "url": "https://pokeapi.co" } },
            { "base_stat": 70, "effort": 0, "stat": { "name": "defense", "url": "https://pokeapi.co" } },
            { "base_stat": 85, "effort": 1, "stat": { "name": "special-attack", "url": "https://pokeapi.co" } },
            { "base_stat": 75, "effort": 0, "stat": { "name": "special-defense", "url": "https://pokeapi.co" } },
            { "base_stat": 40, "effort": 0, "stat": { "name": "speed", "url": "https://pokeapi.co" } }
        ],
        "total_base_stat": 395,
        "evolution_chain": {
            "from": null,
            "trigger": null,
            "full_chain": ["porygon", "porygon2", "porygon-z"]
        },
        "weaknesses": ["fighting"]
    },

    {
        "id": 94,
        "name": "gengar",
        "about": "A Ghost and Poison type known as the Shadow Pokémon, introduced in Generation I. It hides in the shadows and is said to lower the temperature of a room by several degrees when it lurks nearby. It evolves from Haunter through trading.",
        "gender_rate": {
            "male_percentage": 50.0,
            "female_percentage": 50.0,
            "genderless": false
        },
        "height": 15,
        "weight": 405,
        "base_experience": 250,
        "sprites": {
            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png"
        },
        "abilities": [
            {
                "ability": { "name": "cursed-body", "url": "https://pokeapi.co" },
                "is_hidden": false,
                "slot": 1
            }
        ],
        "types": [
            { "slot": 1, "type": { "name": "ghost", "url": "https://pokeapi.co/api/v2/type/8/" } },
            { "slot": 2, "type": { "name": "poison", "url": "https://pokeapi.co/api/v2/type/4/" } }
        ],
        "stats": [
            { "base_stat": 60, "effort": 0, "stat": { "name": "hp", "url": "https://pokeapi.co" } },
            { "base_stat": 65, "effort": 0, "stat": { "name": "attack", "url": "https://pokeapi.co" } },
            { "base_stat": 60, "effort": 0, "stat": { "name": "defense", "url": "https://pokeapi.co" } },
            { "base_stat": 130, "effort": 3, "stat": { "name": "special-attack", "url": "https://pokeapi.co" } },
            { "base_stat": 75, "effort": 0, "stat": { "name": "special-defense", "url": "https://pokeapi.co" } },
            { "base_stat": 110, "effort": 0, "stat": { "name": "speed", "url": "https://pokeapi.co" } }
        ],
        "total_base_stat": 500,
        "evolution_chain": {
            "from": "haunter",
            "trigger": "trade",
            "full_chain": ["gastly", "haunter", "gengar"]
        },
        "weaknesses": ["ghost", "dark", "ground", "psychic"]
    },

    {
        "id": 133,
        "name": "eevee",
        "about": "A Normal type known as the Evolution Pokémon, introduced in Generation I. Its unstable genetic makeup lets it adapt to its environment, evolving into one of eight different forms: Vaporeon, Jolteon, Flareon, Espeon, Umbreon, Leafeon, Glaceon or Sylveon.",
        "gender_rate": {
            "male_percentage": 87.5,
            "female_percentage": 12.5,
            "genderless": false
        },
        "height": 3,
        "weight": 65,
        "base_experience": 65,
        "sprites": {
            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png"
        },
        "abilities": [
            {
                "ability": { "name": "run-away", "url": "https://pokeapi.co" },
                "is_hidden": false,
                "slot": 1
            },
            {
                "ability": { "name": "adaptability", "url": "https://pokeapi.co" },
                "is_hidden": false,
                "slot": 2
            },
            {
                "ability": { "name": "anticipation", "url": "https://pokeapi.co" },
                "is_hidden": true,
                "slot": 3
            }
        ],
        "types": [
            { "slot": 1, "type": { "name": "normal", "url": "https://pokeapi.co/api/v2/type/1/" } }
        ],
        "stats": [
            { "base_stat": 55, "effort": 0, "stat": { "name": "hp", "url": "https://pokeapi.co" } },
            { "base_stat": 55, "effort": 0, "stat": { "name": "attack", "url": "https://pokeapi.co" } },
            { "base_stat": 50, "effort": 0, "stat": { "name": "defense", "url": "https://pokeapi.co" } },
            { "base_stat": 45, "effort": 0, "stat": { "name": "special-attack", "url": "https://pokeapi.co" } },
            { "base_stat": 65, "effort": 1, "stat": { "name": "special-defense", "url": "https://pokeapi.co" } },
            { "base_stat": 55, "effort": 0, "stat": { "name": "speed", "url": "https://pokeapi.co" } }
        ],
        "total_base_stat": 325,
        "evolution_chain": {
            "from": null,
            "trigger": null,
            "full_chain": ["eevee", "vaporeon", "jolteon", "flareon", "espeon", "umbreon", "leafeon", "glaceon", "sylveon"]
        },
        "weaknesses": ["fighting"]
    },

    {
        "id": 3,
        "name": "venusaur",
        "about": "A Grass and Poison type known as the Seed Pokémon, introduced in Generation I. The large flower on its back absorbs sunlight and turns it into energy, and its scent calms the emotions of those nearby. It is the final evolution of Bulbasaur.",
        "gender_rate": {
            "male_percentage": 87.5,
            "female_percentage": 12.5,
            "genderless": false
        },
        "height": 20,
        "weight": 1000,
        "base_experience": 263,
        "sprites": {
            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png"
        },
        "abilities": [
            {
                "ability": { "name": "overgrow", "url": "https://pokeapi.co" },
                "is_hidden": false,
                "slot": 1
            },
            {
                "ability": { "name": "chlorophyll", "url": "https://pokeapi.co" },
                "is_hidden": true,
                "slot": 3
            }
        ],
        "types": [
            { "slot": 1, "type": { "name": "grass", "url": "https://pokeapi.co/api/v2/type/12/" } },
            { "slot": 2, "type": { "name": "poison", "url": "https://pokeapi.co/api/v2/type/4/" } }
        ],
        "stats": [
            { "base_stat": 80, "effort": 0, "stat": { "name": "hp", "url": "https://pokeapi.co" } },
            { "base_stat": 82, "effort": 0, "stat": { "name": "attack", "url": "https://pokeapi.co" } },
            { "base_stat": 83, "effort": 0, "stat": { "name": "defense", "url": "https://pokeapi.co" } },
            { "base_stat": 100, "effort": 2, "stat": { "name": "special-attack", "url": "https://pokeapi.co" } },
            { "base_stat": 100, "effort": 1, "stat": { "name": "special-defense", "url": "https://pokeapi.co" } },
            { "base_stat": 80, "effort": 0, "stat": { "name": "speed", "url": "https://pokeapi.co" } }
        ],
        "total_base_stat": 525,
        "evolution_chain": {
            "from": "ivysaur",
            "trigger": "level-up",
            "full_chain": ["bulbasaur", "ivysaur", "venusaur"]
        },
        "weaknesses": ["fire", "ice", "flying", "psychic"]
    },

    {
        "id": 149,
        "name": "dragonite",
        "about": "A Dragon and Flying type known as the Dragon Pokémon, introduced in Generation I. Despite its massive size, it can circle the globe in 16 hours, and it is said to guide lost ships to safety through storms. It is the final evolution of Dratini.",
        "gender_rate": {
            "male_percentage": 50.0,
            "female_percentage": 50.0,
            "genderless": false
        },
        "height": 22,
        "weight": 2100,
        "base_experience": 270,
        "sprites": {
            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png"
        },
        "abilities": [
            {
                "ability": { "name": "inner-focus", "url": "https://pokeapi.co" },
                "is_hidden": false,
                "slot": 1
            },
            {
                "ability": { "name": "multiscale", "url": "https://pokeapi.co" },
                "is_hidden": true,
                "slot": 3
            }
        ],
        "types": [
            { "slot": 1, "type": { "name": "dragon", "url": "https://pokeapi.co/api/v2/type/16/" } },
            { "slot": 2, "type": { "name": "flying", "url": "https://pokeapi.co/api/v2/type/3/" } }
        ],
        "stats": [
            { "base_stat": 91, "effort": 0, "stat": { "name": "hp", "url": "https://pokeapi.co" } },
            { "base_stat": 134, "effort": 3, "stat": { "name": "attack", "url": "https://pokeapi.co" } },
            { "base_stat": 95, "effort": 0, "stat": { "name": "defense", "url": "https://pokeapi.co" } },
            { "base_stat": 100, "effort": 0, "stat": { "name": "special-attack", "url": "https://pokeapi.co" } },
            { "base_stat": 100, "effort": 0, "stat": { "name": "special-defense", "url": "https://pokeapi.co" } },
            { "base_stat": 80, "effort": 0, "stat": { "name": "speed", "url": "https://pokeapi.co" } }
        ],
        "total_base_stat": 600,
        "evolution_chain": {
            "from": "dragonair",
            "trigger": "level-up",
            "full_chain": ["dratini", "dragonair", "dragonite"]
        },
        "weaknesses": ["ice", "rock", "dragon", "fairy"]
    },
];

const container = document.getElementById("listaDePokemons");

function imagemDoPokemon(pokemon) {
    if (pokemon.sprites && pokemon.sprites.front_default) {
        return pokemon.sprites.front_default;
    }
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
    tipos.textContent = pokemon.types.map(function (t) {
        return t.type.name;
    }).join(", ");

    card.append(id, imagem, nome, medidas, tipos);
    return card;
}

function mostrarPokemons(lista) {
    container.replaceChildren();
    lista.forEach(function (pokemon) {
        container.appendChild(criarCard(pokemon));
    });
}

mostrarPokemons(listaPokemons);