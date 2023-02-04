import axios from 'axios';
import { baseUrl } from '../constants';

export const myHighlights = () => {
  return new Promise((resolve, reject) => {
    axios
    .get(`${baseUrl}/highlights`).then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
      reject(error);
    });
  })
};

export const newHighlight = (params) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}/highlights`, params).then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  })
};
