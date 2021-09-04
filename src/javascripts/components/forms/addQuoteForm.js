import clearDom from '../../helpers/clearDom';

const addQuoteForm = (obj) => {
  clearDom();
  document.querySelector('#form-container').innerHTML = `
  <h1> Add a quote for ${obj.first_name} ${obj.last_name} </h1>
    <div class="mb-3">
        <label for="quote-text" class="form-label">Write your quote here!</label>
        <textarea class="form-control" id="quote-text" rows="3"></textarea>
    </div>
    <button type="submit" id="submit-quote--${obj.firebaseKey}" class="btn btn-primary">Submit Quote</button>
    `;
};

export default addQuoteForm;
