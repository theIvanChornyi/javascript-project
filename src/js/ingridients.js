import { writeUserData, removeUserData, auth } from '../servise/firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

async function addToFav(e) {
  const btn = e.target;
  if (btn?.dataset.ingr === 'add-to-fav') {
    const ingredientName = btn.dataset.ingridientname;
    onAuthStateChanged(auth, user => {
      writeUserData(user?.uid, ingredientName, 'ingredients', {
        ingredientName,
      });
    });
    btn.setAttribute('data-ingr', 'remove-to-fav');
  } else if (btn?.dataset.ingr === 'remove-to-fav') {
    const ingredientName = btn.dataset.ingridientname;
    onAuthStateChanged(auth, user => {
      removeUserData(user?.uid, ingredientName, 'ingredients', ingredientName);
    });
    btn.setAttribute('data-ingr', 'add-to-fav');
  }
}
export function writeRemovetIngridientFunction(selector) {
  const favoriteBtn = document.querySelector(selector);

  favoriteBtn?.addEventListener('click', addToFav);
}
