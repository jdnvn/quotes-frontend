import axios from 'axios';
import { baseUrl } from '../constants';

export const myBooks = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/books`).then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  })
};

export const newBook = (params) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}/books`, params).then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  })
};

export const updateBook = (params) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${baseUrl}/books/${params.id}`, params).then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  })
};

export const deleteBook = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${baseUrl}/books/${id}`).then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  })
};
