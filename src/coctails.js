import { writeUserData, removeUserData, auth } from './servise/firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

async function addToFav(e) {
  const btn = e.target;

  if (btn?.dataset.add === 'add-to-fav') {
    const cockteileId = btn.dataset.cocktaileid;
    onAuthStateChanged(auth, user => {
      writeUserData(user?.uid, cockteileId, 'coctailes', {
        cockteileId,
      });
    });
    btn.setAttribute('data-add', 'remove-to-fav');
  } else if (btn?.dataset.add === 'remove-to-fav') {
    const cockteileId = btn.dataset.cocktaileid;
    onAuthStateChanged(auth, user => {
      removeUserData(user?.uid, cockteileId, 'coctailes');
    });
    btn.setAttribute('data-add', 'add-to-fav');
  }
}

export function writeRemovetCoctaileFunction(selector) {
  const favoriteBtn = document.querySelector(selector);

  favoriteBtn?.addEventListener('click', addToFav);
}

// button.setAttribute('data-authorithation', value);

// if (btn.textContent === 'Add to favorite') {
//   btn.textContent = 'Remove from favorite';
// } else {
//   btn.textContent = 'Remove';
// }
// btn.classList.add('btn__svg-fav');
// btn.addEventListener(
//   'click',
//   () => {
//     removeUserData(user?.uid, cockteileId, 'coctailes');
//     if (btn.textContent === 'Remove from favorite') {
//       btn.textContent = 'Add to favorite';
//     } else {
//       btn.textContent = 'Add to';
//     }
//     btn.classList.remove('btn__svg-fav');
//   },
//   { once: true }
// );
