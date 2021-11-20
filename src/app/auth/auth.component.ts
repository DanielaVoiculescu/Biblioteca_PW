import {Component, OnDestroy, OnInit} from '@angular/core';
import {MyMessageService} from '../shared/my-message.service';
import {Message} from 'primeng/api';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy{

  isLoginMode = true;
  msg: Message[] = [];
  subscription = new Subscription();

  constructor(
    private myMessageService: MyMessageService
  ) { }

  ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

  ngOnInit(): void {
    this.subscription = this.myMessageService.msg.subscribe(message => {
      if (message === null){
        this.msg = [];
      } else {
        this.msg = [];
        this.msg[0] = message;
      }
    });
  }

  onChangingMode(): void{
    this.isLoginMode = !this.isLoginMode;
  }
}
