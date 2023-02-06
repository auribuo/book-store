import {Inject, Injectable} from "@angular/core";
import {Book} from "./book";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Injectable()
export class BookService {

  constructor(@Inject("apiUrl") private apiUrl: string, private http: HttpClient) {
  }

  private path(path: string): string {
    return this.apiUrl + path;
  }

  public async resetStore(): Promise<HttpResponse<string> | HttpErrorResponse> {
    try {
      return await this.http.delete(this.path("/books"), {
        observe: 'response',
        responseType: 'text'
      }).toPromise();
    } catch (e) {
      return e as HttpErrorResponse
    }
  }

  public async getAllBooks(): Promise<HttpResponse<Book[]> | HttpErrorResponse> {
    try {
      return await this.http.get<Book[]>(this.path("/books"), {
        observe: 'response',
        responseType: 'json'
      }).toPromise()
    } catch (e) {
      return e as HttpErrorResponse
    }
  }

  public async getAllBooksSearchTerm(searchTerm: string): Promise<HttpResponse<Book[]> | HttpErrorResponse> {
    try {
      return await this.http.get<Book[]>(this.path("/books/search/" + searchTerm), {
        observe: 'response',
        responseType: 'json',
      }).toPromise()
    } catch (e) {
      return e as HttpErrorResponse
    }
  }

  public async createBook(book: Book): Promise<HttpResponse<string> | HttpErrorResponse> {
    try {
      return await this.http.post(this.path("/book"), book, {
        observe: 'response',
        responseType: 'text'
      }).toPromise()
    } catch (e) {
      return e as HttpErrorResponse
    }
  }

  public async getBook(isbn: string): Promise<HttpResponse<Book> | HttpErrorResponse> {
    try {
      return await this.http.get<Book>(this.path("/book/" + isbn), {
        observe: 'response',
        responseType: 'json'
      }).toPromise()
    } catch (e) {
      return e as HttpErrorResponse
    }
  }

  public async deleteBook(isbn: string): Promise<HttpResponse<string> | HttpErrorResponse> {
    try {
      return await this.http.delete(this.path("/book/" + isbn), {
        observe: 'response',
        responseType: 'text'
      }).toPromise()
    } catch (e) {
      return e as HttpErrorResponse
    }
  }

  public async updateBook(isbn: string, book: Book): Promise<HttpResponse<string> | HttpErrorResponse> {
    try {
      return await this.http.put(this.path("/book/" + isbn), book, {
        observe: 'response',
        responseType: 'text'
      }).toPromise()
    } catch (e) {
      return e as HttpErrorResponse
    }
  }

  public async checkBook(isbn: string): Promise<HttpResponse<string> | HttpErrorResponse> {
    try {
      return await this.http.get(this.path("/book/" + isbn + "/check"), {
        observe: 'response',
        responseType: 'text',
      }).toPromise()
    } catch (e) {
      return e as HttpErrorResponse
    }
  }

  public async rateBook(isbn: string, rating: number): Promise<HttpResponse<string> | HttpErrorResponse> {
    try {
      return await this.http.post(this.path("/book/" + isbn + "/rate"), {rating}, {
        observe: 'response',
        responseType: 'text'
      }).toPromise()
    } catch (e) {
      return e as HttpErrorResponse
    }
  }
}
