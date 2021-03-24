const btnAddBook = document.querySelector('.btn-add-book');
const bookForm = document.querySelector('.book-form');
const btnSaveBook = document.querySelector('.btn-save-book');
const cardsContainer = document.querySelector('.cards-container');

class Book {
  constructor(book) {
    this.title = book.title;
    this.author = book.author;
    this.description = book.description;
    this.numOfPages = book.numOfPages;
    this.read = book.read;
  }

  changeReadStatus() {
    this.read = !this.read;
  }
}

const book1 = {
  title: 'Homo Deus: A Brief History of Tomorrow',
  author: 'Yuval Noah Harari ',
  description: 'Sapiens describes human development through a framework of three “Revolutions”: the Cognitive, the Agricultural, and the Scientific.',
  numOfPages: 400,
  read: true
}

  const book2 = {
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari ',
    description: 'Homo Deus explores the projects, dreams, and nightmares that will shape the twenty-first century, from overcoming death to creating artificial life.',
    numOfPages: 350,
    read: false
  }

let firstBook = new Book(book1);
let secondBook = new Book(book2);

let myLibrary = [];

function checkStorage() {
  if (localStorage.getItem('library') == null) {
    myLibrary.push(firstBook);
    myLibrary.push(secondBook);
    localStorage.setItem('library', JSON.stringify(myLibrary));
  } else {
    myLibrary = JSON.parse(localStorage.getItem('library')).map(book => {
      return new Book(book)
    });

  }
}

function updateStorage() {
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

function toggleAddBookForm() {
  if (bookForm.style.display === 'flex') {
    bookForm.style.display = 'none';
  } else {
    bookForm.style.display = 'flex';
  }
}

btnAddBook.addEventListener('click', toggleAddBookForm);

function displayBooks(library) {
  cardsContainer.innerHTML = '';
  library.forEach((book, index) => {
    // eslint-disable-next-line no-use-before-define
    cardsContainer.appendChild(createCard(book, index));
  });
}

function addBookToLibrary() {
  const bookTitle = document.querySelector('#book-title');
  const bookAuthor = document.querySelector('#book-author');
  const bookDescription = document.querySelector('#book-description');
  const bookPages = document.querySelector('#book-pages');
  const bookRead = document.querySelector('input[name = "book-read"]:checked');
  const newBook = new Book({
    title: bookTitle.value,
    author: bookAuthor.value,
    description: bookDescription.value,
    numOfPages: bookPages.value,
    read: bookRead.value
  });

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
  const card = document.createElement('div');
  card.setAttribute('data-index', index);
  card.classList.add('book-card');

  const title = document.createElement('h2');
  title.textContent = book.title;

  const author = document.createElement('p');
  author.textContent = book.author;

  const description = document.createElement('p');
  description.textContent = book.description;

  const numOfPages = document.createElement('p');
  numOfPages.textContent = `${book.numOfPages} pages`;

  const btnReadBook = document.createElement('button');
  btnReadBook.textContent = book.read ? 'read' : 'not read';
  btnReadBook.classList.add('btn');
  btnReadBook.addEventListener('click', () => {
    book.changeReadStatus();
    updateStorage();
    displayBooks(myLibrary);
  });

  const btnRemoveBook = document.createElement('button');
  btnRemoveBook.textContent = 'Remove Book';
  btnRemoveBook.classList.add('btn');
  btnRemoveBook.addEventListener('click', () => {
    removeBook(index);
  });

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(description);
  card.appendChild(numOfPages);
  card.appendChild(btnReadBook);
  card.appendChild(btnRemoveBook);
  return card;
}

checkStorage();
displayBooks(myLibrary);
