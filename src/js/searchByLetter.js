import { cocktailsList } from './getRandomCoctails';
import { wrireRemovetCoctaileFunction } from '../coctails';
import { openCoctaileInfoModal } from './modal-coctails';

import Notiflix from 'notiflix';
import axios from 'axios';

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

const keyboardItemEl = document.querySelector('[data-action="keyboard"]');
const titleRef = document.querySelector('.gallery__title');
const sorryCardEl = document.querySelector('.sorry-card');
const customKeyboard = document.querySelector('.custom-select');

keyboardItemEl?.addEventListener('click', onLetterClick);
customKeyboard?.addEventListener('input', onLetterClick);

function onLetterClick(event) {
  event.preventDefault();

  let letter = '';
  letter = event.target.dataset.id;
  cocktailData(letter);
  titleRef.scrollIntoView({ behavior: 'smooth' });
}

async function cocktailData(letter) {
  try {
    const data = await getCocktailByLetter(letter);
    if (!data?.drinks) {
      removeMarkup(cocktailsList);
      titleRef.classList.add('visually-hidden');
      sorryText();
      Notiflix.Notify.failure(
        'Unfortunately, such a cocktail is not available.'
      );
      throw new Error('response');
    }

    try {
      titleRef.classList.remove('visually-hidden');
      sorryCardEl.classList.add('visually-hidden');
      const data = await getCocktailByLetter(letter);

      if (!data?.drinks) {
        removeMarkup(cocktailsList);
        titleRef.classList.add('visually-hidden');
        sorryText();
        Notiflix.Notify.failure(
          'Unfortunately, such a cocktail is not available.'
        );
        throw new Error('response');
      } else {
        const markupDrink = await drinksLetterCocktail(data.drinks);
        const drinkU = await cocktailMarkupList(markupDrink);
        cocktailsList.innerHTML = await drinkU.join('');
        wrireRemovetCoctaileFunction('[data-cocktaileId]');
        openCoctaileInfoModal('[data-moreId]');
        titleRef.textContent = 'Searching results';
      }
    } catch (error) {}
  } catch (e) {}
}

async function getCocktailByLetter(letter) {
  try {
    const response = await axios(`${BASE_URL}search.php?f=${letter}`);
    if (!response.data) {
      throw new Error(response);
    }
    return response.data;
  } catch (error) {
    Notiflix.Notify.failure('Ooops, error!');
  }
}

async function drinksLetterCocktail(arr) {
  let drinks = [];
  if (document.documentElement.clientWidth >= 1280) {
    drinks = arr.splice(0, 9);
  } else if (
    document.documentElement.clientWidth >= 768 &&
    document.documentElement.clientWidth < 1280
  ) {
    drinks = arr.splice(0, 6);
  } else if (
    document.documentElement.clientWidth > 0 &&
    document.documentElement.clientWidth < 768
  ) {
    drinks = arr.splice(0, 3);
  }
  return drinks;
}

async function cocktailMarkupList(arr) {
  return arr.map(({ strDrinkThumb, strDrink, idDrink }) => {
    return `<li class='gallery__card'>

     <img src=${strDrinkThumb} alt=${strDrink} class='gallery__card-img'>
     <div class='gallery__card_thumb'>
     <h3 class='gallery__card-name'>${strDrink}</h3>
     <div class='btn__box'>

     <button type='button' class='gallery__btn-load-more' data-open='open-modal-description' data-moreId='${idDrink}'>Learn more</button>
      <button type='button' class='gallery__btn-add-to-fav' data-add='add-to-fav' data-cocktaileId='${idDrink}'>Add to</button>

      </div>
     </div>
     </li>`;
  });
}

function sorryText() {
  removeMarkup(cocktailsList);
  sorryCardEl.classList.remove('visually-hidden');
}

function removeMarkup(element) {
  element.innerHTML = '';
}
