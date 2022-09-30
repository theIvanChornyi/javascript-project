// import axios from 'axios';

// const modalRef = document.querySelector('.description__backdrop');
// const closeRef = document.querySelector('.description__button__close');
// const markupRef = document.querySelector('.markup');

// closeRef.addEventListener('click', () => {
//   modalRef.classList.remove('visually-hidden');
// });

// async function getIngridient() {
//   const request = await axios(
//     'https://www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka'
//   )
//     .catch(function (error) {
//       console.log(error);
//     })
//     .then(({ data: { ingredients } }) => {
//       check(ingredients);
//     });
// }

// getIngridient();

// async function check(element) {
//   const markupString = await marcup(element);
//   console.log('1111', markupString);
//   markupRef.innerHTML = markupString;
// }
// async function marcup(data) {
//   console.log('data', data);
//   return await data
//     .map(({ strIngredient, strDescription, strType, strABV }) => {
//       let string = '';
//       if (strIngredient) {
//         string += `<h2 class="description__title">${strIngredient}</h2>`;
//       }
//       if (strType) {
//         string += `<h3 class="description__category">${strType}</h3>`;
//       }
//       if (strDescription) {
//         string += `<p class="description__characteristic">
//       ${strDescription.substring(0, 404)}
//     </p>`;
//       }
//       if (strType) {
//         string += `<li class="description__list"><span class="description__accent">&#10038</span> Type: ${strType}</li>`;
//       }
//       if (strABV) {
//         string += `<li class="description__list"><span class="description__accent">&#10038</span> Alcohol by volume: ${strABV}</li>`;
//       }
//       // console.log(string);
//       const htmlElem = `${string}`;

//       console.log('htmlElem', htmlElem);
//       return htmlElem;
//     })
//     .join('');
// }

// {
//   /* <ul class="description__item">
//   <li class="description__list">
//     <span class="description__accent">&#10038</span> Country of origin: Italy
//   </li>

//   <li class="description__list">
//     <span class="description__accent">&#10038</span> Flavour: Bitter, spicy and
//     sweet
//   </li>
// </ul>; */
// }
