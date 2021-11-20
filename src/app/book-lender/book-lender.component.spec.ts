import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookLenderComponent } from './book-lender.component';

describe('BookLenderComponent', () => {
  let component: BookLenderComponent;
  let fixture: ComponentFixture<BookLenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookLenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookLenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
