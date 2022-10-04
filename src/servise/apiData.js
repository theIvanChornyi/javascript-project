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

// IngridientingridientId
// www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=552

// Coctaile details
// www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007

// Ingridient by name
// www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka

// Coctaile by name
// www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita

// Coctaile by letter
// www.thecocktaildb.com/api/json/v1/1/search.php?f=a
