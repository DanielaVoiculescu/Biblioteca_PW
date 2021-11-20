import {Component, Input, OnInit} from '@angular/core';
import {User} from "../shared/models/user.model";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
   customers: User[]=[];
   customer: User|null=null;
  constructor(private authService: AuthService) {
    // this.customers=authService.getCustomers();
    this.authService.users.subscribe(users=>{
      this.customers=users;
    })
  }

  ngOnInit(): void {
  }
  adaugaAbonat=false;
  AdaugaAbonat(){
    this.adaugaAbonat=!this.adaugaAbonat;
  }
  deleteCustomer(user:User):void{
  this.authService.deleteUser(user);
  }
  showAddPet=false;
  onHandleEditCustomer(customer:User): void{
    this.showAddPet = !this.showAddPet;
    this.customer=customer;
  }

}
