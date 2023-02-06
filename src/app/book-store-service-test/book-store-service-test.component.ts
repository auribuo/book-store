import {Component} from '@angular/core';
import {BookService} from "../shared/book-service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Book} from "../shared/book";
import {BookFactory} from "../shared/book-factory";

@Component({
  selector: 'bs-book-store-service-test',
  templateUrl: './book-store-service-test.component.html',
  styleUrls: ['./book-store-service-test.component.scss']
})
export class BookStoreServiceTestComponent {

  constructor(private bookService: BookService) {
  }

  result!: HttpResponse<Book[] | Book | string> | HttpErrorResponse
  data!: Book[];
  error!: string
  dataString!: string;
  randomBook!: Book | null;

  private populateData(): void {
    if (this.result && this.result.ok) {
      this.error = ""
      if (this.result.body) {
        if (Array.isArray(this.result.body)) {
          this.data = this.result.body;
          this.dataString = ""
        } else if (typeof this.result.body === "object") {
          this.data = [this.result.body];
          this.dataString = ""
        } else if (typeof this.result.body === "string") {
          this.data = [];
          this.dataString = this.result.body;
        }
      } else {
        this.data = [];
      }
    } else {
      this.error = (this.result as HttpErrorResponse).error;
    }
  }

  stringifyAuthors(authors: string[]): string {
    return authors.join(",");
  }

  async handleResetBookStoreButtonClicked(): Promise<void> {
    this.result = await this.bookService.resetStore()
    this.populateData()
    this.randomBook = null;
  }

  async handleGetAllBooksButtonClicked(): Promise<void> {
    this.result = await this.bookService.getAllBooks()
    this.populateData()
    this.randomBook = null;
  }

  async handleGetSearchTermBooks(searchTerm: string): Promise<void> {
    if (searchTerm === "") {
      return Promise.resolve()
    }
    this.result = await this.bookService.getAllBooksSearchTerm(searchTerm)
    this.populateData()
    this.randomBook = null;
  }

  async handleCreateRandomBook(): Promise<void> {
    const rngBook = BookFactory.random()
    this.result = await this.bookService.createBook(rngBook)
    if (this.result.ok) {
      this.randomBook = rngBook;
    }
    this.populateData()
  }

  async handleCreateRandomBookAgain(): Promise<void> {
    const rngBook = <Book>{
      ...BookFactory.random(),
      isbn: this.randomBook?.isbn
    }
    this.result = await this.bookService.createBook(rngBook)
    if (this.result.ok) {
      this.randomBook = rngBook;
    }
    this.populateData()
    this.randomBook = null;
  }

  async handleDeleteBook(isbn: string): Promise<void> {
    if (isbn === "") {
      return Promise.resolve()
    }
    this.result = await this.bookService.deleteBook(isbn)
    this.populateData()
    this.randomBook = null
  }

  async handleRateBook(isbn: string, rating: string) {
    if (isbn === "" || rating === "") {
      return Promise.resolve()
    }
    const ratingInt = parseInt(rating)
    this.result = await this.bookService.rateBook(isbn, ratingInt)
    this.populateData()
    this.randomBook = null
  }

  async handleCheckBook(isbn: string): Promise<void> {
    if (isbn === "") {
      return Promise.resolve()
    }
    this.result = await this.bookService.checkBook(isbn)
    this.populateData()
    this.randomBook = null
  }

  async handleUpdateBook(isbn: string) {
    if (isbn === "") {
      return Promise.resolve()
    }
    const newBook = <Book>{
      ...BookFactory.random(),
      isbn: isbn
    }
    this.result = await this.bookService.updateBook(isbn, newBook)
    this.populateData()
    this.randomBook = null
  }

  async handleGetBook(isbn: string) {
    if (isbn === "") {
      return Promise.resolve()
    }
    this.result = await this.bookService.getBook(isbn)
    this.populateData()
    this.randomBook = null
  }

}
