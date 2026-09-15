// 1 array com 3 objetos

const listaPokemons = [
  {
    "id":25,
    "name":"pikachu",
    "height":4,
    "weight":60,
    "sprites": {
      "front_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
    },
    "types":[
      {
        "slot":1,
        "type":{
          "name":"electric",
          "url":"https://pokeapi.co/api/v2/type/13/"
        }
      }
    ]
  },

  {
    "id":6,
    "name":"charizard",
    "height":17,
    "weight":905,
    "sprites": {
      "front_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
    },
    "types":[
      {
        "slot":1,
        "type":{
          "name":"fire",
          "url":"https://pokeapi.co/api/v2/type/10/"
        }
      },
      {
        "slot":2,
        "type":{
          "name":"flying",
          "url":"https://pokeapi.co/api/v2/type/3/"
        }
      }
    ]
  },

  {
    "id":150,
    "name":"mewtwo",
    "height":20,
    "weight":1220,
    "sprites": {
      "front_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png"
    },
    "types":[
      {
        "slot":1,
        "type":{
          "name":"psychic",
          "url":"https://pokeapi.co/api/v2/type/14/"
        }
      }
    ]
  },

  {
    "id":1,
    "name":"bulbasaur",
    "height":7,
    "weight":69,
    "sprites": {
      "front_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
    },
    "types":[
      {
        "slot":1,
        "type":{
          "name":"grass",
          "url":"https://pokeapi.co/api/v2/type/12/"
        }
      },
      {
        "slot":2,
        "type":{
          "name":"poison",
          "url":"https://pokeapi.co/api/v2/type/4/"
        }
      }
    ]
  },

  {
    "id":7,
    "name":"squirtle",
    "height":5,
    "weight":90,
    "sprites": {
      "front_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
    },
    "types":[
      {
        "slot":1,
        "type":{
          "name":"water",
          "url":"https://pokeapi.co/api/v2/type/11/"
        }
      }
    ]
  },

  {
    "id":94,
    "name":"gengar",
    "height":15,
    "weight":405,
    "sprites": {
      "front_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png"
    },
    "types":[
      {
        "slot":1,
        "type":{
          "name":"ghost",
          "url":"https://pokeapi.co/api/v2/type/8/"
        }
      },
      {
        "slot":2,
        "type":{
          "name":"poison",
          "url":"https://pokeapi.co/api/v2/type/4/"
        }
      }
    ]
  },

  //GRENINJA
  {
    "id":658,
    "name":"greninja",
    "height":15,
    "weight":400,
    "sprites": {
      "front_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/658.png"
    },
    "types":[
      {
        "slot":1,
        "type":{
          "name":"water",
          "url":"https://pokeapi.co/api/v2/type/11/"
        }
      },
      {
        "slot":2,
        "type":{
          "name":"dark",
          "url":"https://pokeapi.co/api/v2/type/17/"
        }
      }
    ]
  },

  //ABRA
  {
    "id":63,
    "name":"abra",
    "height":9,
    "weight":195,
    "sprites": {
      "front_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/63.png"
    },
    "types":[
      {
        "slot":1,
        "type":{
          "name":"psychic",
          "url":"https://pokeapi.co/api/v2/type/14/"
        }
      }
    ]
  },

  //O INCRIVEL PORYGON
  {
    "id":137,
    "name":"porygon",
    "height":8,
    "weight":365,
    "sprites": {
      "front_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/137.png"
    },
    "types":[
      {
        "slot":1,
        "type":{
          "name":"normal",
          "url":"https://pokeapi.co/api/v2/type/1/"
        }
      }
    ]
  }
]

const container = document.getElementById("listaDePokemons");

listaPokemons.forEach(function(pokemon){
  console.log(pokemon)

  const tiposDePokemon = pokemon.types.map(function(t) {
  return t.type.name;
}).join(", ")

  const imagem = pokemon.sprites.front_default

  const cardHTML = `
    <div class="card">
      <h3>Id: ${pokemon.id}</h3>
      <img src="${imagem}">
      <h2>${pokemon.name}</h2>
      <p>Height: ${pokemon.height}</p>
      <p>Weight: ${pokemon.weight}</p>
      <p><b>Type:</b> ${tiposDePokemon}</p>
    </div> 
  `;

  container.innerHTML += cardHTML

})