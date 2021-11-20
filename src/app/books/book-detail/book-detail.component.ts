import {Component, Input, OnInit, Output} from '@angular/core';
import {Book} from "../../shared/models/book.model";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {BookService} from "../book.service";
import {EventEmitter} from "@angular/core";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {




  constructor(
    private router: Router,
    private petService: BookService
  ) { }

  ngOnInit(): void {
    /*this.birthDate =
      '' +
      this.pet.birthDate.toDate().getDate() + '/' +
      (this.pet.birthDate.toDate().getMonth() + 1) + '/' +
      this.pet.birthDate.toDate().getFullYear();*/
  }




}
