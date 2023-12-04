import axios from 'axios';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selector = document.querySelector('.breed-select');
const placeForCats = document.querySelector('.cat-info');
const body = document.body;
const loader = document.querySelector('.loader');
const errorSpan = document.querySelector('.error');
errorSpan.textContent = '';
loader.textContent = '';
loader.style.display = 'none';
loader.style.scale = '1';
placeForCats.style.width = '100px';
placeForCats.style.border = '5px dashed red';

fetchBreeds()
  .then(data => {
    const markup = data.map(
      breed => `<option value = "${breed.id}">${breed.name}</option>`
    );
    selector.innerHTML = markup;
  })
  .catch(error => {
    Notiflix.Report.failure(
      'Error',
      'Oops! Something went wrong! Try reloading the page!'
    );
  });

selector.addEventListener('change', event => {
  const breedID = event.target.value;
  placeForCats.innerHTML = '';
  loader.style.display = 'block';
  fetchCatByBreed(breedID)
    .then(cats => {
      const html = cats.map(cat => {
        return `<img width="600" height="400" src="${cats[0].url}" class="cat-img"></img><h2 class="cat-name">${cats[0].breeds[0].name}</h2><p class=""description">${cats[0].breeds[0].description}</p>`;
      });
      placeForCats.innerHTML = html.join('');
    })
    .finally(() => {
      loader.style.display = 'none';
    });
});

body.style.backgroundColor = 'lightgrey';
