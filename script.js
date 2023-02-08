const bookGrid = document.querySelector(`.book-grid`);
const addBookBtn = document.getElementById(`addbook`);
var booksCount = document.querySelectorAll(`.grid-item`).length;
const newBookModal = document.getElementById("myModal");
// Get the button that opens the modal
const btn = document.getElementById("myBtn");
const form = document.getElementById(`newBookForm`);
const title = document.getElementById(`title`);
const author = document.getElementById(`author`);
const pages = document.getElementById(`pages`);
const checkbox = document.getElementById(`checkbox`);

function testFunc() {
  return null;
}

var library = [
  {
    bookId: 1,
    bookName: "Don Quijot",
    author: "Miguel Cervantes",
    pagesCount: 428,
    beenRead: false,
  },
  {
    bookId: 2,
    bookName: "Hogfather",
    author: "Terry Pratchet",
    pagesCount: 527,
    beenRead: true,
  },
];

buildLibrary(library);

addBookBtn.addEventListener(`click`, () => {
  const book = getBookFromModal();
  library.push(book);
  addToGrid(createBookTile(book));
  clearModal();
  newBookModal.style.display = "none";
});

form.addEventListener(`submit`, (event) => {
  event.preventDefault();
});

document.body.addEventListener("click", function (event) {
  if (event.target.className == "remove-book") {
    const bookToRemove = event.target.parentNode;
    parentValue = bookToRemove.getAttribute(`data-value`);
    removeBookFromLibrary(parentValue);
    bookGrid.removeChild(bookToRemove);
  } else if (event.target.classList.contains("read-button")) {
    const bookToRead = event.target.parentNode;
    parentValue = bookToRead.getAttribute(`data-value`);
    changeBookReadStatus(parentValue);
    buildLibrary(library);
  }
});

btn.addEventListener(`click`, () => {
  newBookModal.style.display = "flex";
});

window.onclick = function (event) {
  if (event.target == newBookModal) {
    newBookModal.style.display = "none";
  }
};

function changeBookReadStatus(bookId) {
  const bookIndex = library.findIndex((book) => book.bookId == bookId);
  let book = library[bookIndex];
  book.beenRead ? (book.beenRead = false) : (book.beenRead = true);
}

function getBookFromModal() {
  return {
    bookId: getUniqueId(),
    bookName: title.value,
    author: author.value,
    pagesCount: pages.value,
    beenRead: checkbox.checked,
  };
}

function getUniqueId() {
  if (library.length) {
    library = sortById(library);
    for (let i = 0; i < library.length; i++) {
      if (library[i].bookId == i + 1) {
        if (i + 1 == library.length) {
          return i + 2;
        }
        continue;
      } else {
        return i + 1;
      }
    }
  } else {
    return 1;
  }
}

function removeBookFromLibrary(bookId) {
  library = library.filter((book) => {
    return book.bookId != bookId;
  });
}

function clearModal() {
  title.value = ``;
  author.value = ``;
  pages.value = ``;
  checkbox.checked = false;
}

function createBookTile(bookObject) {
  const bookTile = document.createElement(`div`);
  const title = document.createElement(`p`);
  const author = document.createElement(`p`);
  const pages = document.createElement(`p`);
  const beenRead = document.createElement(`button`);
  const removeButton = document.createElement(`button`);

  bookTile.classList.add(`grid-item`);
  bookTile.setAttribute(`data-value`, bookObject.bookId);

  title.textContent = bookObject.bookName;
  author.textContent = bookObject.author;
  pages.textContent = bookObject.pagesCount;

  if (bookObject.beenRead) {
    beenRead.textContent = `Have been read`;
    beenRead.classList.add("red-button", "read-button");
  } else if (!bookObject.beenRead) {
    beenRead.textContent = `Have not been read`;
    beenRead.classList.add("green-button", "read-button");
  }

  removeButton.classList.add(`remove-book`);
  removeButton.textContent = `Remove book`;

  bookTile.append(title, author, pages, beenRead, removeButton);
  return bookTile;
}

function addToGrid(bookElement) {
  bookGrid.append(bookElement);
}

function buildLibrary(library) {
  bookGrid.textContent = "";
  library.forEach((book) => {
    addToGrid(createBookTile(book));
  });
}

function removeLast() {
  const last = bookGrid.lastElementChild;
  bookGrid.removeChild(last);
}

function sortById(arr) {
  return arr.sort((a, b) => a.bookId - b.bookId);
}
