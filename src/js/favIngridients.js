import { removeUserData, auth } from '../servise/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { openIngridientInfoModal } from './modalComponents';
import { getInfoAboutIngridient } from '../servise/apiData';
import { sampleFavIngr, preloader } from '../MarkupSample/sampleFavIngr';

const favIngridientsList = document.querySelector('.f-ing_blocks');

export async function parseFavIngridients(array) {
  try {
    const getIngridientsData = await array.map(id =>
      getInfoAboutIngridient(id)
    );
    preloader?.classList.remove('visually-hidden');
    const response = await Promise.all(getIngridientsData);
    if (response.length > 0) {
      const responseData = await response
        .filter(ingr => ingr.data.ingredients)
        .map(obj => obj.data.ingredients[0]);
      const htmlStringMarkup = responseData
        .map(obg => sampleFavIngr(obg))
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
  } catch (error) {
    console.log('error', error);
  }
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
