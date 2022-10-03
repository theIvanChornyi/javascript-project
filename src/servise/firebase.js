import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, set, ref, onValue, remove } from 'firebase/database';

import { firebaseConfig } from '../config/firebase-config';
import { userIn } from '../js/authorization-button';
import { parseFavCoctails } from '../js/fav-coctails';
import { parseFavIngridients } from '../js/fav-ingridients';

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase();

export const signUp = () => {
  signInWithPopup(auth, provider);
};

export const quitAcc = () => {
  signOut(auth);
};

onAuthStateChanged(auth, user => {
  getDataArrfromDb(user, '/coctailes', 'cockteileId', parseFavCoctails);
  getDataArrfromDb(user, '/ingridients', 'ingredientName', parseFavIngridients);
  userIn('enable');
  if (!user) {
    userIn('disable');
  }
  // writeUserIngridients(user?.uid, 'Vodka', { ingredientName: 'vodka' });
});

export function writeUserData(userId, cockteileId, way, data = {}) {
  if (userId) {
    set(ref(database, `${userId}/${way}/` + cockteileId), data);
  }
}
export function removeUserData(userId, cockteileId, way, data = {}) {
  if (userId) {
    remove(ref(database, `${userId}/${way}/` + cockteileId), data);
  }
}

// export function writeUserCoctaile(userId, cockteileId, data = {}) {
//   if (userId) {
//     set(ref(database, `${userId}/coctailes/` + cockteileId), data);
//   }
// }
// export function removeUserCoctaile(userId, cockteileId, data = {}) {
//   if (userId) {
//     remove(ref(database, `${userId}/coctailes/` + cockteileId), data);
//   }
// }

// export function writeUserIngridients(userId, ingridientName, data = {}) {
//   if (userId) {
//     set(ref(database, `${userId}/ingridients/` + ingridientName), data);
//   }
// }
// export function removeUserIngridients(userId, ingridientName, data = {}) {
//   if (userId) {
//     remove(ref(database, `${userId}/ingridients/` + ingridientName), data);
//   }
// }

export function getDataArrfromDb(user, way, searchKey, callback) {
  onValue(ref(database, user?.uid + way), snapshot => {
    const data = snapshot.val();
    if (data) {
      const favoriteIngridientsRawArr = Object.values(data);
      const favoditeArr = favoriteIngridientsRawArr.map(id => id[searchKey]);
      callback(favoditeArr);
    }
  });
}
