import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_M2UMVGz6TcRyTntJu0JrQf4YGt8mUG96gdT00mgawOxrRIM3CyRbLs4IR1fNiq4U';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return axios.get('/breeds').then(({ data }) => data);
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`images/search?breed_ids=${breedId}`)
    .then(({ data }) => data);
}
