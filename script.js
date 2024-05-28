document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const search = document.getElementById('search');

    const typeColors = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD'
    };

    const fetchPokemon = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
            const data = await response.json();
            const pokemonPromises = data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()));
            const pokemonList = await Promise.all(pokemonPromises);
            pokemonList.sort((a, b) => a.id - b.id);
            displayPokemon(pokemonList);
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
        }
    };

    const displayPokemon = (pokemonList) => {
        app.innerHTML = pokemonList.map(pokemon => createPokemonCard(pokemon)).join('');
    };

    const createPokemonCard = (pokemon) => {
        return `
            <div class="ui card" data-name="${pokemon.name.toLowerCase()}">
                <div class="image">
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                </div>
                <div class="content" style="text-align: center;">
                    <a class="header" style="display: block; margin-bottom: 10px;">${capitalizeFirstLetter(pokemon.name)}</a>
                    <div class="meta" style="display: flex; justify-content: center;">
                        ${pokemon.types.map(typeInfo => createTypeBadge(typeInfo.type.name)).join('')}
                    </div>
                </div>
            </div>
        `;
    };

    const createTypeBadge = (type) => {
        const color = typeColors[type] || '#777';
        return `<span class="type-badge" style="background-color: ${color}; border-radius: 12px; padding: 5px 10px; color: white; margin: 2px; width: 80px;">${capitalizeFirstLetter(type)}</span>`;
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    search.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const cards = document.querySelectorAll('.ui.card');
        cards.forEach(card => {
            const pokemonName = card.querySelector('.header').textContent.toLowerCase();
            if (pokemonName.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });

    fetchPokemon();
});


