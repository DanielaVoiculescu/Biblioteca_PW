import {Component, Input, OnInit} from '@angular/core';
import {Lender} from "../../../shared/models/lender.module";

@Component({
  selector: 'app-user-leder-item',
  templateUrl: './user-leder-item.component.html',
  styleUrls: ['./user-leder-item.component.css']
})
export class UserLederItemComponent implements OnInit {
  @Input() lender!: Lender;
  @Input() lenderDate!: String;
  @Input() returnDate!: String;

  constructor() {
  }

  ngOnInit(): void {
    this.lenderDate = this.lender.lenderDate.toDate().getDay() + '/' + this.lender.lenderDate.toDate().getMonth() + '/' + this.lender.lenderDate.toDate().getFullYear();
    this.returnDate = this.lender.returnDate.toDate().getDay() + '/' + this.lender.returnDate.toDate().getMonth() + '/' + this.lender.returnDate.toDate().getFullYear();

  }
}
