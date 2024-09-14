let url = "travel_recommendation_api.json";

document.getElementById('searchBtn').addEventListener('click', getText);
document.getElementById('clearBtn').addEventListener('click', clearText);

function getText() {
    const searchInput = document.getElementById('place').value;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            filterData(data, searchInput);
        })
        .catch(error => console.error(error));
}

function filterData(allData, searchInput) {
    const searchText = searchInput.toLowerCase();

    // Search by categories
    switch (searchText) {
        case "temple":
        case "temples":
            showData(allData.temples, false);
            return;
        case "country":
        case "countries":
            showData(allData.countries, true);
            return;
        case "beach":
        case "beaches":
            showData(allData.beaches, false);
            return;
    }

    // Search by country and city
    const matchedCountries = allData.countries.filter(country => {
        // Search by country name
        if (country.name.toLowerCase() === searchText) {
            return true;
        }
        // Search by city name
        return country.cities.some(city => city.name.toLowerCase().includes(searchText));
    });

    if (matchedCountries.length > 0) {
        const country = matchedCountries[0];

        // If searching for a specific city
        const searchByCity = country.cities.filter(city => city.name.toLowerCase().includes(searchText));

        if (searchByCity.length > 0) {
            // Show only the matched city if found
            showCityData(searchByCity);
        } else {
            // Show all cities in the country if searching by country
            showCityData(country.cities);
        }
        return;
    }

    // Search by temple names
    const matchedTemples = allData.temples.filter(temple => {
        return temple.name.toLowerCase().includes(searchText);
    });

    if (matchedTemples.length > 0) {
        showData(matchedTemples, false);
        return;
    }

    // Search by beaches
    const matchedBeaches = allData.beaches.filter(beach => {
        return beach.name.toLowerCase().includes(searchText);
    });

    if (matchedBeaches.length > 0) {
        showData(matchedBeaches, false);
        return;
    }

    showMessage();
}

// Function to display city results in cards
function showCityData(cities) {
    const container = document.getElementById('results');
    container.innerHTML = ''; // Clear previous results

    cities.forEach(city => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        const img = document.createElement('img');
        img.classList.add('card-img');
        img.src = city.imageUrl;
        img.alt = city.name;

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('card-content');

        const title = document.createElement('h3');
        title.textContent = city.name;

        const desc = document.createElement('p');
        desc.textContent = city.description;

        const button = document.createElement('button');
        button.classList.add('visit-btn');
        button.textContent = 'Visit';

        contentDiv.appendChild(title);
        contentDiv.appendChild(desc);
        contentDiv.appendChild(button);

        cardDiv.appendChild(img);
        cardDiv.appendChild(contentDiv);

        container.appendChild(cardDiv);
    });
}

// Function to display results (temples, beaches, etc.) in cards
function showData(dataResult, isCountry) {
    const container = document.getElementById('results');
    container.innerHTML = ''; // Clear previous results

    dataResult.forEach(item => {
        if (isCountry) {
            // If it's a country, loop through each city and create cards for each
            item.cities.forEach(city => {
                createCard(city.name, city.description, city.imageUrl, container);
            });
        } else {
            // Otherwise, just create a card for the item (e.g., beach, temple)
            createCard(item.name, item.description, item.imageUrl, container);
        }
    });
}

// Helper function to create cards
function createCard(name, description, imageUrl, container) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    const img = document.createElement('img');
    img.classList.add('card-img');
    img.src = imageUrl;
    img.alt = name;

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('card-content');

    const title = document.createElement('h3');
    title.textContent = name;

    const desc = document.createElement('p');
    desc.textContent = description;

    const button = document.createElement('button');
    button.classList.add('visit-btn');
    button.textContent = 'Visit';

    contentDiv.appendChild(title);
    contentDiv.appendChild(desc);
    contentDiv.appendChild(button);

    cardDiv.appendChild(img);
    cardDiv.appendChild(contentDiv);

    container.appendChild(cardDiv);
}

function showMessage() {
    const container = document.getElementById('results');
    container.innerHTML = ''; // Clear previous results

    const message = document.createElement('p');
    message.textContent = 'No results found for your search.';
    message.style.color = 'red';
    message.style.fontSize = '18px';

    container.appendChild(message);
}

// Clear button function
function clearText() {
    document.getElementById("place").value = "";
    let clearResult = document.getElementById('results');
    while (clearResult.firstChild) {
        clearResult.removeChild(clearResult.firstChild);
    }
}
