import { Component, OnInit } from '@angular/core';
import {User} from "../shared/models/user.model";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  subscription = new  Subscription();
  constructor(private router: Router,
              private authService: AuthService) {
    this.subscription = this.authService.user$.subscribe(resultUser => {
      if ( resultUser !== undefined){
        this.user = resultUser;

      } else {
        this.user = null;

      }
    });
  }

  ngOnInit(): void {
  }
  showAddPet=false;
  onHandleEditUser(): void{
    this.showAddPet = !this.showAddPet;
  }
}
