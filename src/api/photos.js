import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '40911679-bf6a368efc1c80da5a9fe2bbd',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const getAllPhotos = () => {
  return instance.get(
    '/?page=1&key=40911679-bf6a368efc1c80da5a9fe2bbd&image_type=photo&orientation=horizontal&per_page=16'
  );
};

export const getSearchPhotos = (q, page = 1) => {
  return instance.get('/', {
    params: {
      q,
      page,
    },
  });
};
