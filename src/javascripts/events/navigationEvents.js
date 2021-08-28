import { showAuthors } from '../components/authors';
import signOut from '../helpers/auth/signOut';
import { getAuthors, favoriteAuthors } from '../helpers/data/authorData';
import { booksOnSale, getBooks } from '../helpers/data/bookData';
import { showBooks } from '../components/books';

// navigation events
const navigationEvents = () => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  // BOOKS ON SALE
  document.querySelector('#sale-books').addEventListener('click', () => {
    console.warn('Clicked Sale Books');
    booksOnSale().then((books) => showBooks(books));
  });

  // ALL BOOKS
  document.querySelector('#all-books').addEventListener('click', () => {
    console.warn('All Books');
    getBooks().then((books) => showBooks(books));
  });

  // SEARCH
  document.querySelector('#search').addEventListener('keyup', (e) => {
    const searchValue = document.querySelector('#search').value.toLowerCase();
    console.warn(searchValue);

    // WHEN THE USER PRESSES ENTER, MAKE THE API CALL AND CLEAR THE INPUT
    if (e.keyCode === 13) {
      // MAKE A CALL TO THE API TO FILTER ON THE BOOKS
      // IF THE SEARCH DOESN'T RETURN ANYTHING, SHOW THE EMPTY STORE
      // OTHERWISE SHOW THE STORE

      document.querySelector('#search').value = '';
    }
  });

  document.querySelector('#authors').addEventListener('click', () => {
    getAuthors().then((authors) => showAuthors(authors));
  });

  document.querySelector('#favoriteAuthors').addEventListener('click', () => {
    favoriteAuthors().then((authors) => showAuthors(authors));
  });

  // FIXME: STUDENTS Create an event listener for the Authors
  // 1. When a user clicks the authors link, make a call to firebase to get all authors
  // 2. Convert the response to an array because that is what the makeAuthors function is expecting
  // 3. If the array is empty because there are no authors, make sure to use the emptyAuthor function
};

export default navigationEvents;
