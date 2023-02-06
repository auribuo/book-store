import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {BookService} from "./shared/book-service";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { BookStoreServiceTestComponent } from './book-store-service-test/book-store-service-test.component';

@NgModule({
  declarations: [
    AppComponent,
    BookStoreServiceTestComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    {provide: "apiUrl", useValue: "http://localhost:3000"},
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
