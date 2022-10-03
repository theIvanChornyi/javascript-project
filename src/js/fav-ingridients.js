import axios from 'axios';
import { removeUserIngridients, auth } from '../servise/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { openIngridientInfoModal } from './close_modal-components';

const preloader = document.querySelector('.preloader-fav-coc');
const favIngridientsList = document.querySelector('.f-ing_blocks');

export async function parseFavIngridients(array) {
  const getIngridientsData = await array.map(name =>
    axios(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${name}`)
  );
  preloader?.classList.remove('visually-hidden');

  const response = await Promise.all(getIngridientsData);
  if (response.length > 0) {
    const responseData = response.map(obj => obj.data.ingredients[0]);
    const htmlStringMarkup = responseData
      .map(obg => getHtmlString(obg))
      .join('');
    if (favIngridientsList) {
      favIngridientsList.innerHTML = htmlStringMarkup;
    }
    openIngridientInfoModal('.f-ing_blocks');
    const favIngrList = document.querySelector('.f-ing_blocks');
    favIngrList.addEventListener('click', removeFromFavIngr);
    if (favIngrList.childElementCount < 1) {
      favIngrList.removeEventListener('click', removeFromFavIngr);
    } else {
      favIngrList.addEventListener('click', removeFromFavIngr);
    }
    console.log(favIngrList.childElementCount);
  }
}

function getHtmlString({ strIngredient, strType, strABV }) {
  preloader?.classList.add('visually-hidden');
  let string = '';
  if (strABV) {
    string += 'alcohol';
  } else {
    string += 'no__alcohol';
  }
  return `<li class="f-ing_items">
          <h3 class="f-ing_subtitle">${strIngredient}</h3>
          <p class="f-ing_text">${strType}</p>
          <div class="${string} f-ing-indicator"></div>
          <div class="f-ing_btn">
            <button type="button" class="f-ing_btn-add" data-open='open-ingridient-description'  data-ingridientname='${strIngredient}'>Learn More</button>
            <button type="button" class="f-ing_btn-rem" data-remove='true' data-ingridientname='${strIngredient}'>Remove</button>
          </div>
        </li>`;
}

function removeFromFavIngr(e) {
  const ingridientItem = e.target.dataset;
  if (ingridientItem?.remove) {
    console.log(e.target.dataset);
    const card = e.target.closest('.f-ing_items');
    card.remove();
    onAuthStateChanged(auth, user => {
      removeUserIngridients(user.uid, ingridientItem?.ingridientname);
    });
  }
}
