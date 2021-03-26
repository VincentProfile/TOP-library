let myLibrary = [];
let title = document.querySelector('#title');
let author = document.querySelector('#author');
let genre = document.querySelector('#genre');
let year = document.querySelector('#year');
let pages = document.querySelector('#pages');
let readStatus = document.querySelector('#readStatus');
let dateCompleted = document.querySelector('#completedDate');

function Book(title, author, genre, year, pages, readStatus, dateCompleted) {
    // constructor
    this.title = title.value;
    this.author = author.value;
    this.genre = genre.value;
    this.year = year.value;
    this.pages = pages.value;
    this.readStatus = readStatus.value;
    this.dateCompleted = dateCompleted.value;
}
// unable to use arrow function 
Book.prototype.addBookToLibrary = function () {
    // do stuff
    console.log(this.title);
    myLibrary.push({
        Title: this.title,
        Author: this.author,
        Genre: this.genre,
        Year: this.year,
        ['Number of Pages']: this.pages,
        ReadStatus: this.readStatus,
        DateCompleted: this.dateCompleted,
    })
    localStorage.setItem('Library', JSON.stringify(myLibrary));
}
Book.prototype.updateBookToLibrary = function () {

    // update library array from form values
    const bookNumber = myLibrary.findIndex(book => book.Title === this.title);

    myLibrary[bookNumber].Title = this.title;
    myLibrary[bookNumber].Author = this.author;
    myLibrary[bookNumber].Genre = this.genre;
    myLibrary[bookNumber].Year = this.year;
    myLibrary[bookNumber]['Number of Pages'] = this.pages;
    myLibrary[bookNumber].ReadStatus = this.readStatus;
    if (readStatus.value === 'Read'){
        myLibrary[bookNumber].DateCompleted = this.dateCompleted;
    }else{
        myLibrary[bookNumber].DateCompleted = '';
    }
    formModal.style.display = 'none'; 
}

// on submit form
const submitBtn = document.querySelector('#addBook');
const form = document.querySelector('.form');
form.onsubmit = () => {
    const newBook = new Book(title, author, genre, year, pages, readStatus, dateCompleted);
    if (myLibrary.find(book => book.Title === newBook.title)){
        if (confirm("Update existing book?")){
            newBook.updateBookToLibrary();
        }
    }else{
        newBook.addBookToLibrary();
        formModal.style.display = 'none'; 
    }

    books.innerHTML = '';
    showBooksOnLibrary();

    // temporary measure to stay on current page
    return false;
}

// form details
const openModal = document.querySelector('#openModal');
openModal.addEventListener('click', showForm);

const formModal = document.querySelector('.modal');
function showForm(e){
    if (e.target.id == 'editForm'){
        submitBtn.value = 'Update';
        myLibrary.forEach((book, index) =>{
            if (e.target.getAttribute('data-index') == index){
                // show current book information from librar to form 
                title.value = book.Title;
                author.value = book.Author;
                genre.value = book.Genre;
                year.value = book.Year;
                pages.value = book['Number of Pages'];
                readStatus.value = book.ReadStatus;
                dateCompleted.value = book.DateCompleted;
            }
        })
    }
    else{
        submitBtn.value = 'Submit';
    }
    formModal.style.display = 'block';
}

window.addEventListener('click', closeForm);
window.addEventListener('keydown', closeForm);
function closeForm(e){
    if (e.target == formModal || e.keyCode == "27") {
        formModal.style.display = "none";
    }
}

const books = document.querySelector('.books');

// add dom elements 
function showBooksOnLibrary(){
    myLibrary.forEach((book, index) => {
        const div = document.createElement('Div');
        div.className = 'card';
        div.setAttribute('data-index', index);

        const title = document.createElement('h3');
        title.className = 'title';
        title.setAttribute('data-index', index);
        title.innerText = book.Title;

        const author = document.createElement('p');
        author.className = 'author';
        author.setAttribute('data-index', index);
        if (book.Author != "")
            author.innerText = `Author: ${book.Author}`;

        const genre = document.createElement('p');
        genre.className = 'genre';
        genre.setAttribute('data-index', index);
        if (book.Genre != "")
            genre.innerText = `Genre(s): ${book.Genre}`;
        
        const year = document.createElement('p');
        year.className = 'year';
        year.setAttribute('data-index', index);
        if (book.Year != "")
            year.innerText = `Published In: ${book.Year}`;
        
        const pages = document.createElement('p');
        pages.className = 'pages';
        pages.setAttribute('data-index', index);
        if (book['Number of Pages'] != "")
            pages.innerText = `${book['Number of Pages']} Pages`;

        const readStatus = document.createElement('p');
        readStatus.className = 'readStatus';
        readStatus.innerText = `Status: ${book.ReadStatus}`;

        const dateCompleted = document.createElement('p');
        dateCompleted.className = 'dateCompleted';
        if (book.ReadStatus == "Read"){
            dateCompleted.innerText = `Completed On: ${book.DateCompleted}`;
        }
        dateCompleted.setAttribute('data-index', index);

        const btnsDiv = document.createElement('div');
        btnsDiv.className = 'div';
        btnsDiv.id = 'btnsDiv';
        btnsDiv.setAttribute('data-index', index);

        const editFormBtn = document.createElement('button');
        editFormBtn.className = 'button';
        editFormBtn.id = 'editForm';
        editFormBtn.innerText = 'Edit Book';
        editFormBtn.setAttribute('data-index', index);
        editFormBtn.addEventListener('click', showForm);

        const removeBookBtn = document.createElement('button');
        removeBookBtn.className = 'button';
        removeBookBtn.id = 'removeBook';
        removeBookBtn.innerText = 'Remove Book';
        removeBookBtn.setAttribute('data-index', index);
        removeBookBtn.addEventListener('click', removeBook);

        btnsDiv.appendChild(editFormBtn);
        btnsDiv.appendChild(removeBookBtn);

        div.appendChild(title);
        div.appendChild(author);
        div.appendChild(genre);
        div.appendChild(year);
        div.appendChild(pages);
        div.appendChild(readStatus);
        div.appendChild(dateCompleted);
        div.appendChild(btnsDiv);

        books.appendChild(div);
    })
}

function removeBook(e){
    const bookPosition = e.target.getAttribute('data-index');
    myLibrary.splice(bookPosition, 1);
    books.innerHTML = '';

    localStorage.setItem('Library', JSON.stringify(myLibrary));
    showBooksOnLibrary();
}

function loadLibrary(){
    if (localStorage.getItem('Library') !== null){
        myLibrary = JSON.parse(localStorage.getItem('Library'));
    }
    showBooksOnLibrary();
}
loadLibrary();