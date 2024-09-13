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

    const matchedTemples = 
}


// clearBtn function
function clearText(){
    document.getElementById("place").value = "";
    let clearResult = document.getElementById('results');
    while(clearResult.firstChild){
        clearResult.removeChild(clearResult.firstChild);
    }
}