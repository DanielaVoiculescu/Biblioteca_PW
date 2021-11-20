import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/models/user.model";
import {Book} from "../../shared/models/book.model";
import {Subscription} from "rxjs";
import {BookService} from "../../books/book.service";
import {AuthService} from "../../auth/auth.service";
import {Lender} from "../../shared/models/lender.module";
import {LenderService} from "../lender.service";

@Component({
  selector: 'app-lenders-list',
  templateUrl: './lenders-list.component.html',
  styleUrls: ['./lenders-list.component.css']
})
export class LendersListComponent implements OnInit {

  user: User | null =null;
  LenderList : Lender[]=[];
  userSubscription= new Subscription();

  constructor(private lenderService: LenderService, private authService: AuthService, private bookService:BookService) {

  }
  ngOnInit(): void {

    this.userSubscription=this.authService.user$.subscribe(user =>{
      if(user){
        this.user=user;

      }
    })
    this.lenderService.lenders.subscribe(lenders =>{
      this.LenderList=lenders;
    })


  }
  onSubmit(lender: Lender){
    // console.log(lender.bookCode);
    this.lenderService.makeReturn(lender);
    this.bookService.getBookByCode(lender.bookCode).subscribe( book =>{
      this.bookService.editRetur(book);
    })
  }

}
