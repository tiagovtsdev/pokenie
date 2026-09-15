// 1 array com 3 objetos

const listaPokemons = [
    
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