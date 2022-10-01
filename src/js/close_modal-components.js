import axios from 'axios';
import { functions } from 'lodash';
// const modalRef = document.querySelector('.description__backdrop');
// const markupRef = document.querySelector('.markup');
// const closeRef = document.querySelector('.description__button__close');
// const favoritBtRef = document.querySelector('.description__favoriteBt');

// openModal();

// favoritBtRef.addEventListener('click', offFavoritBt);

export function openCoctaileInfoModal() {
  const favoriteBtn = document.querySelectorAll('[data-ingridientname]');
  favoriteBtn.forEach(btn => btn.addEventListener('click', openModal));
}


function offFavoritBt(e) {
  favoritBtRef.innerHTML = `Remove from favorite`;
  const removeFaforit = document.querySelector('description__button');
  favoritBtRef.removeEventListener('click', offFavoritBt);
}

function onFavoritBt(e) {
  favoritBtRef.innerHTML = `Add to favorite`;
  favoritBtRef.addEventListener('click', offFavoritBt);
}

function openModal(e) {
  const IngrdName = e.currentTarget.dataset.ingridientname
  getIngridient(IngrdName);
  // closeRef.addEventListener('click', () => {
  //   modalRef.classList.add('visually-hidden');
  // });
  // modalRef.addEventListener('click', closeBacdrop);
  // document.addEventListener('keydown', closeEsc);
}

async function getIngridient(IngrdName) {

  const request = await axios(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${IngrdName}`
  )
  const objectData = await request.data.ingredients[0];
  const createMarkup = await marcup(objectData);
  const DOM = document.querySelector('.backdrop__cocktail');
  DOM.insertAdjacentHTML('beforeend', createMarkup);

}

async function check(element) {
  const markupString = await marcup(element);
  console.log('1111', markupString);
  markupRef.innerHTML = markupString;
}

async function marcup({ idIngredient, strIngredient, strDescription, strType, strABV }) {

  let string = '';

      if (strIngredient) {
        string += `<h2 class="description__title">${strIngredient}</h2>`;
      }
      if (strType) {
        string += `<h3 class="description__category">${strType}</h3>`;
      }
      if (strDescription) {
        string += `<p class="description__characteristic">
      ${strDescription.substring(0, 404)}
    </p>`;
      }
      if (strType) {
        string += `<li class="description__list"><span class="description__accent">&#10038</span> Type: ${strType}</li>`;
      }
      if (strABV) {
        string += `<li class="description__list"><span class="description__accent">&#10038</span> Alcohol by volume: ${strABV}</li>`;
      }
  return `

  <div class="description">
    <button type="button" autofocus class="description__button__close" data-modal="close-cocktail">
    </button>
  ${string}
  </div>
        <div class="cocktail__modal-btn">
        <button type="button" class="description__favoriteBt modal__btnJS" data-cocktaileid='${idIngredient}'>Add to favorite</button>
      </div>`;
  
};


function closeEsc(e) {
  if (e.code === 'Escape') {
    modalRef.classList.add('visually-hidden');
  }
}

function closeBacdrop(e) {
  if (e.currentTarget === e.target) {
    modalRef.classList.add('visually-hidden');
  }
}
