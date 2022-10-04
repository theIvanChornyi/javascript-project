import Aze from '../img/flag-azerbaijan.png';
import Ukr from '../img/flag-ukraine.png';
import Geo from '../img/flag-georgia.png';
import Ita from '../img/flag-italy.png';
import Spa from '../img/flag-spain.png';
import Chi from '../img/flag-chile.png';
import { markupCountry } from '../MarkupSample/sampleWhynot';

const whyNotBtnRef = document.querySelector('.btn-why-not');

whyNotBtnRef?.addEventListener('click', () => {
  choosePlace();
});

const choosePlace = () => {
  let myObj, randomItem;
  myObj = {
    'Wine of Azerbaijan': Aze,
    'Wine of Ukraine': Ukr,
    'Wine of Georgia': Geo,
    'Wine of Italy': Ita,
    'Wine of Spain': Spa,
    'Wine of Chile': Chi,
  };

  let flag;
  randomItem = pickRandom(myObj);

  if (randomItem === 'Wine of Azerbaijan') {
    flag = Aze;
  } else if (randomItem === 'Wine of Ukraine') {
    flag = Ukr;
  } else if (randomItem === 'Wine of Georgia') {
    flag = Geo;
  } else if (randomItem === 'Wine of Italy') {
    flag = Ita;
  } else if (randomItem === 'Wine of Spain') {
    flag = Spa;
  } else if (randomItem === 'Wine of Chile') {
    flag = Chi;
  }

  const kafe = document.getElementById('kafe');
  if (kafe) {
    kafe.innerHTML = markupCountry(flag, randomItem);
  }
};

function pickRandom(obj) {
  let result;
  let count = 0;
  for (let prop in obj) {
    if (Math.random() < 1 / ++count) {
      result = prop;
    }
  }
  return result;
}

choosePlace();
