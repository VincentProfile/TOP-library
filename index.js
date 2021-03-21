let myLibrary = [
    {
        Title: 'Steve Jobs',
        Author: 'Walter Isaacson',
        Genre: 'Biography, Nonfiction, Technology, Inspirational',
        Year: 2011,
        'Number of Pages': 500,
        ReadStatus: 'Read',
        DateCompleted: '01-01-2021',
    },
    {
        Title: 'Leonardo Da Vinci',
        Author: 'Walter Isaacson',
        Genre: 'Biography, Nonfiction, Technology, Engineering',
        Year: 2017,
        'Number of Pages': 600,
        ReadStatus: 'Read',
        DateCompleted: '01-01-2021',

    },
    {
        Title: 'Albert Einstein',
        Author: 'Walter Isaacson',
        Genre: 'Biography, Nonfiction, Science',
        Year: 2007,
        'Number of Pages': 700,
        ReadStatus: 'Read',
        DateCompleted: '01-01-2021',
    },
];
let title = document.querySelector('#title');
let author = document.querySelector('#author');
let genre = document.querySelector('#genre');
let year = document.querySelector('#year');
let pages = document.querySelector('#pages');
let readStatus = document.querySelector('#readStatus');
let dateCompleted = document.querySelector('#completedDate');

function Book() {
    // constructor
}
Book.prototype.addBookToLibrary = () => {
    // do stuff
    myLibrary.push({
        // add books from form values to library array
        Title: title.value,
        Author: author.value,
        Genre: genre.value,
        Year: year.value,
        ['Number of Pages']: pages.value,
        ReadStatus: readStatus.value,
        DateCompleted: dateCompleted.value,
    })

    console.table(myLibrary);
}

// on submit form
const form = document.querySelector('.form');
form.onsubmit = () => {
    if (myLibrary.find(book => book.Title === title.value)){
        if (confirm("Update existing book?")){
            // update library array from form values
            const bookNumber = myLibrary.findIndex(book => book.Title === title.value);
            myLibrary[bookNumber].Title = title.value;
            myLibrary[bookNumber].Author = author.value;
            myLibrary[bookNumber].Genre = genre.value;
            myLibrary[bookNumber].Year = year.value;
            myLibrary[bookNumber]['Number of Pages'] = pages.value;
            myLibrary[bookNumber].ReadStatus = readStatus.value;
            if (readStatus.value === 'Read'){
                myLibrary[bookNumber].DateCompleted = dateCompleted.value;
            }else{
                myLibrary[bookNumber].DateCompleted = '';
            }
            formModal.style.display = 'none'; 
        }
    }else{
        const newBook = new Book();
        newBook.addBookToLibrary();
        formModal.style.display = 'none'; 
    }

    books.innerHTML = '';
    showBooksOnLibrary();

    // temporary measure to stay on current page
    return false;
}

const openModal = document.querySelector('#openModal');
openModal.addEventListener('click', showForm);

const formModal = document.querySelector('.modal');
function showForm(e){
    if (e.target.id == 'editForm'){
        myLibrary.forEach((book, index) =>{
            if (e.target.getAttribute('data-index') == index){
                // show current book information on form 
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

    function removeBook(e){
        const bookPosition = e.target.getAttribute('data-index');
        myLibrary.splice(bookPosition, 1);
        books.innerHTML = '';
        showBooksOnLibrary();
    }
}

showBooksOnLibrary();