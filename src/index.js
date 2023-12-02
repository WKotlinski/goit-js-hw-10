import axios from 'axios';
import Notiflix from 'notiflix';

const selector = document.querySelector('.breed-select');
const placeForCats = document.querySelector('.cat-info');
const body = document.body;
const loader = document.querySelector('.loader');
const errorSpan = document.querySelector('.error');
errorSpan.textContent = '';
loader.textContent = '';
loader.style.display = 'none';

axios.defaults.headers.common['x-api-key'] =
  'live_M2UMVGz6TcRyTntJu0JrQf4YGt8mUG96gdT00mgawOxrRIM3CyRbLs4IR1fNiq4U';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return axios
    .get('/breeds')
    .then(({ data }) => data)
    .catch(error => {
      Notiflix.Report.failure('Error', errorSpan.textContent);
    });
}
fetchBreeds().then(data => {
  const markup = data.map(
    breed => `<option value = "${breed.id}">${breed.name}</option>`
  );
  selector.innerHTML = markup;
});

function fetchCatByBreed(breedId) {
  return axios
    .get(`images/search?breed_ids=${breedId}`)
    .then(({ data }) => data);
}

selector.addEventListener('change', event => {
  const breedID = event.target.value;
  loader.style.display = 'block';
  fetchCatByBreed(breedID)
    .then(cats => {
      const html = cats.map(cat => {
        return `<img class="img" src= "${cat.url}" width = "500"/><h2 class="title">${cat.name}</h2>
        <p class="paragraph">${cat.description}</p>`;
      });
      html = placeForCats.innerHTML = html.join('');
    })
    .finally(() => {
      loader.style.display = 'none';
    });
});

body.style.backgroundColor = 'lightgrey';
