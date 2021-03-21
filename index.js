let myLibrary = [
    {
        Title: 'Steve Jobs',
        Author: 'Walter Isaacson',
        Genre: 'Biography, Nonfiction, Technology, Inspirational',
        Year: 2011,
        'Number of Pages': 500,
        Read: true,
        DateCompleted: '01-01-2021',
    },
    {
        Title: 'Leonardo Da Vinci',
        Author: 'Walter Isaacson',
        Genre: 'Biography, Nonfiction, Technology, Engineering',
        Year: 2017,
        'Number of Pages': 600,
        Read: true,
        DateCompleted: '01-01-2021',

    },
    {
        Title: 'Albert Einstein',
        Author: 'Walter Isaacson',
        Genre: 'Biography, Nonfiction, Science',
        Year: 2007,
        'Number of Pages': 700,
        Read: true,
        DateCompleted: '01-01-2021',
    },
];
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const genre = document.querySelector('#genre');
const year = document.querySelector('#year');
const pages = document.querySelector('#pages');
const readStatus = document.querySelector('#readStatus');
const dateCompleted = document.querySelector('#completedDate');

function Book() {
    // constructor
}
Book.prototype.addBookToLibrary = () => {
    // do stuff
    myLibrary.push({
        Title: title.value,
        Author: author.value,
        Genre: genre.value,
        Year: year.value,
        ReadStatus: readStatus.value,
        DateCompleted: dateCompleted.value,
    })
}
// on submit form
const form = document.querySelector('.form');
form.onsubmit = () => {
    const newBook = new Book();
    newBook.addBookToLibrary();
    books.innerHTML = '';
    showBooksOnLibrary();
    formModal.style.display = 'none'; 
    // temporary measure to stay on current page
    return false;
}
const openModal = document.querySelector('#openModal');
openModal.addEventListener('click', showForm);

const formModal = document.querySelector('.modal');
function showForm(){
    formModal.style.display = 'block';
}

window.addEventListener('click', closeForm);
function closeForm(e){
    if (e.target == formModal) {
        formModal.style.display = "none";
    }
}

const books = document.querySelector('.books');

function showBooksOnLibrary(){
    myLibrary.forEach(book => {
        const div = document.createElement('Div');
        div.className = 'card';

        const title = document.createElement('h3');
        title.className = 'title';
        title.innerText = book.Title;

        const author = document.createElement('p');
        author.className = 'author';
        author.innerText = `Author: ${book.Author}`;

        const genre = document.createElement('p');
        genre.className = 'genre';
        genre.innerText = `Genre: ${book.Genre}`;
        
        const year = document.createElement('p');
        year.className = 'year';
        year.innerText = `Year Published: ${book.Year}`;
        
        const pages = document.createElement('p');
        pages.className = 'year';
        pages.innerText = `${book['Number of Pages']} Pages`;

        const read = document.createElement('p');
        read.className = 'read';
        read.innerText = book.Read;

        const removeBookBtn = document.createElement('button');
        removeBookBtn.className = 'button';
        removeBookBtn.id = 'removeBook';
        removeBookBtn.innerText = 'Remove Book';

        div.appendChild(title);
        div.appendChild(author);
        div.appendChild(genre);
        div.append(year);
        div.append(pages);
        div.append(read);
        div.append(removeBookBtn);

        books.appendChild(div);
    })
}

showBooksOnLibrary();