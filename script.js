document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const search = document.getElementById('search');
    let limitBreakerButton; 

    // Colors for Pokémon types, used for  type badges and card background
    const typeColors = {
        normal: '#A8A77A',
        fighting: '#C22E28',
        flying: '#A98FF3',
        poison: '#A33EA1',
        ground: '#E2BF65',
        rock: '#B6A136',
        bug: '#A6B91A',
        ghost: '#735797',
        steel: '#B7B7CE',
        fire: '#EE8130',
        water: '#6390F0',
        grass: '#7AC74C',
        electric: '#F7D02C',
        psychic: '#F95587',
        ice: '#96D9D6',
        dragon: '#6F35FC',
        dark: '#705746',
        fairy: '#D685AD'
    };

    // Fetch Pokémon data from PokéAPI, create Pokémon cards and display them
    const fetchPokemon = async (limit = 151) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
            const data = await response.json();
            const pokemonPromises = data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()));
            const pokemonList = await Promise.all(pokemonPromises);
            pokemonList.sort((a, b) => a.id - b.id);
            displayPokemon(pokemonList);
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
        }
    };

    // Display Pokémon cards
    const displayPokemon = (pokemonList) => {
        app.innerHTML = pokemonList.map(pokemon => createPokemonCard(pokemon)).join('');
        addHoverEffect();
        addClickEffect();
        addLimitBreakerButton();
    };

    // Create Pokémon card with Pokémon name, image, type badges and cry
    const createPokemonCard = (pokemon) => {
        const typeColor = typeColors[pokemon.types[0].type.name]; // Get the first type of the Pokémon, used for card background
        const lighterColor = lightenColor(typeColor, 55); // Lighten the color for the card background, Prozentwert kann angepasst werden (höher, heller)
        // HTML template for Pokémon card, dann wird jeder Datensatz in ein eigenes div gepackt
        // data attributes are used for hover effect and cry
        return `
            <div class="ui card" data-name="${pokemon.name.toLowerCase()}" data-cry="https://play.pokemonshowdown.com/audio/cries/${pokemon.name.toLowerCase()}.mp3" style="background-color: ${lighterColor};">
                <div class="image">
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" data-front="${pokemon.sprites.front_default}" data-back="${pokemon.sprites.back_default}">
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

    // Create type badge with type color
    const createTypeBadge = (type) => {
        const color = typeColors[type] || '#777';
        return `<span class="type-badge" style="background-color: ${color}; border-radius: 12px; padding: 5px 10px; color: white; margin: 2px; width: 80px;">${capitalizeFirstLetter(type)}</span>`;
    };

    // Capitalize first letter of a string
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // Visual: Lighten color for card background
    const lightenColor = (color, percent) => {
        const num = parseInt(color.slice(1), 16),
              amt = Math.round(2.55 * percent),
              R = (num >> 16) + amt,
              G = (num >> 8 & 0x00FF) + amt,
              B = (num & 0x0000FF) + amt;
        return `#${(0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1).toUpperCase()}`;
    };

    // Extras
    // Add hover effect to flip Pokémon sprite (in other words, change the image source on hover)
    const addHoverEffect = () => {
        const cards = document.querySelectorAll('.ui.card');
        cards.forEach(card => {
            const img = card.querySelector('.image img');
            card.addEventListener('mouseenter', () => {
                img.src = img.getAttribute('data-back');
            });
            card.addEventListener('mouseleave', () => {
                img.src = img.getAttribute('data-front');
            });
        });
    };

    // Add click effect to play Pokémon cry
    const addClickEffect = () => {
        const cards = document.querySelectorAll('.ui.card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const cryUrl = card.getAttribute('data-cry');
                const audio = new Audio(cryUrl);
                audio.play();
            });
        });
    };

    // Add Limit Breaker button and its functionality
    // Fetches all current Pokémon instead of the first 151 
    const addLimitBreakerButton = () => {
        if (!limitBreakerButton) {
            limitBreakerButton = document.createElement('button');
            limitBreakerButton.className = 'limit-breaker';
            limitBreakerButton.textContent = 'Limit Breaker';
            limitBreakerButton.addEventListener('click', () => {
                fetchPokemon(1025); // Fetches all Pokémon without limit
                limitBreakerButton.style.display = 'none'; // Hide button after clicking
            });
            app.insertAdjacentElement('afterend', limitBreakerButton);
        }
    };

    // basic Search functionality, filter by name
    search.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase(); // Get search term and convert to lowercase
        const cards = document.querySelectorAll('.ui.card');
        cards.forEach(card => {
            const pokemonName = card.querySelector('.header').textContent.toLowerCase();
            if (pokemonName.includes(searchTerm)) { // If Pokémon name includes search term, display the card
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
        // Hide Limit Breaker button if search is used
        if (searchTerm) {
            if (limitBreakerButton) {
                limitBreakerButton.style.display = 'none';
            }
        } else {
            if (limitBreakerButton && !limitBreakerButton.hasAttribute('clicked')) {
                limitBreakerButton.style.display = 'block';
            }
        }
    });

    // Fetch Pokémon data when the page loads
    fetchPokemon();
});
