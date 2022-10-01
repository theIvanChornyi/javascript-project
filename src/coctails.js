import {
  writeUserCoctaile,
  removeUserCoctaile,
  auth,
} from './servise/firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

async function addToFav(e) {
  const btn = e.target;
  const cockteileId = btn.dataset.cocktaileid;
  onAuthStateChanged(auth, user => {
    writeUserCoctaile(user?.uid, cockteileId, { cockteileId });

    if (btn.textContent === 'Add to favorite') {
      btn.textContent = 'Remove from favorite';
    } else {
      btn.textContent = 'Remove';
    }
    btn.classList.add('btn__svg-fav');
    btn.addEventListener(
      'click',
      () => {
        removeUserCoctaile(user?.uid, cockteileId);
        if (btn.textContent === 'Remove from favorite') {
          btn.textContent = 'Add to favorite';
        } else {
          btn.textContent = 'Add to';
        }
        btn.classList.remove('btn__svg-fav');
        btn.addEventListener('click', addToFav, { once: true });
      },
      { once: true }
    );
  });
}

export function wrireRemovetCoctaileFunction(selector) {
  const favoriteBtn = document.querySelectorAll(selector);
  favoriteBtn.forEach(btn =>
    btn.addEventListener('click', addToFav, {
      once: true,
    })
  );
}
