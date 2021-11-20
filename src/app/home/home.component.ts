import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";
import {LenderService} from "../book-lender/lender.service";
import {User} from "../shared/models/user.model";
import {Subscription} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  responsiveOptions: any;
  user: User | null =null;
  userSubscription= new Subscription();
  constructor(config: NgbCarouselConfig, private authService: AuthService) {
    config.interval = 2000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
    this.userSubscription = this.authService.user$.subscribe(user => {
        if (user){
          this.user = user;
          console.log(this.user.email);
        }
      }
    );
  }

  ngOnInit(): void {

  }
}
