import {Component, Input, OnInit} from '@angular/core';
import {Lender} from "../../../shared/models/lender.module";

@Component({
  selector: 'app-lender-item',
  templateUrl: './lender-item.component.html',
  styleUrls: ['./lender-item.component.css']
})
export class LenderItemComponent implements OnInit {
  @Input() lender! :Lender;
  @Input() lenderDate!: String;
  @Input() returnDate!:String;
  constructor() { }

  ngOnInit(): void {
    this.lenderDate=this.lender.lenderDate.toDate().getDay()+'/'+this.lender.lenderDate.toDate().getMonth()+'/'+this.lender.lenderDate.toDate().getFullYear();
    this.returnDate=this.lender.returnDate.toDate().getDay()+'/'+this.lender.returnDate.toDate().getMonth()+'/'+this.lender.returnDate.toDate().getFullYear();

  }

}
