import clearDom from '../../helpers/clearDom';

const reviewBookForm = (obj) => {
  clearDom();
  document.querySelector('#form-container').innerHTML = `
    <h2 id= "bookTitle"> ${obj.title} </h2>
    <select class="form-select" aria-label="Default select example">
        <option selected>Give the book a rating</option>
        <option value="1">★</option>
        <option value="2">★ ★</option>
        <option value="3">★ ★ ★</option>
        <option value="4">★ ★ ★ ★</option>
        <option value="5">★ ★ ★ ★ ★</option>
    </select>
    <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">Write your review here!</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
    <button type="submit" id="submit-review" class="btn btn-primary">Submit Review</button>
    `;
};

export default reviewBookForm;
