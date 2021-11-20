import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/models/user.model";
import {Lender} from "../../shared/models/lender.module";
import {Subscription} from "rxjs";
import {LenderService} from "../lender.service";
import {AuthService} from "../../auth/auth.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-user-lenders-list',
  templateUrl: './user-lenders-list.component.html',
  styleUrls: ['./user-lenders-list.component.css']
})
export class UserLendersListComponent implements OnInit {
  user: User | null =null;
  name: string='';
  LenderList : Lender[]=[];
  LenderUserList: Lender[]=[];
  userSubscription= new Subscription();
  // lenderSubscription= new Subscription();
  constructor(private lenderService: LenderService, private authService: AuthService,private afs: AngularFirestore) {

    /*// console.log(this.user?.email);
    for (var lnd in this.LenderList){
      // if(this.user != undefined){
      //   if(this.LenderList[lnd].readerName == this.user?.displayName){
      //     //   this.LenderUserList.push(this.LenderList[lnd]);
      //     console.log('ana')
      //   }
      // }
      // console.log(this.LenderList[lnd].readerName);
      // console.log(this.user?.email);
    }*/
  }
  ngOnInit(): void {
    // this.LenderList=this.lenderService.getLenderList();
    this.userSubscription = this.authService.user$.subscribe(resultUser => {
      if ( resultUser !== undefined){
        this.user = resultUser;
      }
      else {
        this.user=null;
      }
    });
    this.lenderService.lenders.subscribe(lenders =>{
      this.LenderList=lenders;
      // console.log(this.LenderList[0].lenderDate.toDate().toDateString())

    })
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
