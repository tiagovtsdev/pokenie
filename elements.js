// 1 array com 3 objetos

const listaPokemons = [
  {
   "id":94,
    "name":"gengar", 
    "sprites": {
      "front_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png"
    }
  },

  {
    "id":133,
    "name":"eevee",
    "sprites": {
      "front_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png"
    }
  
  },

  {
    "id":3,
    "name":"venusaur",
    "sprites": {
      "front_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png"
    }
  }
]

const container = document.getElementById("listaDePokemons");

listaPokemons.forEach(function(pokemon){
  console.log(pokemon)

  const imagem = pokemon.sprites.front_default

  const cardHTML = `
    <div class="card">
      <h3>Id: ${pokemon.id}</h3>
      <img src="${imagem}">
      <h2>${pokemon.name}</h2>
    </div> 
  `;

  container.innerHTML += cardHTML

})
