const API_KEY = '43829547-150c89c88df8cf7a92100352d';
const BASE_URL = 'https://pixabay.com/api/';

export const searchPictures = query => {
  const searchParams = new URLSearchParams({
    q: query,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`${BASE_URL}?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};
