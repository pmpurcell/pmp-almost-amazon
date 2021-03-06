import { showAuthors } from '../components/authors';
import { showBooks } from '../components/books';
import addAuthorForm from '../components/forms/addAuthorForm';
import addBookForm from '../components/forms/addBookForm';
import addQuoteForm from '../components/forms/addQuoteForm';
import reviewBookForm from '../components/forms/reviewBookForm';
import viewAuthor from '../components/viewAuthor';
import viewBook from '../components/viewBook';
import {
  createAuthor,
  singleAuthor,
  updateAuthor
} from '../helpers/data/authorData';
import {
  createBook,
  deleteBook,
  singleBook,
  updateBook
} from '../helpers/data/bookData';
import {
  viewBookDetails,
  viewAuthorDetails,
  deleteAuthorBooks,
  // viewBookReviews
} from '../helpers/data/mergedData';
import { createQuote } from '../helpers/data/quoteData';
import { createReview } from '../helpers/data/reviewData';

const domEvents = (uid) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      if (window.confirm('Want to delete?')) {
        console.warn('CLICKED DELETE BOOK', e.target.id);
        const [, firebaseKey] = e.target.id.split('--');

        deleteBook(firebaseKey, uid).then((books) => showBooks(books));
      }
    }

    // CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      console.warn('CLICKED ADD BOOK BUTTON', e.target.id);
      addBookForm(uid);
    }

    // CLICK EVENT FOR SUBMITTING FORM FOR ADDING A BOOK
    if (e.target.id.includes('submit-book')) {
      e.preventDefault();
      console.warn('CLICKED SUBMIT BOOK', e.target.id);
      const newBook = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        sale: document.querySelector('#sale').checked,
        author_id: document.querySelector('#author').value,
        user_id: uid
      };
      console.warn(newBook);
      createBook(newBook).then((books) => showBooks(books));
    }

    // CLICK EVENT FOR EDITING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      console.warn('CLICKED EDIT BOOK', e.target.id);
      const [, id] = e.target.id.split('--');
      singleBook(id).then((bookObj) => addBookForm(uid, bookObj));
    }

    // SUBMITTING AN EDIT

    if (e.target.id.includes('update-book')) {
      e.preventDefault();
      const [, firebaseKey] = e.target.id.split('--');
      const bookObject = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        sale: document.querySelector('#sale').checked,
        author_id: document.querySelector('#author').value,
        description: document.querySelector('#description-text').value,
        firebaseKey,
        user_id: uid
      };
      updateBook(bookObject).then(showBooks);
    }

    // REVIEW A BOOK
    if (e.target.id.includes('review-book')) {
      console.warn('CLICKED REVIEW BOOK');
      const [, firebaseKey] = e.target.id.split('--');
      singleBook(firebaseKey).then((bookObject) => reviewBookForm(bookObject));
    }

    // SUBMIT REVIEW
    if (e.target.id.includes('submit-review')) {
      console.warn('REVIEW SUBMITTED');
      const [, firebaseKey] = e.target.id.split('--');
      const reviewData = {
        rating: document.querySelector('#book-rating').value,
        reviewtext: document.querySelector('#review-text').value,
        book_id: firebaseKey
      };
      console.warn(reviewData);
      createReview(reviewData);
      viewBookDetails(firebaseKey).then(viewBook);
    }

    // VIEW DETAILS ON BOOK
    if (e.target.id.includes('view-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      console.warn(firebaseKey);
      viewBookDetails(firebaseKey).then(viewBook);
    }

    // ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author')) {
      if (window.confirm('Want to delete?')) {
        console.warn('CLICKED DELETE AUTHOR', e.target.id);
        const [, firebaseKey] = e.target.id.split('--');

        deleteAuthorBooks(firebaseKey, uid).then((authors) => showAuthors(authors));
      }
    }
    // ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      addAuthorForm();
    }
    // ADD CLICK EVENT FOR SUBMITTING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('submit-author')) {
      e.preventDefault();
      console.warn('CLICKED SUBMIT AUTHOR', e.target.id);
      const newAuthor = {
        first_name: document.querySelector('#firstName').value,
        last_name: document.querySelector('#lastName').value,
        email: document.querySelector('#authorEmail').value,
        favorite: document.querySelector('#favorite').checked,
        user_id: uid
      };
      console.warn(newAuthor);
      createAuthor(newAuthor).then((authors) => showAuthors(authors));
    }
    // ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('edit-author-btn')) {
      console.warn('CLICKED EDIT AUTHOR', e.target.id);
      const [, firebaseKey] = e.target.id.split('--');
      singleAuthor(firebaseKey).then((authorObj) => addAuthorForm(authorObj));
    }
    // VIEW DETAILS ON AUTHOR
    if (e.target.id.includes('view-author-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      viewAuthorDetails(firebaseKey).then(viewAuthor);
    }
    // ADDING A QUOTE FOR AN AUTHOR
    if (e.target.id.includes('add-quote')) {
      console.warn('ADDING AUTHOR QUOTE', e.target.id);
      const [, firebaseKey] = e.target.id.split('--');
      singleAuthor(firebaseKey).then((authorObject) => addQuoteForm(authorObject));
    }
    // SUBMITTING A NEW QUOTE
    if (e.target.id.includes('submit-quote')) {
      const [, firebaseKey] = e.target.id.split('--');
      const quoteData = {
        quotetext: document.querySelector('#quote-text').value,
        author_id: firebaseKey
      };
      createQuote(quoteData);
      console.warn(quoteData);
      viewAuthorDetails(firebaseKey).then(viewAuthor);
    }
    //  EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      e.preventDefault();
      console.warn('AUTHOR UPDATED');
      const [, firebaseKey] = e.target.id.split('--');
      const authorObj = {
        first_name: document.querySelector('#firstName').value,
        last_name: document.querySelector('#lastName').value,
        email: document.querySelector('#authorEmail').value,
        favorite: document.querySelector('#favorite').checked,
        firebaseKey,
        user_id: uid
      };

      updateAuthor(authorObj).then(showAuthors);
    }
  });
};

export default domEvents;
