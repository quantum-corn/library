const Book = function () {
    let id, name, author, pages, read;
    this.setId = function (value) {
        id=value;
    }
    this.setName = function (value) {
        name = value;
    }
    this.setAuthor = function (value) {
        author = value;
    }
    this.setPages = function (value) {
        pages = value;
    }
    this.setRead = function (value) {
        read = value;
    }
    this.getId = function () {
        return id;
    }
    this.getName = function () {
        return name;
    }
    this.getAuthor = function () {
        return author;
    }
    this.getPages = function () {
        return pages;
    }
    this.getRead = function () {
        return read;
    }
}

const getBookData = function () {
    let name = prompt('Enter the name of the book');
    if (name == '') {
        alert("A book has no name?");
        return;
    }
    let author = prompt('Enter the author of the book');
    if (author == '') {
        alert("An author has no name?");
        return;
    }
    let pages = prompt('Enter the number of pages');
    if (!/[1-9]\d*/.test(pages)) {
        alert("How do you  print a book with that many pages?");
        return;
    }
    let read = prompt('Enter "read" if you have read it; Anything else will mean - not read');
    addBook(name, author, pages, read == 'read' ? true : false);
    displayBook(LIBRARY[LIBRARY.length-1]);
}

const addBook = function (name, author, pages, read) {
    let book = new Book();
    book.setId(LIBRARY.length+1);
    book.setName(name);
    book.setAuthor(author);
    book.setPages(pages);
    book.setRead(read);
    LIBRARY.push(book);
}

const displayBook = function (book) {
    let entry = document.createElement('div');
    entry.className = "book";
    entry.id = book.getId();
    let title = document.createElement('h3');
    title.className = 'title';
    title.textContent = book.getName();
    entry.appendChild(title);
    let author = document.createElement('em');
    author.className = 'author';
    author.textContent = 'by ' + book.getAuthor();
    entry.appendChild(author);
    let pages = document.createElement('p');
    pages.className = 'pages';
    pages.textContent = book.getPages() + ' Pages';
    entry.appendChild(pages);
    let buttons = document.createElement('div');
    buttons.className = 'buttons';
    let read = document.createElement('button');
    read.className = book.getRead() ? 'read' : 'notRead' ;
    read.textContent = book.getRead() ? 'Read' : 'Not read';
    buttons.appendChild(read);
    read.addEventListener('click', e=>toggleRead(e));
    let del = document.createElement('button');
    del.className = 'delButton';
    let icon = document.createElement('img');
    icon.src = './delete.svg';
    del.addEventListener('click', e=>deleteBook(e));
    del.appendChild(icon);
    entry.appendChild(buttons);
    buttons.appendChild(del);
    BOOKSHELF.appendChild(entry);
}

const toggleRead = function (e) {
    let button = e.target;
    let entry = button.parentElement.parentElement;
    let index = entry.id-1;
    let book = LIBRARY[index];
    book.setRead(book.getRead() ? false : true);
    button.textContent = button.textContent == 'Read' ? 'Not Read' : 'Read';
    button.className = button.className == 'read' ? 'notRead' : 'read';
}

const deleteBook = function (e) {
    let entry = e.target.parentElement.parentElement.parentElement;
    let index = entry.id-1;
    LIBRARY.splice(index, 1);
    let entries= BOOKSHELF.querySelectorAll('.book');
    entries.forEach(book=>{
        if(book.id>entry.id) book.id = book.id - 1;
    })
    BOOKSHELF.removeChild(entry);
}

const render = function () {
    LIBRARY.forEach(book=>{
        displayBook(book);
    });
}


let LIBRARY = [];
const BOOKSHELF = document.querySelector('.bookshelf');
addBook('The Hobbit', 'J. R. R. Tolkien', 259, true);
render();
let addButton = document.querySelector('.addButton');
addButton.addEventListener('click', getBookData);