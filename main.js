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

let first_book = new Book('Sapiens', 'Yuval Noah Harari ', 'interesting book', 400, true);
let second_book = new Book('Sapiens 2', 'Yuval Noah Harari', 'interesting book', 350, false);

myLibrary.push(first_book);
myLibrary.push(second_book);

function createCard(book) {
  let card = document.createElement('div');

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

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(description);
  card.appendChild(num_of_pages);
  card.appendChild(read);

  return card;
}

function displayBooks(library) {
  let container = document.querySelector('.container'); 
  library.forEach(book => {
      container.appendChild(createCard(book));
    }
  )
}

displayBooks(myLibrary);
