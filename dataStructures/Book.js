/** Describes a Book. */
export class Book {
  constructor(
    title = 'Unknown Title',
    author = 'Unknown Author',
    pages = 1,
    read = false
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  info = () =>
    `${this.title} by ${this.author}, ${this.pages} pages, ${
      read ? 'read' : 'not read yet'
    }`;
  toggleBookReadStatus = () => {
    this.read = !this.read;
  };
}
