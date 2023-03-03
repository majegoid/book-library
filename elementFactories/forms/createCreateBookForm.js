import { createFormCheckbox } from './controls/createFormCheckbox';
import { createFormInput } from './controls/createFormInput';

/** Creates the Create Book form. */
export function createCreateBookForm() {
  // <div class="container">
  // <div class="header">
  //   <h2>Create a Book</h2>
  // </div>
  // <form id="create-book-modal-form" class="form" novalidate>
  //   <div class="form-control">
  //     <label for="book-title">Title</label>
  //     <input
  //       type="text"
  //       id="book-title"
  //       name="title"
  //       placeholder="Title"
  //     />
  //     <i class="fas fa-check-circle"></i>
  //     <i class="fas fa-exclamation-circle"></i>
  //     <small>Error message</small>
  //   </div>
  //   <div class="form-control">
  //     <label for="book-author">Author</label>
  //     <input
  //       type="text"
  //       id="book-author"
  //       name="author"
  //       placeholder="Author"
  //     />
  //     <i class="fas fa-check-circle"></i>
  //     <i class="fas fa-exclamation-circle"></i>
  //     <small>Error message</small>
  //   </div>
  //   <div class="form-control">
  //     <label for="book-pages">Pages</label>
  //     <input
  //       type="text"
  //       id="book-pages"
  //       name="pages"
  //       placeholder="Pages"
  //     />
  //     <i class="fas fa-check-circle"></i>
  //     <i class="fas fa-exclamation-circle"></i>
  //     <small>Error message</small>
  //   </div>
  //   <div class="form-control">
  //     <label class="label-container" for="book-read">
  //       Have you read it?
  //       <input type="checkbox" id="book-read" name="read" checked />
  //       <span class="checkmark"></span>
  //     </label>
  //   </div>
  //   <button id="create-book-button" class="button-green">
  //     Create Book
  //   </button>
  // </form>
  // </div>

  // container
  const containerDiv = document.createElement('div');
  div.className = 'container';

  // header div
  const headerDiv = document.createElement('div');
  headerDiv.className = 'header';
  const headerH2 = document.createElement('h2');
  h2.textContent = 'Create a Book';
  headerDiv.appendChild(headerH2);
  containerDiv.appendChild(headerDiv);

  // form
  const form = document.createElement('form');
  form.id = 'create-book-modal-form';
  form.className = 'form';
  form.novalidate = true;
  // title input
  const titleFormControl = createFormInput('book-title', 'Title', 'title');
  form.appendChild(titleFormControl);
  // author text input
  const authorFormControl = createFormInput('book-author', 'Author', 'author');
  form.appendChild(authorFormControl);
  // pages text input
  const pagesFormControl = createFormInput('book-pages', 'Pages', 'pages');
  form.appendChild(pagesFormControl);
  // pages text input
  const bookReadFormControl = createFormCheckbox(
    'book-read',
    'Have you read it?',
    'read',
    true
  );
  // book read checkbox
  form.appendChild(bookReadFormControl);
  containerDiv.appendChild(form);

  return containerDiv;
}
