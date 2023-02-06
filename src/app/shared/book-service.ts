import {Injectable} from "@angular/core";
import {Book} from "./book";

@Injectable()
export class BookService {
  private books: Book[] = [];

  constructor() {}

  public resetStore() {
    this.books = [];
  }

  public getAllBooks(): Book[] {
    return this.books;
  }

  public getAllBooksSearchTerm(searchTerm: string): Book[] {
    return this.books.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  public createBook(book: Book) {
    this.books.push(book);
  }

  public getBook(isbn: string): Book | undefined {
    return this.books.find(book => book.isbn === isbn);
  }

  public deleteBook(isbn: string) {
    this.books = this.books.filter(book => book.isbn !== isbn);
  }

  public checkBook(isbn: string): boolean {
    return this.books.some(book => book.isbn === isbn);
  }

  public rateBook(isbn: string, rating: number) {
    const book = this.getBook(isbn);
    if (book) {
      book.rating = rating;
    }
  }
}
