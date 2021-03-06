// API CALLS FOR AUTHORS
import axios from 'axios';
import firebaseConfig from '../../../api/apiKeys';

const dbUrl = firebaseConfig.databaseURL;

// GET AUTHORS
const getAuthors = (userId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors.json?orderBy="user_id"&equalTo="${userId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

// DELETE AUTHOR
const deleteAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/authors/${firebaseKey}.json`)
    .then(() => {
      getAuthors().then(resolve);
    })
    .catch(reject);
});

// CREATE AUTHOR
const createAuthor = (authorObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/authors.json`, authorObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/authors/${response.data.name}.json`, body)
        .then(() => getAuthors().then((authors) => resolve(authors)));
    }).catch((error) => reject(error));
});

// GET SINGLE AUTHOR
const singleAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

// UPDATE AUTHOR
const updateAuthor = (authorObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/authors/${authorObj.firebaseKey}.json`, authorObj)
    .then(() => getAuthors(authorObj.user_id).then(resolve))
    .catch(reject);
});
// SEARCH AUTHORS
// FAVORITE AUTHORS
const favoriteAuthors = (userId) => new Promise((resolve, reject) => {
  getAuthors(userId)
    .then((userAuthors) => {
      const favAuthors = userAuthors.filter((userAuthor) => (userAuthor.favorite));
      console.warn(favAuthors);
      resolve(favAuthors);
    })
    .catch(reject);
});

export {
  getAuthors,
  createAuthor,
  favoriteAuthors,
  deleteAuthor,
  singleAuthor,
  updateAuthor
};
