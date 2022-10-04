import { cocktailsList } from '../MarkupSample/sampleCoctaileCard';
import { sampleSerchByLetter } from '../MarkupSample/sampleSerchByLetter';
import { checkedBtns } from '../servise/firebase';
import { getInfoByLetter } from '../servise/apiData';

import Notiflix from 'notiflix';

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
        const drinkU = await sampleSerchByLetter(data.drinks);
        cocktailsList.innerHTML = await drinkU.join('');
        checkedBtns(
          '[data-cocktaileid]',
          '/coctailes',
          'cocktaileid',
          'data-add',
          {
            atrOnDel: 'remove-to-fav',
            atrOnAdd: 'add-to-fav',
          },
          { contOnDel: 'remove', ContOnAdd: 'add to' }
        );
        titleRef.textContent = 'Searching results';
      }
    } catch (error) {}
  } catch (e) {}
}

async function getCocktailByLetter(letter) {
  try {
    const response = await getInfoByLetter(letter);
    if (!response.data) {
      throw new Error(response);
    }
    return response.data;
  } catch (error) {
    Notiflix.Notify.failure('Ooops, error!');
  }
}

function sorryText() {
  removeMarkup(cocktailsList);
  sorryCardEl.classList.remove('visually-hidden');
}

function removeMarkup(element) {
  element.innerHTML = '';
}
