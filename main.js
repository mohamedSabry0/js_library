const btnAddBook = document.querySelector('.btn-add-book');
const bookForm = document.querySelector('.book-form');
const btnSaveBook = document.querySelector('.btn-save-book');
const cardsContainer = document.querySelector('.cards-container');

class Book {
  constructor(title, author, description, num_of_pages, read) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.num_of_pages = num_of_pages;
    this.read = read;
  }
  changeReadStatus = function () {
    this.read = !this.read;
  }
}

let myLibrary = [];

function checkStorage() {
  if (localStorage.getItem('library') == null) {
    let first_book = new Book('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari ', 'Sapiens describes human development through a framework of three “Revolutions”: the Cognitive, the Agricultural, and the Scientific.', 400, true);
    let second_book = new Book('Homo Deus: A Brief History of Tomorrow', 'Yuval Noah Harari', 'Homo Deus explores the projects, dreams, and nightmares that will shape the twenty-first century, from overcoming death to creating artificial life.', 350, false);
    myLibrary.push(first_book);
    myLibrary.push(second_book);
    localStorage.setItem('library', JSON.stringify(myLibrary));
  }
  else {
    myLibrary = JSON.parse(localStorage.getItem('library'));
  }
}

function updateStorage() {
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

function toggleAddBookForm() {
  if (bookForm.style.display === 'flex') {
    bookForm.style.display = 'none';
  }
  else {
    bookForm.style.display = 'flex';
  }
}

btnAddBook.addEventListener('click', toggleAddBookForm);

function addBookToLibrary() {
  let bookTitle = document.querySelector('#book-title');
  let bookAuthor = document.querySelector('#book-author');
  let bookDescription = document.querySelector('#book-description');
  let bookPages = document.querySelector('#book-pages');
  let bookRead = document.querySelector('input[name = "book-read"]:checked');
  newBook = new Book(bookTitle.value, bookAuthor.value, bookDescription.value, bookPages.value, bookRead.value);
  myLibrary.push(newBook);
  updateStorage();
  bookTitle.value = '';
  bookAuthor.value = '';
  bookDescription.value = '';
  bookPages.value = '';
  bookRead.checked = false;

  displayBooks(myLibrary);
  toggleAddBookForm();
}

btnSaveBook.addEventListener('click', addBookToLibrary);

function removeBook(index) {
  myLibrary.splice(index, 1);
  updateStorage();
  displayBooks(myLibrary);
}

function createCard(book, index) {
  let card = document.createElement('div');
  card.setAttribute('data-index', index);
  card.classList.add('book-card');

  let title = document.createElement('h2');
  title.textContent = book.title;

  let author = document.createElement('p');
  author.textContent = book.author;

  let description = document.createElement('p');
  description.textContent = book.description;

  let num_of_pages = document.createElement('p');
  num_of_pages.textContent = book.num_of_pages;

  let btnReadBook = document.createElement('button');
  btnReadBook.textContent = book.read ? 'read' : 'not read';
  btnReadBook.classList.add('btn');
  btnReadBook.addEventListener('click', () => {
    book.changeReadStatus();
    updateStorage();
    displayBooks(myLibrary);
  });

  let btnRemoveBook = document.createElement('button');
  btnRemoveBook.textContent = 'Remove Book';
  btnRemoveBook.classList.add('btn');
  btnRemoveBook.addEventListener('click', () => {
    removeBook(index);
  });

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(description);
  card.appendChild(num_of_pages);
  card.appendChild(btnReadBook);
  card.appendChild(btnRemoveBook);
  return card;
}

function displayBooks(library) {
  cardsContainer.innerHTML = '';
  library.forEach((book, index) => {
    cardsContainer.appendChild(createCard(book, index));
  }
  )
}

checkStorage();
displayBooks(myLibrary);
