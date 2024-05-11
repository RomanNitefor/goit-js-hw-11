import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { listPictures } from './js/render-functions';
import { searchPictures } from './js/pixabay-api';

const form = document.querySelector('.form');
const input = document.querySelector('input[name="text"]');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

form.addEventListener('submit', event => {
  event.preventDefault();
  const searchTerm = input.value.trim();
  if (searchTerm) {
    loader.style.display = 'block';
    gallery.innerHTML = '';
    searchPictures(searchTerm)
      .then(pictures => {
        if (pictures.hits.length === 0) {
          iziToast.info({
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            position: 'center',
          });
        } else {
          listPictures(gallery, pictures, lightbox);
        }
      })
      .catch(error => {
        console.log(error);
        iziToast.error({
          message: 'Sorry, there was an error processing your request.',
          position: 'center',
        });
      })
      .finally(() => {
        loader.style.display = 'none';
        event.target.reset();
      });
  } else {
    event.target.reset();
    iziToast.error({
      message: 'Please enter the data.',
      position: 'center',
    });
    gallery.innerHTML = '';
  }
});

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 200,
});
