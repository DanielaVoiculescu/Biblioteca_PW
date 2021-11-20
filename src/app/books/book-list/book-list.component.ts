import { Component, OnInit } from '@angular/core';
import {Book} from "../../shared/models/book.model";
import {User} from "../../shared/models/user.model";
import {Subscription} from "rxjs";
import {BookService} from "../book.service";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  user: User | null =null;
  BookList : Book[]=[];
  userSubscription= new Subscription();
  bookSubscription= new Subscription();
  constructor(private bookService: BookService, private authService: AuthService) { }
  ngOnInit(): void {
    this.bookSubscription= this.bookService.books.subscribe( books =>{
      this.BookList=books;
    });
    this.userSubscription=this.authService.user$.subscribe(user =>{
      if(user){
        this.user=user;
      }
    })
  }
  showEditPetMode = false;
  onHandleEditPetMode(): void{
    this.showEditPetMode = !this.showEditPetMode;
  }
  showLenderMode =false;
  onHandleLenderMode(): void{
    this.showLenderMode= !this.showLenderMode;
  }

}
