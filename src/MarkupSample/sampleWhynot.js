export function markupCountry(flag, randomItem) {
  return `<div class="result-wine">
    <img src=${flag} alt="flag" class="flag-img" />
     <p class='wine-name' >${randomItem}</p>
     </div>`;
}
