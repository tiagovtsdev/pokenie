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
    }
];

console.log(listaPokemons);