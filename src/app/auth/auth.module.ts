import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {PrimengModule} from '../primeng.module';



import {EmailSignUpComponent} from './email-sign-up/email-sign-up.component';
import {EmailLogInComponent} from './email-log-in/email-log-in.component';
import {AuthComponent} from './auth.component';

import {LoginGuard} from '../shared/guards/login.guard';



@NgModule({
  declarations: [

    EmailSignUpComponent,
    EmailLogInComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimengModule,

    RouterModule.forChild([
      {path: '', component: AuthComponent, canActivate: [LoginGuard]},
    ])
  ],
    exports: [
        EmailSignUpComponent
    ]
})
export class AuthModule { }
