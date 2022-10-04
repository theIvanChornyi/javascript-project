import { removeUserData, auth } from '../servise/firebase';
import { openCoctaileInfoModal } from './modalCoctails';
import { onAuthStateChanged } from 'firebase/auth';
import { getInfoAboutCoctail } from '../servise/apiData';

const favCoctailesList = document.querySelector('.favorite__coctails');

export async function parseFavCoctails(array) {
  try {
    const getCocktailesData = await array.map(id => getInfoAboutCoctail(id));
    const response = await Promise.all(getCocktailesData);
    if (response.length > 0) {
      const responseData = response
        .filter(ingr => ingr.data.drinks)
        .map(obj => obj.data.drinks[0]);
      const htmlStringMarkup = responseData
        .map(obg => getHtmlString(obg))
        .join('');
      if (favCoctailesList) {
        favCoctailesList.innerHTML = htmlStringMarkup;
        if (favCoctailesList?.childElementCount < 1) {
          favCoctailesList?.removeEventListener('click', removeFromFavCoc);
        } else {
          favCoctailesList?.addEventListener('click', removeFromFavCoc);
        }
      }
      openCoctaileInfoModal('.favorite__coctails');
    }
  } catch (error) {
    console.log('error', error);
  }
}

function getHtmlString({ idDrink, strDrinkThumb, strDrink }) {
  return `<li class='gallery__card'>
     <img src=${strDrinkThumb} alt=${strDrink} class='gallery__card-img'>
     <div class='gallery__card_thumb'>
     <h3 class='gallery__card-name'>${strDrink}</h3>
     <div class='btn__box'>
     <button type='button' class='gallery__btn-load-more' data-open='open-modal-description' data-moreid='${idDrink}'>Learn more</button>
    <button type='button' class='gallery__btn-add-to-fav' data-remove='true' data-add='add-to-fav' data-cocktaileId='${idDrink}'>Remove</button>
      </div>
     </div>
     </li>`;
}

function removeFromFavCoc(e) {
  const ingridientItem = e.target.dataset;
  if (ingridientItem?.remove) {
    const card = e.target.closest('.gallery__card');
    card.remove();
    onAuthStateChanged(auth, user => {
      removeUserData(user.uid, ingridientItem?.cocktaileid, 'coctailes');
    });
  }
}
