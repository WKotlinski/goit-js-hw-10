import axios from 'axios';

const selector = document.querySelector('.breed-select');
const placeForCats = document.querySelector('.cat-info');
const body = document.body;

axios.defaults.headers.common['x-api-key'] =
  'live_M2UMVGz6TcRyTntJu0JrQf4YGt8mUG96gdT00mgawOxrRIM3CyRbLs4IR1fNiq4U';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return axios
    .get('/breeds')
    .then(({ data }) => data)
    .catch(error => {
      console.error(`Error ${error}`);
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
  fetchCatByBreed(breedID).then(cats => {
    const html = cats.map(cat => {
      return `<img src= "${cat.url}" width = "500"/>`;
    });
    html = placeForCats.innerHTML = html.join('');
  });
});

// body.style.backgroundColor = 'red';
