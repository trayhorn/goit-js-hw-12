import '../css/style.css';
import countryTpl from '../templates/country.hbs';
import countriesListTpl from '../templates/countriesList';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const countryContainer = document.querySelector('.country');
const formEl = document.querySelector('.js-form');


formEl.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  event.preventDefault();

  const inputValue = event.target.value;

  fetchCountries(inputValue)
    .then(r => {
      if (r.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific query!');
      } else if (r.length >= 2 && r.length <= 10) {
        renderCountriesList(r);
        return
      } else renderCountryCard(r);
    })
    .catch(err => {
      Notify.failure('Oops, there is no country with that name');
    });
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



