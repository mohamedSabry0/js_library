const btnAddBook = document.querySelector('.btn-add-book');
const bookForm = document.querySelector('.book-form');
const btnSaveBook = document.querySelector('.btn-save-book');

let myLibrary = [];

class Book {
  constructor(title, author, description, num_of_pages, read) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.num_of_pages = num_of_pages;
    this.read = read;
  }
}

function addBookToLibrary() {

}


btnAddBook.addEventListener('click', () => {
  if (bookForm.style.display === 'none') {
    bookForm.style.display = 'block';
  }
  else {
    bookForm.style.display = 'none';
  }
})

let first_book = new Book('Sapiens', 'Yuval Noah Harari ', 'interesting book', 400, true);
let second_book = new Book('Sapiens 2', 'Yuval Noah Harari', 'interesting book', 350, false);

myLibrary.push(first_book);
myLibrary.push(second_book);

function removeBook(index) {
  console.log(myLibrary);
  myLibrary.splice(index, 1);
  console.log(myLibrary);
}

function createCard(book, index) {
  let card = document.createElement('div');
  card.setAttribute('data-index', index);

  let title = document.createElement('h2');
  title.textContent = book.title;

  let author = document.createElement('p');
  author.textContent = book.author;

  let description = document.createElement('p');
  description.textContent = book.description;

  let num_of_pages = document.createElement('p');
  num_of_pages.textContent = book.num_of_pages;
  
  let read = document.createElement('p');
  read.textContent = book.read;

  let btnRemoveBook = document.createElement('button');
  btnRemoveBook.textContent = 'Remove Book'
  btnRemoveBook.addEventListener('click', removeBook(index));

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(description);
  card.appendChild(num_of_pages);
  card.appendChild(read);
  card.appendChild(btnRemoveBook);
  return card;
}

function displayBooks(library) {
  let container = document.querySelector('.container'); 
  library.forEach((book, index) => {
      container.appendChild(createCard(book, index));
    }
  )
}

displayBooks(myLibrary);
