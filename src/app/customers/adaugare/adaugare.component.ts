import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {MyMessageService} from "../../shared/my-message.service";
import {NgForm} from "@angular/forms";
import {User} from "../../shared/models/user.model";

@Component({
  selector: 'app-adaugare',
  templateUrl: './adaugare.component.html',
  styleUrls: ['./adaugare.component.css']
})
export class AdaugareComponent implements OnInit {

  showUploader = false;
  photoURL = 'https://firebasestorage.googleapis.com/v0/b/pick-me--pet-shelter.appspot.com/o/user.png?alt=media&token=087556eb-24fe-4e08-8d35-a59c24f99cbf';
  photoPath = '';
  storageSubscription = new Subscription();
  urlSubscription = new Subscription();
  user: User | null =null;
  userSubscription= new Subscription();
  @Input() customer:User={
    displayName:'',
    lastname:'',
    email:'',
    address:'',
    password:'',
    photoURL:'',
    phoneNumber:'',
    roles: {customer:true}
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private storage: AngularFireStorage,
    private myMessageService: MyMessageService
  ) { }


  ngOnInit(): void {
  }

  onSignUp(form: NgForm): void{
    this.userSubscription = this.authService.user$.subscribe(user => {
        if (user){
          this.user = user;
          console.log(this.user.email);
        }
      }
    );
    this.authService.addUser(this.customer);

  }
}
