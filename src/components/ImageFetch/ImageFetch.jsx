import axios from 'axios';

export const imagesFetch = async (query, page) => {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '39429562-362aa611c83bf0adbf53209b3';
  const url = `${BASE_URL}?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
