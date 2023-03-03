/** Creates a card that displays a single book's info. */
export function createBookDisplayCard(book, removeBookHandler) {
  // <div class='card'>
  //   <h3>"Book Title"</h3>
  //   <p>by Book Author</p>
  //   <p>Page Count: 999</p>
  //   <p>Finished Reading: True</p>
  //   <button>Delete</button>
  // </div>;

  let cardElem = document.createElement('div');
  let titleElem = document.createElement('h3');
  let authorElem = document.createElement('p');
  let pagesElem = document.createElement('p');
  let readElem = document.createElement('p');
  let buttonContainer = document.createElement('div');
  let toggleReadStatusButton = document.createElement('button');
  let deleteButton = document.createElement('button');

  cardElem.setAttribute('class', 'card');
  titleElem.textContent = `"${book.title}"`;
  authorElem.textContent = `by ${book.author}`;
  pagesElem.textContent = `Pages: ${book.pages}`;
  readElem.textContent = `Finished Reading: ${book.read}`;
  toggleReadStatusButton.textContent = 'Toggle Read';
  toggleReadStatusButton.classList.add('button-blue');
  toggleReadStatusButton.onclick = book.toggleBookReadStatus;
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('button-red');
  deleteButton.style.float = 'right';
  // here
  deleteButton.onclick = () => removeBookHandler(book);

  cardElem.appendChild(titleElem);
  cardElem.appendChild(authorElem);
  cardElem.appendChild(pagesElem);
  cardElem.appendChild(readElem);
  cardElem.appendChild(buttonContainer);

  buttonContainer.appendChild(toggleReadStatusButton);
  buttonContainer.appendChild(deleteButton);

  return cardElem;
}
