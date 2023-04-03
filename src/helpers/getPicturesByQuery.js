import axios from 'axios';

const END_POINT = 'https://pixabay.com/api/';
const KEY = '18207313-9460c279493d4296cd58108b0';

export const getPicturesByQuery = (query, page) =>
  axios
    .get(END_POINT, {
      params: {
        q: query,
        key: KEY,
        page: page,
        per_page: 12,
      },
    })
    .then(res => {
      if (res.data.hits.length === 0) {
        throw new Error('По вашому запиту нічого не найдено');
      }
      return {
        totalHits: res.data.totalHits,
        galleryItems: [...res.data.hits].map(
          ({ id, largeImageURL, webformatURL, tags }) => {
            return { id, largeImageURL, webformatURL, tags };
          }
        ),
      };
    });
