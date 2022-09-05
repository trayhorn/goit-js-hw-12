import '../css/style.css';

import { info } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import * as Confirm from "@pnotify/confirm";
import "@pnotify/confirm/dist/PNotifyConfirm.css";

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



function click() {
  info({
    title: "Button Clicked",
    text:
      "You have clicked the button. You may now complete the process of reading the notice.",
    modules: new Map([
      [
        Confirm,
        {
          confirm: true,
          buttons: [
            {
              text: "Ok",
              primary: true,
              click: notice => {
                notice.close();
              }
            }
          ]
        }
      ]
    ])
  });
}


const App = document.getElementById("app");

App.innerHTML = `
<div class="container">
  <h1>PNotify 5 in Vanilla ES6!</h1>
  <button>Notify me!</button>
</div>
`;

App.querySelector("button").addEventListener("click", click);



