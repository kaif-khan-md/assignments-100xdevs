// Replace 'your-api-key' with your actual Pokémon TCG API key
const apiKey = 'secret-api-key';

// Listen for the form submission
function fetchPokemon() {
    // Get user inputs
    const numCards = document.getElementById('NumofPokemon').value;
    const category = document.getElementById('typeofPokemon').value;

    if(numCards === " " && category === " ")
    {
      alert("Enter all the fields");
    }

    // Call function to fetch the Pokémon cards based on user input
    fetchPokemonCards(category, numCards);
}

// Function to fetch Pokémon cards
function fetchPokemonCards(category, numCards) {
    // API URL for fetching cards by category (type)
    const apiUrl = `https://api.pokemontcg.io/v2/cards?q=types:${category}&pageSize=${numCards}`;

    // Fetch the cards
    fetch(apiUrl, {
        headers: {
            'X-Api-Key': apiKey // Pass your API key in the headers
        }
    })
    .then(response => response.json())
    .then(data => {
        // Display the fetched cards on the page
        displayCards(data.data);
    })
    .catch(error => {
        console.error('Error fetching Pokémon cards:', error);
    });
}

// Function to display the cards
function displayCards(cards) {
    const resultsDiv = document.getElementById('card-results');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (cards.length === 0) {
        resultsDiv.innerHTML = '<center><p>No cards found!</p></center>';
        return;
    }
    resultsDiv.innerHTML = '<center><p>Below are the Pokemons you searched for </p></center>';
    // Loop through the cards and display them
    cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
      
        
        // Display card image and name
        cardDiv.innerHTML = `
            <center>
            <h3>${card.name}</h3>
            <img src="${card.images.small}" alt="${card.name}">
            </center>
        `;

        resultsDiv.appendChild(cardDiv);
    });
}
