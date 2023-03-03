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
    // bind instance methods' this keyword to the instance
    this.info = this.info.bind(this);
    this.toggleBookReadStatus = this.toggleBookReadStatus.bind(this);
  }
  info = () =>
    `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? 'read' : 'not read yet'
    }`;
  toggleBookReadStatus = () => {
    this.read = !this.read;
  };
}
