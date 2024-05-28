const loaderContainer = document.querySelector('.loader-container');
const pageContent = document.querySelector('#page-content');
const resetButton = document.getElementById('reset-button'); // Reference to reset button

window.addEventListener('load', () => {
  loaderContainer.classList.add('hidden');
  pageContent.classList.add('visible');
});

const searchBox = document.getElementById("search");
const app = document.querySelector('#app');
const anzahlPokemon = 151;
// console.log(search, app);
// https://www.pokeapi.com/api/v2/

//dom loaded
document.addEventListener('DOMContentLoaded', function(){
    init();
});

console.log('You have connected...');

const typeColor = {
    normal: "#A8A898",
    fighting: "#A84B3D",
    flying: "#87B5E5",
    poison: "#864AB8",
    ground: "#946833",
    rock: "#A7995B",
    bug: "#83AD25",
    ghost: "#623C64",
    steel: "#9999A8",
    fire: "#E53B18",
    water: "#278BCC",
    grass: "#57A950",
    electric: "#E5C600",
    psychic: "#E55973",
    ice: "#68BAAC",
    dragon: "#4D63AB",
    dark: "#463E3E",
    fairy: "#D380CF",
};

// Helper function to capitalize the first letter of a name
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function init() {
  let url = `https://pokeapi.co/api/v2/pokemon?limit=${anzahlPokemon}`;
  const pokemonGet = await fetchData(url);
  allPokemon = await Promise.all(pokemonGet.results.map(async (pokemon) => {
      let detailedData = await fetchData(pokemon.url);
      return detailedData;
  }));

// allPokemon.sort((a, b) => a.name.localeCompare(b.name));
  allPokemon.forEach(pokemon => {
      createCard(pokemon);
  });
}

async function suchePokemon(searchInput) {
  let filteredPokemon = allPokemon.filter(wantedPokemon => wantedPokemon.name.includes(searchInput.toLowerCase()));
  app.innerHTML = '';
  filteredPokemon.forEach(pokemon => {
      createCard(pokemon);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  pageContent.classList.add('visible');
  init();
});

searchBox.addEventListener('input', function () {
  suchePokemon(searchBox.value);
});

//Grundfunktion um Daten zu fetchen
async function fetchData(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  } catch (error) {
      console.error(error);
  }
}

// Create card for each pokemon

function createCard(pokemon) {
  let card = document.createElement("div");
  card.className = 'card';

  // Get the id (Pokedex Number) of the pokemon
  let dexNumber = document.createElement("p");
  dexNumber.classList.add('dexNumber');
  dexNumber.innerHTML = '<span class="dexNumberLabel "># </span> ' + id;
  card.appendChild(dexNumber);
  
  // Image
  let pokemonImage = document.createElement("img");
  pokemonImage.src = pokemon.sprites.other.home.front_default; //change the image to master: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png
  pokemonImage.alt = pokemon.name;
  pokemonImage.className = 'pokemonImg';
  card.appendChild(pokemonImage);

  // Name
  let name = document.createElement("h2");
  name.textContent = capitalizeFirstLetter(pokemon.name); // Apply capitalization
  name.className = 'poke-name';
  card.appendChild(name);

  // Types
  let types = document.createElement("div");
  types.className = 'types';
  pokemon.types.forEach(type => {
      let span = document.createElement("span");
      span.textContent = type.type.name;
      span.style.backgroundColor = typeColor[type.type.name];
      types.appendChild(span);
  });
  card.appendChild(types);

  let primaryTypeColor = typeColor[pokemon.types[0].type.name];
  styleCard(card, primaryTypeColor);

  document.getElementById("card-container").appendChild(card);
}

// Styling the card, change this
function styleCard(card, color) {
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #000000 36%)`;
}

// function to create buttons below Searchbox about Types

document.addEventListener('DOMContentLoaded', function () {
  init();
  createTypeButtons();
});

function createTypeButtons() {
  const types = Object.keys(typeColor); // Get all the types from 

  types.forEach(type => {
    const button = createTypeButton(type);
    const typeselection = document.getElementById('types');
    typeselection.appendChild(button);
    button.textContent = " ";
    button.style.cursor = 'pointer';
    button.style.borderRadius = '50%';
    button.style.width= '48px';
    button.style.height= '48px';
    let btnTxthover = type.charAt(0).toUpperCase() + type.slice(1);
    button.setAttribute('title', btnTxthover);
    const icon = document.createElement('img');
    icon.src = 'icons/' + type + '.svg';
    icon.alt = type;
    icon.style.borderRadius = '50%';
    icon.style.width = '24px';
    icon.style.height = '24px';
    icon.classList.add(type);
    icon.classList.add('icon');
    console.log(icon.src);
    button.appendChild(icon);
  });
}

function createTypeButton(type) {
  const button = document.createElement('button');
  button.textContent = capitalizeFirstLetter(type);
  button.style.backgroundColor = typeColor[type];
  button.className = 'type-button'; // Add this class for potential styling via CSS
  button.onclick = function() { filterByType(type); };

  return button;
}

function filterByType(type) {
  const filteredPokemon = allPokemon.filter(pokemon => pokemon.types.some(pokemonType => pokemonType.type.name === type));
  app.innerHTML = '';
  filteredPokemon.forEach(pokemon => {
      createCard(pokemon);
  });
}

// Function to reset filters and show all Pokémon
function resetFilters() {
  searchBox.value = ''; // Clear the search box
  app.innerHTML = ''; // Clear the current cards
  allPokemon.forEach(pokemon => {
    createCard(pokemon); // Create cards for all Pokémon
  });
}

resetButton.addEventListener('click', resetFilters); // Attach event listener to the reset button


// old

function fetchPokemonAll(){
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${anzahlPokemon}`)
    .then(response => response.json())
    .then(function(allpokemon){
        allpokemon.results.forEach(function(pokemon){
            fetchPokemonData(pokemon);
        })
    });
}

function fetchPokemonData(pokemon){
    let url = pokemon.url // <--- this is saving the pokemon url to a variable to use in the fetch. 
                                //Example: https://pokeapi.co/api/v2/pokemon/1/"
    fetch(url)
    .then(response => response.json())
    .then(function(pokeData){
        renderPokemon(pokeData);
    });
}


function renderPokemon(pokeData){
    let allPokemonContainer = document.getElementById('poke-container');
    let pokeContainer = document.createElement("div") //div will be used to hold the data/details for indiviual pokemon.{}
    pokeContainer.classList.add('ui', 'card');

    createPokeImage(pokeData.id, pokeContainer);

    let pokeName = document.createElement('h4');
    pokeName.innerText = pokeData.name;

    let pokeNumber = document.createElement('p');
    pokeNumber.innerText = `#${pokeData.id}`;
   
    let pokeTypes = document.createElement('ul'); //ul list will hold the pokemon types
  

    createTypes(pokeData.types, pokeTypes); // helper function to go through the types array and create li tags for each one

    pokeContainer.append(pokeName, pokeNumber, pokeTypes);   //appending all details to the pokeContainer div
    allPokemonContainer.appendChild(pokeContainer);       //appending that pokeContainer div to the main div which will                                                             hold all the pokemon cards
}



function createTypes(types, ul){
    types.forEach(function(type){
        let typeLi = document.createElement('li');
        typeLi.innerText = type['type']['name'];
        ul.append(typeLi)
    })
}

function createPokeImage(pokeID, containerDiv){
    let pokeImgContainer = document.createElement('div');
    pokeImgContainer.classList.add('image');

    let pokeImage = document.createElement('img');
    pokeImage.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png`;

    pokeImgContainer.append(pokeImage);
    containerDiv.append(pokeImgContainer);
    
    console.log(pokeImage.srcset);
}








/*
//Suche Pokemon, das Array wird gefiltert und das DOM angepasst
async function suchePokemon(searchInput) {
    console.log(searchInput);
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${anzahlPokemon}`;
    let creatures = await fetchData(url);
    let filteredPokemon = creatures.results.filter(wantedPokemon => wantedPokemon.pokeName.includes(searchInput));
    console.log(filteredPokemon);
    app.innerHTML = '';
    filteredPokemon.forEach(pokemon => {
        let card = document.createElement('div');
        card.className = 'pokemonCard';
        card.innerHTML = `<h2>${pokemon.pokeName}</h2>`;
        // card.innerHTML = `<h2>${pokemon.pokeName}</h2><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">`;
        app.appendChild(card);
    });
}

//Sprite Clefairy https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png
//Sprite Ditto https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png
//Sprite Ditto back https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png

async function init(){
    let url = `https://www.pokeapi.co/api/v2/pokemon?limit=${anzahlPokemon}`;
    let creatures = await fetchData(url);
    creatures.results.forEach(pokemon => {
        console.log(pokemon.pokeName);
        let card = document.createElement('div');
        card.className = 'pokemonCard';
        card.innerHTML = `<h2>${pokemon.pokeName}</h2>`;
        app.appendChild(card);
    });
}

// Grundfunktion um Daten zu fetchen
async function fetchData(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    }
    catch (e) {
        console.log(e);
    }
}

/*
async function suchePokemon(url) { // async = asynchron, damit der Browser nicht blockiert wird
    try {
        // wenn Daten geladen werden können
        let data = await fetch(url); //warten bis Daten da sind, fetch ist eine Promise
        return await data.json(); //warten bis Daten in JSON umgewandelt werden
    } catch(e) {
        // wenn ein Fehler auftaucht
        console.error(e);
    }
}
let pokemonDaten = await holeDaten('https://pokeapi.co/api/v2/pokemon/');
console.log(pokemonDaten);
*/


/*
function datenDarstellen(pokemon) {
    app.innerHTML = ''; // leert die app, damit nicht immer wieder Pokémon angehängt werden
    pokemon.forEach(pokemon => {
        let div = document.createElement('div');
        let image = document.createElement('img');
        image.src = cocktail.strDrinkThumb; // cocktail. ist der absolute Pfad
        let title = document.createElement('h2');
        title.innerText = cocktail.strDrink;
        div.appendChild(title);
        div.appendChild(image); // div wird zusammengebaut (image unter title)
        app.appendChild(div); // div wird angezeigt
    })
}
datenDarstellen(pokemonDaten.pokemon);
*/


/*
// Suchleiste
suche.addEventListener('input', async function(){
    let ergebnis = suche.value;
    let searchURL = 'https://pokeapi.co/api/v2/pokemon/' + ergebnis; // URL wird zusammengebaut mit dem aus dem Suchfeld, was eingegeben wird
    // console.log(ergebnis);
    let pokemon_aus_suche = await holeDaten(searchURL);
    datenDarstellen(pokemon_aus_suche.pokemon);
    console.log(ergebnis, pokemon_aus_suche);
})
*/