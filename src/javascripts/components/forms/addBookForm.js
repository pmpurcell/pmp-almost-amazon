import clearDom from '../../helpers/clearDom';
import selectAuthor from './selectAuthor';

const addBookForm = (userId, obj = {}) => {
  clearDom();
  document.querySelector('#form-container').innerHTML = `
    <form id="submit-book-form" class="mb-4">
      <div class="form-group">
        <label for="title">Book Title</label>
        <input type="text" class="form-control" id="title" aria-describedby="bookTitle" placeholder="Enter Book Title" value = "${obj.title || ''}" required>
      </div>
      <div class="form-group">
        <label for="image">Image URL</label>
        <input type="url" class="form-control" id="image" placeholder="Image URL" value = "${obj.image || ''}" required>
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input type="text" class="form-control" id="price" placeholder="Book Price" value = "${obj.price || ''}" required>
      </div>
      <div class="form-group" id="select-author">
      </div>
      <div class="mb-3">
      <label for="description-text" class="form-label">Description</label>
      <textarea class="form-control" id="description-text" rows="3"></textarea>
      </div>
      <div class="form-check">
      <input type="checkbox" class="form-check-input" id="sale" value = "${obj.sale ? 'checked' : ''}">
      <label class="form-check-label" for="sale">On Sale?</label>
      </div>
      <button type="submit" id="${obj.firebaseKey ? `update-book--${obj.firebaseKey}` : 'submit-book'}" class="btn btn-primary">Submit Book</button>
    </form>`;

  selectAuthor(userId, `${obj.author_id || ''}`);
};

export default addBookForm;
