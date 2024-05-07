const searchBocks = document.querySelector('#search');
const anzeige = document.querySelector('#anzeige');
let anzahlPokemon = 1025;
// console.log(suche, anzeige);

// https://www.pokeapi.com/api/v2/
async function suchePokemon(searchInput) {
    console.log(searchInput);
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=${anzahlPokemon}&offset=0'
    let creatures = await fetchData(url);
    let filteredPokemon = creatures.results.filter(wantedPokemon => wantedPokemon.name.includes(searchInput));
    console.log(filteredPokemon);
    anzeige.innerHTML = '';
    filteredPokemon.forEach(pokemon => {
        let card = document.createElement('div');
        card.className = 'pokemonCard';
        card.innerHTML = `<h2>${pokemon.name}</h2>`;
        anzeige.appendChild(card);
    })
}

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

/*
function datenDarstellen(pokemon) {
    anzeige.innerHTML = ''; // leert die Anzeige, damit nicht immer wieder Pokémon angehängt werden
    pokemon.forEach(pokemon => {
        let div = document.createElement('div');
        let image = document.createElement('img');
        image.src = cocktail.strDrinkThumb; // cocktail. ist der absolute Pfad
        let title = document.createElement('h2');
        title.innerText = cocktail.strDrink;
        div.appendChild(title);
        div.appendChild(image); // div wird zusammengebaut (image unter title)
        anzeige.appendChild(div); // div wird angezeigt
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