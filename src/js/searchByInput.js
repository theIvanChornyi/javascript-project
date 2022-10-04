import { mobilMenuRef } from './header';
import { checkedBtns } from '../servise/firebase';
import { gerInfoByName } from '../servise/apiData';
import {
  sampleCoctaileCard,
  cocktailsList,
} from '../MarkupSample/sampleCoctaileCard';

const desktopFormRef = document.querySelector('.js-form-desktop');
const mobilFormRef = document.querySelector('.js-form-mobil');
const titleRef = document.querySelector('.gallery__title');
const apologiRef = document.querySelector('.sorry-card');

desktopFormRef.addEventListener('submit', onFormSubmit);
mobilFormRef.addEventListener('submit', onFormSubmit);

let dataFromInput = '';
function onFormSubmit(evt) {
  evt.preventDefault();
  mobilMenuRef.classList.add('is-hidden');
  if (
    window.location.href.includes('ingredients') ||
    window.location.href.includes('coctails')
  ) {
    window.location.href = 'https://faridmk.github.io/project-JS-goit/';
  }
  cocktailsList.innerHTML = '';
  dataFromInput = evt.target.input.value.trim();

  fetchCockteilByName(dataFromInput);

  titleRef.scrollIntoView({ behavior: 'smooth' });
}

async function fetchCockteilByName(name) {
  try {
    const cocteils = await gerInfoByName(name);
    const drinks = await cocteils.data.drinks;
    if (!drinks) {
      apologShown();
    } else {
      apologNotShown();
      drinks.map(drink => sampleCoctaileCard(drink));
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
    }
  } catch (error) {
    console.log('error', error);
  }
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
