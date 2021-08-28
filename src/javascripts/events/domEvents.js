import { showAuthors } from '../components/authors';
import { showBooks } from '../components/books';
import addAuthorForm from '../components/forms/addAuthorForm';
import addBookForm from '../components/forms/addBookForm';
import { createAuthor, deleteAuthor } from '../helpers/data/authorData';
import {
  createBook,
  deleteBook,
  singleBook,
  updateBook
} from '../helpers/data/bookData';

const domEvents = () => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      if (window.confirm('Want to delete?')) {
        console.warn('CLICKED DELETE BOOK', e.target.id);
        const [, id] = e.target.id.split('--');

        deleteBook(id).then((books) => showBooks(books));
      }
    }

    // CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      console.warn('CLICKED ADD BOOK BUTTON', e.target.id);
      addBookForm();
    }

    // CLICK EVENT FOR SUBMITTING FORM FOR ADDING A BOOK
    if (e.target.id.includes('submit-book')) {
      e.preventDefault();
      console.warn('CLICKED SUBMIT BOOK', e.target.id);
      const newBook = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: Number(document.querySelector('#price').value),
        sale: document.querySelector('#sale').checked,
        author_id: document.querySelector('#author').value
      };
      console.warn(newBook);
      createBook(newBook).then((books) => showBooks(books));
    }

    // CLICK EVENT FOR EDITING(Modal) A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      console.warn('CLICKED EDIT BOOK', e.target.id);
      const [, id] = e.target.id.split('--');
      singleBook(id).then((bookObj) => addBookForm(bookObj));
    }

    // EDITING A BOOK

    if (e.target.id.includes('update-book')) {
      e.preventDefault();
      const [, firebaseKey] = e.target.id.split('--');
      const bookObject = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price'),
        sale: document.querySelector('#sale').checked,
        author_id: document.querySelector('#author').value,
        firebaseKey
      };
      updateBook(bookObject).then(showBooks);
    }

    // ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author')) {
      if (window.confirm('Want to delete?')) {
        console.warn('CLICKED DELETE AUTHOR', e.target.id);
        const [, id] = e.target.id.split('--');

        deleteAuthor(id).then((authors) => showAuthors(authors));
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
        email: document.querySelector('#authorEmail').value
      };
      console.warn(newAuthor);
      createAuthor(newAuthor).then((authors) => showAuthors(authors));
    }
    // ADD CLICK EVENT FOR EDITING AN AUTHOR
  });
};

export default domEvents;
