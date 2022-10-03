import axios from 'axios';

export function openIngridientInfoModal(selector) {
  const favoriteBtn = document.querySelector(selector);
  favoriteBtn?.addEventListener('click', openModal);
}

function openModal(e) {
  const ingridientItem = e.target.closest('.ingredient__item').dataset;

  if (ingridientItem?.open === 'open-ingridient-description') {
    getIngridient(ingridientItem?.ingridientname);
  }
}

async function getIngridient(IngrdName) {
  const request = await axios(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${IngrdName}`
  );
  const objectData = await request.data.ingredients[0];
  const createMarkup = await marcup(objectData);
  const DOM = document.querySelector('.backdrop__cocktail');
  DOM.insertAdjacentHTML('beforeend', createMarkup);
  const backdrop = document.querySelector('.description__backdrop');
  const closeBtn = backdrop.querySelector('[data-modal="close-ingred"]');

  closeBtn.addEventListener('click', closeMoreModal);
  backdrop.addEventListener('click', closeBybackdrop);
}

async function marcup({
  idIngredient,
  strIngredient,
  strDescription,
  strType,
  strABV,
}) {
  let string = '';

  if (strIngredient) {
    string += `<h2 class="description__title">${strIngredient}</h2>`;
  }
  if (strType) {
    string += `<h3 class="description__category">${strType}</h3>`;
  }
  if (strDescription) {
    string += `<p class="description__characteristic">${strDescription.substring(
      0,
      404
    )}</p>`;
  }
  if (strType) {
    string += `<li class="description__list">✶ Type: ${strType}</li>`;
  }
  if (strABV) {
    string += `<li class="description__list">✶ Alcohol by volume: ${strABV}</li>`;
  }
  return `

  <div class="description__backdrop">
  <div class="description ${localStorage.getItem('theme')}">
  <div class="wrapper_ingrd">
    <button type="button" autofocus class="btn--close" data-modal="close-ingred"><span class="btn--close--cross ${localStorage.getItem(
      'theme'
    )}">&#215</span>
    </button>
  ${string}
    <div class="ingred__modal-btn">
        <button type="button" class="modal__btnIng modal__btnJS" data-ingridientname='${idIngredient}'>Add to favorite
        </button>
    </div>
    </div>
    </div>
  </div>`;
}

export function closeBybackdrop(e) {
  if (e.currentTarget === e.target) {
    e.target.remove();
  }
}

function closeMoreModal(e) {
  e.currentTarget.closest('.description__backdrop').remove();
}
