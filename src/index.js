import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const inpytEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inpytEl.addEventListener('input', debounce(onFormInputClick, DEBOUNCE_DELAY));

function onFormInputClick(e) {
  e.preventDefault();
  const inputSearch = e.target.value.trim();

  if (inputSearch === '') {
    clearAll();
    return;
  }

  fetchCountries(inputSearch)
    .then(arr => {
      if (arr.length > 10) {
        clearAll();
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }

      if (arr.length >= 2 && arr.length <= 10) {
        createCountryList(arr);
        clearInfo();
        return;
      } else {
        createCountryList(arr);
        createCountryCard(arr);
        const countryName = document.querySelector('.country-list__title');
        countryName.classList.add('country-list__title-card');
      }
    })
    .catch(error => {
      clearAll();
      console.log(error);
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function createCountryList(arr) {
  const createElements = arr
    .map(el => {
      return `<li class = 'country-list__item'>
                  <img class = 'country-list__image' src = '${el.flags.svg}' alt='flag'>
                  <h1 class = 'country-list__title'>${el.name.official}</h1>
                </li>`;
    })
    .join('');

  countryListEl.innerHTML = createElements;
}

function createCountryCard(arr) {
  const { capital, population, languages } = arr[0];
  const value = Object.values(languages);

  const createCard = `<p><span class = 'country-text'>Capital: </span>${capital}</p>
  <p><span class = 'country-text'>Population: </span>${population}</p>
  <p><span class = 'country-text'>Languages: </span>${value}</p>`;

  countryInfoEl.innerHTML = createCard;
}

function clearInfo() {
  countryInfoEl.innerHTML = '';
}

function clearAll() {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
}
