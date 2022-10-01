import axios from 'axios';
import { mobilMenuRef } from './header';
import { sorryText } from './searchByLetter';

import {
  createCardMarkup,
  cocktailsList,
  preloader,
  section,
} from './getRandomCoctails';
const desktopFormRef = document.querySelector('.js-form-desktop');
const mobilFormRef = document.querySelector('.js-form-mobil');
const titleRef = document.querySelector('.gallery__title');
const apologiRef = document.querySelector('.sorry-card');

desktopFormRef.addEventListener('submit', onFormSubmit);
mobilFormRef.addEventListener('submit', onFormSubmit);

let dataFromInput = '';
// ============================================
function onFormSubmit(evt) {
  evt.preventDefault();
  mobilMenuRef.classList.add('is-hidden');
  if (
    window.location.href.includes('ingredients') ||
    window.location.href.includes('coctails')
  ) {
    window.location.href = '../index.html';
  }
  cocktailsList.innerHTML = '';
  dataFromInput = evt.target.input.value.trim();

  fetchCockteilByName(dataFromInput);

  titleRef.scrollIntoView(true);
}
// ============================================

function fetchCockteilByName(name) {
  const cocteils = axios(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
  );
  cocteils.then(resp => {
    const drinks = resp.data.drinks;
    if (!drinks) {
      apologShown();
    } else {
      apologNotShown();
      drinks.map(drink => createCardMarkup(drink));
    }
  });

  return cocteils;
}
function apologNotShown() {
  titleRef.classList.remove('visually-hidden');
  apologiRef.classList.add('visually-hidden');
  titleRef.textContent = 'Searching results';
}
function apologShown() {
  titleRef.classList.add('visually-hidden');
  apologiRef.classList.remove('visually-hidden');
}
