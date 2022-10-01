import axios from 'axios';
import { removeUserIngridients, auth } from '../servise/firebase';
import { onAuthStateChanged } from 'firebase/auth';

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
    console.log('responseData', responseData);
    const htmlStringMarkup = responseData
      .map(obg => getHtmlString(obg))
      .join('');
    if (favIngridientsList) {
      favIngridientsList.innerHTML = htmlStringMarkup;
      //   removeFromFav();
    }
    // openCoctaileInfoModal('.gallery__btn-load-more');
  }
}

function getHtmlString({ strIngredient, strType }) {
  preloader?.classList.add('visually-hidden');
  return ` <div class="f-ing_items">
          <h3 class="f-ing_subtitle">${strIngredient}</h3>
          <p class="f-ing_text">${strType}</p>
          <div class="f-ing_btn">
            <button type="button" class="f-ing_btn-add"  data-ingridientname='${strIngredient}'>Learn More</button>
            <button type="button" class="f-ing_btn-rem" data-ingridientname='${strIngredient}'>Remove</button>
          </div>
        </div>`;
}

function removeFromFav() {
  const favoriteBtn = document.querySelectorAll('[data-cocktaileId]');
  favoriteBtn.forEach(btn =>
    btn.addEventListener(
      'click',
      e => {
        const cocktaileid = e.target.dataset.cocktaileid;
        const card = e.target.closest('.gallery__card');
        card.remove();
        onAuthStateChanged(auth, user => {
          console.log('user.uid', user.uid);
          removeUserIngridients(user.uid, cocktaileid);
        });
      },
      {
        once: true,
      }
    )
  );
}
