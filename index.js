let myLibrary = [
    {
        Title: 'Steve Jobs',
        Author: 'Walter Isaacson',
        Genre: 'Biography, Nonfiction, Technology, Inspirational',
        Year: 2011,
        'Number of Pages': 500,
        Read: true,
    },
    {
        Title: 'Leonardo Da Vinci',
        Author: 'Walter Isaacson',
        Genre: 'Biography, Nonfiction, Technology, Engineering',
        Year: 2017,
        'Number of Pages': 600,
        Read: true,

    },
    {
        Title: 'Albert Einstein',
        Author: 'Walter Isaacson',
        Genre: 'Biography, Nonfiction, Science',
        Year: 2007,
        'Number of Pages': 700,
        Read: true,
    },
];

function Book() {
    // constructor
}

function addBookToLibrary() {
    // do stuff
}

const addBook = document.querySelector('.addBook');
addBook.addEventListener('click', addBookToLibrary());

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
        div.appendChild(title);
        div.appendChild(author);
        div.appendChild(genre);
        div.append(year);
        div.append(pages);
        div.append(read);

        books.appendChild(div);
    })
}

showBooksOnLibrary();