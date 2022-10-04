import axios from 'axios';
import { removeUserData, auth } from '../servise/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { openIngridientInfoModal } from './modalComponents';

const preloader = document.querySelector('.preloader-fav-coc');
const favIngridientsList = document.querySelector('.f-ing_blocks');

export async function parseFavIngridients(array) {
  const getIngridientsData = await array.map(name =>
    axios(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${name}`)
  );
  preloader?.classList.remove('visually-hidden');
  const response = await Promise.all(getIngridientsData);
  if (response.length > 0) {
    const responseData = await response
      .filter(ingr => ingr.data.ingredients)
      .map(obj => obj.data.ingredients[0]);
    const htmlStringMarkup = responseData
      .map(obg => getHtmlString(obg))
      .join('');
    if (favIngridientsList) {
      favIngridientsList.innerHTML = htmlStringMarkup;
    }
    openIngridientInfoModal('.f-ing_blocks');

    const favIngrList = document.querySelector('.f-ing_blocks');
    if (favIngrList?.childElementCount < 0) {
      favIngrList?.removeEventListener('click', removeFromFavIngr);
    } else {
      favIngrList?.addEventListener('click', removeFromFavIngr);
    }
  }
}

function getHtmlString({ strIngredient, strType, strABV, idIngredient }) {
  preloader?.classList.add('visually-hidden');
  let string = '';
  if (strABV) {
    string += `Vol: ${strABV}°`;
  }
  return `<li class="f-ing_items">
      <div class="f-ing_item__wrapper">
        <div>
          <h3 class="f-ing_subtitle">${strIngredient}</h3>
          <p class="f-ing_text">${strType ?? 'Other'}</p>
        </div>
          <div class="f-ing-indicator">${string} </div>
          </div>
          <div class="f-ing_btn">
            <button type="button" class="f-ing_btn-add" data-open='open-ingridient-description'  data-ingridientname='${strIngredient}'>Learn More</button>
            <button type="button" class="f-ing_btn-rem" data-remove='true' data-ingridientname='${idIngredient}'>Remove</button>
          </div>
        </li>`;
}

function removeFromFavIngr(e) {
  const ingridientItem = e.target.dataset;
  if (ingridientItem?.remove) {
    const card = e.target.closest('.f-ing_items');
    card.remove();
    onAuthStateChanged(auth, user => {
      removeUserData(user.uid, ingridientItem?.ingridientname, 'ingredients');
    });
  }
}
