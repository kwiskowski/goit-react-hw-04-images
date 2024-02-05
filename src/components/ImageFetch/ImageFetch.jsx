import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

export async function imagesFetch(query, page) {
  const options = {
    params: {
      key: '39429562-362aa611c83bf0adbf53209b3',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: page,
      per_page: 12,
    },
  };

  try {
    const response = await axios.get(BASE_URL, options);
    return response.data;
  } catch (error) {}
}
