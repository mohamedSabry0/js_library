const theLibrary = (()=>{
  let myLibrary = [];
  
  const btnAddBook = document.querySelector('.btn-add-book');
  const cardsContainer = document.querySelector('.cards-container');
  
  class Book {
    constructor(book) {
      this.title = book.title;
      this.author = book.author;
      this.description = book.description;
      this.numOfPages = book.numOfPages;
      this.read = book.read;
    }
  }
  
  
  const myStorage =(() =>{
    
    const addBookToLibrary = (newBook) => {
      myLibrary.push(newBook);
      updateStorage();
      
      displayBooks(myLibrary);
    }
  
    const removeBook = (index) => {
      myLibrary.splice(index, 1);
      updateStorage();
      displayBooks(myLibrary);
    }

    const changeReadStatus = (index)=> {
      let book = myLibrary[index];
      book.read = !book.read;
      updateStorage();
      displayBooks(myLibrary);
    }

    const checkStorage= ()=> {
      if (localStorage.getItem('library') == null) {
        myLibrary.push(book1);
        myLibrary.push(book2);
        localStorage.setItem('library', JSON.stringify(myLibrary));
      } else {
        myLibrary = JSON.parse(localStorage.getItem('library')).map(book => new Book(book));
      }
    }
      
    const updateStorage= () => {
      localStorage.setItem('library', JSON.stringify(myLibrary));
    }
    return{
      addBookToLibrary,
      removeBook,
      changeReadStatus,
      updateStorage,
      checkStorage
    }
  })();

  
  const form = (() => {
    const btnSaveBook = document.querySelector('.btn-save-book');
    const bookForm = document.querySelector('.book-form');
    
    const getData = ()=>{
      const title = document.querySelector('#book-title');
      const author = document.querySelector('#book-author');
      const description = document.querySelector('#book-description');
      const numOfPages = document.querySelector('#book-pages');
      const read = document.querySelector('input[name = "book-read"]:checked');
      return {
        title,
        author,
        description,
        numOfPages,
        read
      };
    }

    const resetForm = () => {
      let {title, author, description, numOfPages, read} = getData();
      title.value = '';
      author.value = '';
      description.value = '';
      numOfPages.value = '';
      read.checked = false;
    }
    
    const toggleAddBookForm = () => {
      if (bookForm.style.display === 'flex') {
        bookForm.style.display = 'none';
      } else {
        bookForm.style.display = 'flex';
      }
    }
    
    const createBook = () => {
      console.log('create');
      let [title, author, description, numOfPages, read] = Object.values(getData()).map(el => el.value);
      read = read == 'true';
      const newBook = new Book({
        title,
        author,
        description,
        numOfPages,
        read
      });

      myStorage.addBookToLibrary(newBook);
      toggleAddBookForm();
      resetForm();
    }
    
    btnSaveBook.addEventListener('click', createBook);
    
    return {
      toggleAddBookForm
    };

  })();
  
  btnAddBook.addEventListener('click', form.toggleAddBookForm);

  // default values
  const book1 = new Book({
    title: 'Homo Deus: A Brief History of Tomorrow',
    author: 'Yuval Noah Harari ',
    description: 'Sapiens describes human development through a framework of three “Revolutions”: the Cognitive, the Agricultural, and the Scientific.',
    numOfPages: 400,
    read: true,
  });
    
  const book2 = new Book({
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari ',
    description: 'Homo Deus explores the projects, dreams, and nightmares that will shape the twenty-first century, from overcoming death to creating artificial life.',
    numOfPages: 350,
    read: false,
  });

    
  function displayBooks(library) {
    cardsContainer.innerHTML = '';
    library.forEach((book, index) => {
      // eslint-disable-next-line no-use-before-define
      cardsContainer.appendChild(createCard(book, index));
    });
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
      myStorage.changeReadStatus(index);
    });
    
    const btnRemoveBook = document.createElement('button');
    btnRemoveBook.textContent = 'Remove Book';
    btnRemoveBook.classList.add('btn');

    btnRemoveBook.addEventListener('click', () => {
      myStorage.removeBook(index);
    });
    
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(description);
    card.appendChild(numOfPages);
    card.appendChild(btnReadBook);
    card.appendChild(btnRemoveBook);
    return card;
  }

  myStorage.checkStorage();
  displayBooks(myLibrary);
  
})();