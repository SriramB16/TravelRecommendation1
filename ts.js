let url = "travel_recommendation_api.json";

document.getElementById('searchBtn').addEventListener('click', getText);
document.getElementById('clearBtn').addEventListener('click', clearText);


function getText() {
    const searchInput = document.getElementById('place').value;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            filterData(data,searchInput)
        })
        .catch(error => console.error(error));
}


function filterData(allData, searchInput){
    const searchText = searchInput.toLowerCase();

    // search by categories

    switch(searchText) {
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
            return
    }

    // search by country and city

    const matchedCountries = allData.countries.filter(country => {

        // search by country name
        if(country.name.toLowerCase() === searchText) {
            return true;
        }
        // search by city name
        return country.cities.some(city => city.name.toLowerCase().includes(searchText));
    });
    
    if (matchedCountries.length > 0) {
        showData(matchedCountries, true);
        return;
    }

    // search by temple names
    const matchedTemples = allData.temples.filter( temple => {
        return temple.name.toLowerCase().includes(searchText);
    });

    if(matchedTemples.length > 0) {
        showData(matchedTemples, false);
        return;
    }

    // search by beaches

    const matchedBeaches = allData.beaches.filter(beach => {
        return beach.name.toLowerCase().includes(searchText);
    });
    
    if(matchedBeaches.length > 0) {
        showData(matchedBeaches, false);
        return;
    }

    showMessage();
}

// func to display the result in card

function  showData(dataResult, isCountry) {
    const container = document.getElementById('results');
    container.innerHTML = '';

    dataResult.forEach(item => {
        const name = item.name;
        const description = isCountry ? 'Explore the cities of ' + item.name : item.description
        const imageUrl = isCountry ? item.cities[0].imageUrl : item.imageUrl;
        
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
        button.textContent = 'Visit';

        contentDiv.appendChild(title);
        contentDiv.appendChild(desc);
        contentDiv.appendChild(button);

        cardDiv.appendChild(img);
        cardDiv.appendChild(contentDiv);

        container.appendChild(cardDiv);
    });
}

function showMessage() {
    const container = document.getElementById('results');
    container.innerHTML = '';

    const message = document.createElement('p');
    message.textContent = 'No results found for your search.';
    message.style.color = 'red';
    message.style.fontSize = '18px';
}

// clearBtn function
function clearText(){
    document.getElementById("place").value = "";
    let clearResult = document.getElementById('results');
    while(clearResult.firstChild){
        clearResult.removeChild(clearResult.firstChild);
    }
}