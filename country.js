let countryImage = document.querySelector('.country-image');
let countryNameh1 = document.querySelector('.country-name');
let countryName = new URLSearchParams(location.search).get('name');
let countryNativeName = document.querySelector('.country-native-name');
let countryPopulation = document.querySelector('.country-population');
let countryRegion = document.querySelector('.country-region');
let subRegion = document.querySelector('.sub-region');
let countryCapital = document.querySelector('.country-capital');
let countryDomains = document.querySelector('.country-domains');
let countryCurrencies = document.querySelector('.country-currencies');
let countryLanguages = document.querySelector('.country-languages');
let borderCountries = document.querySelector('.border-countries');
const themeChanger = document.querySelector('.theme-changer');










fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true?`)
.then((data) => data.json()
.then((data) => {
    data.forEach((country) => {
        if(country.currencies)
        {
            let currencies = Object.values(country.currencies).map((curr) => curr.name);
            countryCurrencies.innerText = currencies.join(", ");
        }

        countryImage.src = country.flags['svg'];
        countryNameh1.innerText = country.name.common;

        if(country.name.nativeName)
        {
            countryNativeName.innerText = Object.values(country.name.nativeName)[0].common;
        }
        else countryNativeName.innerText = country.name.common;

        countryPopulation.innerText = `${country.population.toLocaleString('en')}`
        countryDomains.innerText = country.tld;

        if(country.region)
        {
            countryRegion.innerText = country.region;
        }

        if(country.subregion)
        {
            countryRegion.innerText = country.subregion;
        }


        if(country.capital)
        {
            countryCapital.innerText = country.capital;
        }


        if(country.languages)
        {
            countryLanguages.innerText = Object.values(country.languages).join(", ");
        }

        if(country.borders)
        {
            country.borders.forEach((border) => {
                fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((data) => data.json()
                .then(([country]) => {        
                let borderCountryTag = document.createElement('a');
                borderCountryTag.innerText = country.name.common;  
                borderCountryTag.href = `country.html?name=${country.name.common}`;
                borderCountries.append(borderCountryTag);      
            }))
        })
        }
    })
}))

themeChanger.addEventListener('click', () => {
    debugger;
    document.body.classList.toggle('dark');
    if(themeChanger.innerText == "Dark Mode")
    {
        modeIcon.classList.remove('fa-regular',"fa-moon")
        modeIcon.classList.add('fa-solid', 'fa-sun');
        themeChanger.innerText = "Light Mode"
    }
    else 
    {
        themeChanger.innerText = "Dark Mode";
        modeIcon.classList.remove('fa-solid',"fa-sun")
        modeIcon.classList.add('fa-regular', 'fa-moon');
    }

});
