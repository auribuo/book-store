import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookStoreServiceTestComponent } from './book-store-service-test.component';

describe('BookStoreServiceTestComponent', () => {
  let component: BookStoreServiceTestComponent;
  let fixture: ComponentFixture<BookStoreServiceTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookStoreServiceTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookStoreServiceTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
