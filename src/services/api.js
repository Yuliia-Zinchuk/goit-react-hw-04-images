import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '29884579-b0e414ddacb31e478cf055115';

export const fetchImagesWithQuery = async (query, page) => {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      q: query,
      page: page,
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
  return response;
};
