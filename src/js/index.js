import '../css/style.css';
import fetchCountries from './fetchCountries';
import countryTpl from '../templates/country.hbs';
import countriesListTpl from '../templates/countriesList';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const countryContainer = document.querySelector('.country');
const inputEl = document.querySelector('.js-input');


inputEl.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  event.preventDefault();

  const inputValue = event.target.value;

  fetchCountries(inputValue)
    .then(whatRender)
    .catch(err => {
      console.log(err)
      Notify.failure('Oops, there is no country with that name');
    });
}


function whatRender(response) { {
  if (response.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific query!');
  } else if (response.length >= 2 && response.length <= 10) {
    renderCountriesList(response);
    return;
  } else {
    renderCountryCard(response);
  }
  }
}


function renderCountryCard(country) {
  const markup = countryTpl(country);
  countryContainer.innerHTML = markup;
}

function renderCountriesList(country) {
  const markup = countriesListTpl(country);
  countryContainer.innerHTML = markup;
}



