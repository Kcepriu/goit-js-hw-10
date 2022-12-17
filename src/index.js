import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import FetchCountries from './js/fetchCountries';
import TemplateHTML from './js/templateHTML';
const _ = require('lodash');

const DEBOUNCE_DELAY = 300;
const TEXTS = {
  text_failure: 'Oops, there is no country with that name',
  text_error_connect: 'Error connect to server',
  text_info: 'Too many matches found. Please enter a more specific name.',
};

const fetchCountries = new FetchCountries();
const templateHTML = new TemplateHTML();

const refs = {
  inputCountry: document.querySelector('#search-box'),
  listCountries: document.querySelector('.country-list'),
  infoCoutry: document.querySelector('.country-info'),
};

addEvetns();

// * EVENTS
function addEvetns() {
  refs.inputCountry.addEventListener(
    'keydown',
    _.debounce(finesetWriteText, DEBOUNCE_DELAY)
  );
}

function finesetWriteText() {
  const nameCountry = getTextInputCountry();

  if (nameCountry === '') {
    //Якщо пусте поле, то очистити Вивід країн
    resetFieldsInfoCountry();
    //Забудемо останній пошук
    fetchCountries.nameLastFindCountry = '';
    return;
  } else if (nameCountry === fetchCountries.nameLastFindCountry) {
    //Якщо поле не змінилося (додали пробіл чи тикнули якусь службову кнопку) то нічого не рорбити
    return;
  }
  //Інакше запустити пошук країни
  resetFieldsInfoCountry();
  startFindCountry(nameCountry);
}

// *  Field this window
function getTextInputCountry() {
  return refs.inputCountry.value.trim();
}

function resetFieldsInfoCountry() {
  //очистити Вивід країн
  refs.listCountries.innerHTML = '';
  refs.infoCoutry.innerHTML = '';
}

function showInformationOneCountry(data) {
  refs.infoCoutry.innerHTML = templateHTML.getHtmlTextCountry(data);
}

function showListCountry(arrayCountries) {
  refs.listCountries.innerHTML =
    templateHTML.getHtmlTextItemsListCountry(arrayCountries);
}

// * NOTIFICATION
function showFailure(message) {
  Notify.failure(message);
}

function showInfo(message) {
  Notify.info(message);
}

// * FIND COUNTRY
function startFindCountry(nameCountry) {
  fetchCountries
    .findCountry(nameCountry)
    .then(data => {
      fetchCountries.nameLastFindCountry = nameCountry;
      showInformation(data);
    })
    .catch(showError);
}

function showInformation(data) {
  if (data.length > 10) showInfo(TEXTS.text_info);
  else if (data.length === 1) showInformationOneCountry(data[0]);
  else showListCountry(data);
}

function showError(error) {
  if (error === fetchCountries.ERROR_NOT_FOUND) showFailure(TEXTS.text_failure);
  else showFailure(TEXTS.text_error_connect);
}
