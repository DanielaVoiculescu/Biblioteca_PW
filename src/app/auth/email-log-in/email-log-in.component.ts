import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {User} from '../../shared/models/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {MyMessageService} from '../../shared/my-message.service';

@Component({
  selector: 'app-email-log-in',
  templateUrl: './email-log-in.component.html',
  styleUrls: ['./email-log-in.component.css']
})
export class EmailLogInComponent implements OnInit {

  user: User | undefined | null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private myMessageService: MyMessageService
  ) { }

  ngOnInit(): void {
  }

  onLogIn(form: NgForm): void{
    let isError = false;
    this.authService.emailLogin(form.value.email, form.value.password).catch(error => {
      isError = true;
      this.myMessageService.addMessage({severity: 'error', summary: 'Error:', detail: 'Email-ul sau parola incorecte'});
    }).then(() => {
      if (!isError){
        this.route.queryParams.subscribe(params => {
          if (params.returnUrl !== undefined) {
            this.router.navigate(['/'  + params.returnUrl]);
          } else {
            this.router.navigate(['/home-page']);
          }
        }).unsubscribe();
      }
    });
  }
}
