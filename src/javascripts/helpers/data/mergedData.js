import { deleteAuthor, singleAuthor } from './authorData';
import { singleBook, authorBooks, deleteBook } from './bookData';
// import { bookReviews } from './reviewData';

const viewBookDetails = (bookFirebaseKey) => new Promise((resolve, reject) => {
  singleBook(bookFirebaseKey)
    .then((bookObject) => {
      singleAuthor(bookObject.author_id)
        .then((authorObject) => {
          resolve({ author: authorObject, ...bookObject });
        });
    }).catch(reject);
});

// VIEW MY BOOK REVIEWS

// const viewBookReviews = (bookFirebaseKey) => new Promise((resolve, reject) => {
//   singleBook(bookFirebaseKey)
//     .then((bookObject) => {
//       bookReviews(bookObject.firebaseKey)
//         .then((reviewObj) => {
//           resolve({ reviewObj, ...bookObject });
//         });
//     }).catch(reject);
// });

const viewAuthorDetails = (authorFirebaseKey) => new Promise((resolve, reject) => {
  singleAuthor(authorFirebaseKey)
    .then((authorObject) => {
      authorBooks(authorObject.firebaseKey)
        .then((bookObject) => {
          resolve({ bookObject, ...authorObject });
        });
    }).catch(reject);
});

const deleteAuthorBooks = (authorId) => new Promise((resolve, reject) => {
  authorBooks(authorId).then((authorsBookArray) => {
    const deleteBooks = authorsBookArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all([...deleteBooks]).then(() => resolve(deleteAuthor(authorId)));
  }).catch(reject);
});

export {
  viewBookDetails,
  viewAuthorDetails,
  deleteAuthorBooks,
  // viewBookReviews
};
