import clearDom from '../../helpers/clearDom';

const reviewBookForm = (obj = {}) => {
  clearDom();
  document.querySelector('#form-container').innerHTML = `
    <h2 id= "bookTitle"> ${obj.title} </h2>
    <select id="book-rating" class="form-select" aria-label="Default select example">
        <option selected>Give the book a rating</option>
        <option value="★">★</option>
        <option value="★ ★">★ ★</option>
        <option value="★ ★ ★">★ ★ ★</option>
        <option value="★ ★ ★ ★s">★ ★ ★ ★</option>
        <option value="★ ★ ★ ★ ★">★ ★ ★ ★ ★</option>
    </select>
    <div class="mb-3">
        <label for="review-text" class="form-label">Write your review here!</label>
        <textarea class="form-control" id="review-text" rows="3"></textarea>
    </div>
    <button type="submit" id="submit-review--${obj.firebaseKey}" class="btn btn-primary">Submit Review</button>
    `;
};

export default reviewBookForm;
