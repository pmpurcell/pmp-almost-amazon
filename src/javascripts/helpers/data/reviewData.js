import axios from 'axios';
import firebaseConfig from '../../../api/apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getReviews = () => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/reviews.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const createReview = (reviewObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/reviews.json`, reviewObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/reviews/${response.data.name}.json`, body);
    })
    .then(() => {
      getReviews().then(resolve);
    })
    .catch((error) => reject(error));
});

const getBookReviews = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/reviews.json?orderBy="book_id"&equalTo="${firebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const renderBookReviews = (bookKey) => {
  bookKey.forEach((element) => {
    document.querySelector('#bookReviews').innerHTML += `
            <div id="review-card">
          <p>${element.rating}</p>
          <p>${element.reviewtext}</p>
            <div>
            `;
  });
};

const reviewsToPage = (bookKey) => new Promise((resolve, reject) => {
  getBookReviews(bookKey)
    .then((response) => resolve(renderBookReviews(response)))
    .catch(reject);
});

export {
  createReview,
  getBookReviews,
  renderBookReviews,
  reviewsToPage
};
