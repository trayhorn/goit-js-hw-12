import '../css/style.css';
import countryTpl from '../templates/country.hbs';
import debounce from 'lodash.debounce';

const _ = require("lodash");

const countryContainer = document.querySelector('.country');
const formEl = document.querySelector('.js-form');

formEl.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  event.preventDefault();

  const inputValue =
    event.target.value;

  fetchCountries(inputValue)
    .then(renderCountryCard)
    .catch(error => console.log(error))
}


function fetchCountries(countryName) {
  return fetch(`https://restcountries.com/v2/name/${countryName}`)
    .then(response => {
    return response.json();
  })
}


function renderCountryCard(country) {
  const markup = countryTpl(country);
  countryContainer.innerHTML = markup;
}


