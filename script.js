const countriesContainer = document.querySelector('.countries-container'); 
const filterByRegion = document.querySelector('.filter-by-region');
const searchInput = document.querySelector('.search-container .search-input');
const themeChanger = document.querySelector('.theme-changer');
const modeIcon = document.getElementById('mode-icon');

console.log(searchInput);

 let countriesList;
    fetch("https://raw.githubusercontent.com/dharamdan01/rest_countries_API_data/refs/heads/main/countries_data.json")
    .then((data) => data.json())
    .then((data) => {
        fetchCountriesData(data)
        countriesList = data;
    });

    filterByRegion.addEventListener('change', (e) => {
        fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
        .then((data) => data.json()
        .then((data) => {
            fetchCountriesData(data);
            countriesList = data;
        }))
    });



function fetchCountriesData(data)
{
    console.log(data);
     countriesContainer.innerHTML = '';
        data.forEach((country) => {
            // const formattter = new Intl.NumberFormat('en-IN');
            // const formattedNumber = formattter.format(country.population)
            
            let countryCard = document.createElement('a');
            countryCard.classList.add('country-card');
            countryCard.href = `/country.html?name=${country.name.common || country.name}`

            countryCard.innerHTML = `
                    <img src=${country.flags['svg']} alt=${country.flags['svg']}>
                    <div class="card-text">
                        <h3 class="card-title">${country.name.common || country.name}</h3>
                        <p><b>Population: </b>${country.population.toLocaleString('en')}</p>
                        <p><b>Region: </b>${country.region}</p>
                        <p><b>Capital: </b>${country.capital}</p>
                    </div>
                `;

                countriesContainer.append(countryCard)
        })
}


searchInput.addEventListener('input', (e) => {
  const filteredCountries =  countriesList.filter((country) => {
        return country.name.toLowerCase().includes(e.target.value.toLowerCase())
   });
   fetchCountriesData(filteredCountries);
})

themeChanger.addEventListener('click', () => {
    debugger;
    document.body.classList.toggle('dark');
    if(themeChanger.innerText == "Dark Mode")
    {
        modeIcon.classList.remove('fa-regular',"fa-moon")
        modeIcon.classList.add('fa-solid', 'fa-sun');
        modeIcon.style.color = "red";   
        themeChanger.innerText = "Light Mode"
    }
    else 
    {
        modeIcon.classList.remove('fa-solid',"fa-sun")
        modeIcon.classList.add('fa-regular', 'fa-moon');
        themeChanger.innerText = "Dark Mode";
    }

});