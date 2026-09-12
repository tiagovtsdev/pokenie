// 1 array com 3 objetos

const listaPokemons = [
  {
    "id": 1,
    "name": "bulbasaur",
    "height": 7,
    "weight": 69,
    "types": [
      {
        "slot": 1,
        "type": {
          "name": "grass",
          "url": "https://pokeapi.co/api/v2/type/12/"
        }
      },
      {
        "slot": 2,
        "type": {
          "name": "poison",
          "url": "https://pokeapi.co/api/v2/type/4/"
        }
      }
    ]
  },
  {
    "id": 4,
    "name": "charmander",
    "height": 6,
    "weight": 85,
    "types": [
      {
        "slot": 1,
        "type": {
          "name": "fire",
          "url": "https://pokeapi.co/api/v2/type/10/"
        }
      }
    ]
  },
  {
    "id": 7,
    "name": "squirtle",
    "height": 5,
    "weight": 90,
    "types": [
      {
        "slot": 1,
        "type": {
          "name": "water",
          "url": "https://pokeapi.co/api/v2/type/11/"
        }
      }
    ]
  }
];

console.log(listaPokemons)