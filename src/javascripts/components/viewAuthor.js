import clearDom from '../helpers/clearDom';
import { quotesToPage } from '../helpers/data/quoteData';

const viewAuthor = (obj) => {
  clearDom();
  document.querySelector('#view').innerHTML += `
    <div class="mt-5 d-flex flex-wrap">
     <div class="d-flex flex-column">
       <img src=${obj.image} alt=${obj.first_name} ${obj.last_name} style="width: 300px;">
       <div class="mt-5">
         <i id="edit-book-btn--${obj.firebaseKey}" class="fas fa-edit btn btn-info"></i>
         <i id="delete-book--${obj.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
         <i id="add-quote--${obj.firebaseKey}" class="btn btn-dark fas fa-comment-alt"></i>
       </div>
     </div>
     <div id="quotes"></div>
     <div class="text-white ms-5 details">
       <h5>${obj.first_name} ${obj.last_name}</h5>
       <p>${obj.email || ''}</p>
       <hr>
       <div id="author-books"></div>   
        </div>
      </div>`;

  obj.bookObject.forEach((item) => {
    document.querySelector('#author-books').innerHTML += `
          <div id='authorBookCard'>
            <h6>${item.title}</h6>
            <img src=${item.image} alt=${item.title} style="width: 150px;">
            <i class="btn btn-success fas fa-eye" id="view-book-btn--${item.firebaseKey}"></i>
            <i id="edit-book-btn--${item.firebaseKey}" class="fas fa-edit btn btn-info"></i>
            <i id="delete-book--${item.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
          </div>
          `;
  });

  quotesToPage(obj.firebaseKey);
};

export default viewAuthor;
