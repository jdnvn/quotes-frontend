import axios from 'axios';
import { baseUrl } from '../constants';

export const myBooks = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/books`).then((response) => {
        console.log(response);
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  })
};
