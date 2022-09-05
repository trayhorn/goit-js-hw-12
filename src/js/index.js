import '../css/style.css';
import countryTpl from '../templates/country.hbs';
import countriesListTpl from '../templates/countriesList';
import debounce from 'lodash.debounce';

const countryContainer = document.querySelector('.country');
const formEl = document.querySelector('.js-form');

formEl.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  event.preventDefault();

  const inputValue = event.target.value;

  fetchCountries(inputValue)
    .then(r => {
      if (r.length > 10) {
        alert('type more letters');
      } else if (r.length >= 2 && r.length <= 10) {
        renderCountriesList(r);
        return
      } else renderCountryCard(r);
    })
    .catch(error => console.log(error));
}


function fetchCountries(countryName) {
  return fetch(`https://restcountries.com/v2/name/${countryName}`)
    .then(response => response.json())
}


function renderCountryCard(country) {
  const markup = countryTpl(country);
  countryContainer.innerHTML = markup;
}

function renderCountriesList(country) {
  const markup = countriesListTpl(country);
  countryContainer.innerHTML = markup;
}


