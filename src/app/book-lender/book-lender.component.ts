import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from "../shared/models/book.model";
import {Lender} from "../shared/models/lender.module";
import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;
import {LenderService} from "./lender.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {BookService} from "../books/book.service";
import {User} from "../shared/models/user.model";
import {AuthService} from "../auth/auth.service";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-book-lender',
  templateUrl: './book-lender.component.html',
  styleUrls: ['./book-lender.component.css']
})
export class BookLenderComponent implements OnInit {

  constructor( private lenderService : LenderService, private bookService: BookService, private  authService: AuthService, private router: Router) {
    this.Usersubscription = this.authService.user$.subscribe(resultUser => {
      if ( resultUser !== undefined){
        this.user = resultUser;

      } else {
        this.user = null;

      }
    });
  }
  @Output() closeBookLender= new EventEmitter<void>();
  @Input() lender: Lender={
    readerName:'',
    bookName:'',
    bookCode:'',
    bookAuthor:'',
    lenderDate: Timestamp.now(),
    returnDate:Timestamp.now(),
    returned: false
  }
  user: User | null = null;
  Usersubscription = new  Subscription();
  yearRange = new Date().getFullYear();
  bookLenderDate: Date | null = null;
  bookReturnDate: Date | null = null;
  subscription = new Subscription();
  lenderBook :Book = {} as Book
  ngOnInit(): void {
  }
  onClose(){
    this.closeBookLender.emit();
    this.router.navigate(['/carti']);
  }
  onSubmit(ngForm: NgForm){
    this.onCreatLender();
  }
  onCreatLender() : void{
    this.subscription = this.bookService.getBookByCode(this.lender.bookCode).subscribe( book => {
      this.bookService.editLender(book);
      console.log(book.author);

    });
    const lenderDate = this.bookLenderDate ? this.bookLenderDate : new Date();
    const returnDate = this.bookReturnDate ? this.bookReturnDate : new Date();
    const lender ={
      ...this.lender,
    lenderDate: Timestamp.fromDate(lenderDate),
    returnDate: Timestamp.fromDate(returnDate)};
    this.lenderService.addLender(lender);
  }
}
