import axios from 'axios';
import firebaseConfig from '../../../api/apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getQuotes = () => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/quotes.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const createQuote = (quoteObj) => new Promise((resolve, reject) => {
  axios
    .post(`${dbUrl}/quotes.json`, quoteObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/quotes/${response.data.name}.json`, body);
    })
    .then(() => {
      getQuotes().then(resolve);
    })
    .catch(reject);
});

const getAuthorQuotes = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/quotes.json?orderBy="author_id"&equalTo="${firebaseKey}"`)
    .then((response) => (resolve(Object.values(response.data))))
    .catch(reject);
});

const renderQuotes = (quoteKey) => {
  const randomQuote = quoteKey[Math.floor(Math.random() * quoteKey.length)];
  document.querySelector('#quotes').innerHTML = `
    <p> ${randomQuote.quotetext}</p>
    `;
};

const quotesToPage = (quoteKey) => new Promise((resolve, reject) => {
  getAuthorQuotes(quoteKey)
    .then((response) => resolve(renderQuotes(response)))
    .catch(reject);
});

export { createQuote, getAuthorQuotes, quotesToPage };
