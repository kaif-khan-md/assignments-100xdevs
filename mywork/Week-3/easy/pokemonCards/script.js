const apiKey = "dd4cfca4-a941-45ba-ad5e-5a11411f8626";
function fetchPokemon() {
    
    const numCards = document.getElementById('NumofPokemon').value;
    const category = document.getElementById('category').value;

    if(numCards === " " && category === " ")
    {
      alert("Enter all the fields");
    }

    fetchPokemonCards(category, numCards);
}


function fetchPokemonCards(category, numCards) {

    const apiUrl = `https://api.pokemontcg.io/v2/cards?q=types:${category}&pageSize=${numCards}`;

    fetch(apiUrl, {
        headers: {
            'X-Api-Key': apiKey 
        }
    })
    .then(response => response.json())
    .then(data => {
        
        displayCards(data.data);
    })
    .catch(error => {
        console.error('Error fetching Pokémon cards:', error);
    });
}


function displayCards(cards) {
    const resultsDiv = document.getElementById('card-results');
    resultsDiv.innerHTML = '';

    if (cards.length === 0) {
        resultsDiv.innerHTML = '<center><p>No cards found!</p></center>';
        return;
    }
    resultsDiv.innerHTML = '<center><p>Below are the Pokemons you searched for </p></center>';
    
    cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
      
        
    
        cardDiv.innerHTML = `
            <center>
            <h3>${card.name}</h3>
            <img src="${card.images.small}" alt="${card.name}">
            </center>
        `;

        resultsDiv.appendChild(cardDiv);
    });
}