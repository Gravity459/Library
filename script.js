
// the global list of all the current books in the Library
let myLibrary = [];

// counter to assign all books with a new ID
let idCounter = 0;

// constructor function for the book objects
function Book(title, author, totalPages, status) {
    this.title = title
    this.author = author
    this.totalPages = totalPages
    this.status = status

    addBookToLibrary(this);
}

// adding the new book to the global list
function addBookToLibrary(newObj) {
  myLibrary.push(newObj);
}

// to display the form when a new book is to be added
function showForm() {
  const form = document.querySelector('.form-group');
  form.style.display = 'flex';
}

// hide the form when the book is added
function closeForm() {

  const fullForm = document.getElementById('form-content');
  console.log(fullForm);

  fullForm.reset();
  
  const form = document.querySelector('.form-group');
  form.style.display = 'none';
}

// to create a new tile for every book
function createTile(obj) {
  
  // for selecting the whole tile portion 
  const tileList = document.querySelector('.tile-portion');
  
  // for the new tile
  const newTile = document.createElement('div');
  newTile.classList.add('tile');
  idCounter++;
  newTile.id = `tile${idCounter}`;

  // for the tile-content
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('tile-content');
  
  const h31 = document.createElement('h3');
  h31.classList.add('padded');
  h31.innerHTML = `Title: <span>${obj.title}</span>`;

  const h32 = document.createElement('h3');
  h32.classList.add('padded');
  h32.innerHTML = `Author: <span>${obj.author}</span>`;

  const h33 = document.createElement('h3');
  h33.classList.add('padded');
  h33.innerHTML = `Pages Read: <span>${obj.totalPages}</span>`;

  contentDiv.appendChild(h31);
  contentDiv.appendChild(h32);
  contentDiv.appendChild(h33);

  newTile.appendChild(contentDiv);

  // for the tile-div
  const tileDiv = document.createElement('div');
  tileDiv.classList.add('tile-div');
  
  // for the status button
  const statusBtn = document.createElement('button');
  statusBtn.classList.add('tile-btn');
  statusBtn.textContent = obj.status;
  
  // for the remove button
  const removeBtn = document.createElement('button');
  removeBtn.classList.add('tile-btn');
  removeBtn.textContent = 'Remove';
  removeBtn.id = idCounter;

  removeBtn.addEventListener('click', e => removeBook(e));

  statusBtn.addEventListener('click', e => changeStatus(e));

  tileDiv.appendChild(statusBtn);
  tileDiv.appendChild(removeBtn);
  
  newTile.appendChild(tileDiv);
  
  tileList.appendChild(newTile);
  
}

function addNewBook(e){
  const bookTitle = document.querySelector('#bookName').value;
  const authorName = document.querySelector('#authorName').value;
  const pagesTotal = document.querySelector('#pagesTotal').value;
  const statusBook = document.querySelector('input[type="checkbox"]');
  let status = '';

  if(statusBook.checked)
  {
    status = 'Read';
  }
  else  
  {
    status = 'Not Read';
  }

  if (pagesTotal < 1)
  {
    alert('Must add the total pages');
    return;
  }

  if( authorName == '')
  {
    alert('Author Name cannot be empty');
    return;
  }

  if( bookTitle == '')
  {
    alert('Book Title cannot be empty');
    return;
  }

  const newObj = new Book(bookTitle, authorName, pagesTotal, status);
  createTile(newObj);
  closeForm();
}

function removeBook(e)
{
  console.log(e.target.id);
  const tileToRemove = document.querySelector(`#tile${e.target.id}`);
  console.log(tileToRemove);

  tileToRemove.parentNode.removeChild(tileToRemove);
}

function changeStatus(e)
{

  if(e.target.textContent == 'Read')
  {
    e.target.textContent = 'Not Read';
  }
  else
  {
    e.target.textContent = 'Read';
  }
}

function main() {
  
  const show = document.querySelector('#newbook');
  show.addEventListener('click', showForm);
  
  const submitForm = document.querySelector('#submit-btn');
  submitForm.addEventListener('click', addNewBook);

  const close = document.querySelector('.close-btn');
  close.addEventListener('click', closeForm);

}

// for executing the whole code
main();