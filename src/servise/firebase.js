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

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase();

export const signUp = () => {
  signInWithPopup(auth, provider)
    .then(result => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

export const quitAcc = () => {
  signOut(auth)
    .then(() => {})
    .catch(error => {});
};

onAuthStateChanged(auth, user => {
  console.log('user.uid', user.uid);
  onValue(ref(database, user.uid + '/coctailes'), snapshot => {
    const data = snapshot.val();
    console.log('data', data);
    if (data) {
      const favoriteCoctailesRawArr = Object.values(data);
      const favoriteCoctailesArr = favoriteCoctailesRawArr.map(
        id => id.cockteileId
      );
      parseFavCoctails(favoriteCoctailesArr);
    }
  });

  userIn('enable');
  if (!user) {
    userIn('disable');
  }
});

export function writeUserCoctaile(userId, cockteileId, data = {}) {
  set(ref(database, `${userId}/coctailes/` + cockteileId), data);
}
export function removeUserCoctaile(userId, cockteileId, data = {}) {
  remove(ref(database, `${userId}/coctailes/` + cockteileId), data);
}

export function writeUseringridients(data = {}) {
  set(ref(database, 'ingridients'), data);
}
