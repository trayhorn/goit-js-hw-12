import '../css/style.css';
import countryTpl from '../templates/country.hbs';

const countryContainer = document.querySelector('.country');
const formEl = document.querySelector('.js-form');

formEl.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const inputValue = form.elements.country.value;

  fetchCountries(inputValue)
    .then(renderCountryCard)
    .catch(error => console.log(error))
    .finally(() => {
      form.reset();
    })
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

