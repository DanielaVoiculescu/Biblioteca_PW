import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../../../shared/models/book.model";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {BookService} from "../../book.service";
import {User} from "../../../shared/models/user.model";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {
  @Input()
  book!: Book;
  showEditBookMode=false;
  user: User | null = null;
  subscription = new  Subscription();
  constructor(
    private router: Router,
    private authService: AuthService,
    private bookService:BookService
  ) {
    this.subscription = this.authService.user$.subscribe(resultUser => {
      if ( resultUser !== undefined){
        this.user = resultUser;

      } else {
        this.user = null;

      }
    });
  }

  ngOnInit(): void{
    console.log(this.book.lender)
  }
  onHandleEditBookMode(): void{
    this.showEditBookMode = !this.showEditBookMode;
  }
  onDelete(): void{
    this.bookService.deleteBook(this.book);
  }




}
