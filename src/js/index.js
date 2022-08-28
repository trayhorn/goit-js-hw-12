import '../css/style.css';
import pokemonCardTpl from '../templates/pokemon-card.hbs';

const listEl = document.querySelector('.js-list');
const buttonEl = document.querySelector('.js-button');

buttonEl.addEventListener('click', fetchPokemon)

function fetchPokemon() {
  return fetch("https://pokeapi.co/api/v2/pokemon/15")
    .then(response => {
      return response.json();
    })
    .then(renderPokemonCard)
    .catch(error => console.log(error));
}

function renderPokemonCard(pokemon) {
  const markup = pokemonCardTpl(pokemon);
  listEl.innerHTML = markup;
}
