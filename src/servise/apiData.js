import axios from 'axios';

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

export function randomCoctail() {
  return axios.get(`${BASE_URL}random.php`);
}
export function getInfoAboutCoctail(coctaileId) {
  return axios.get(`${BASE_URL}lookup.php?i=${coctaileId}`);
}

export function getInfoAboutIngridient(ingridientId) {
  return axios(`${BASE_URL}lookup.php?iid=${ingridientId}`);
}
export function getInfoAboutIngridientByName(ingridientName) {
  return axios(`${BASE_URL}search.php?i=${ingridientName}`);
}

export function getInfoByLetter(letter) {
  return axios(`${BASE_URL}search.php?f=${letter}`);
}

export function gerInfoByName(nameCoc) {
  return axios(`${BASE_URL}search.php?s=${nameCoc}`);
}
