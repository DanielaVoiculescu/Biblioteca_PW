import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
// import {AngularFireStorage} from '@angular/fire/storage';
import {MyMessageService} from '../../shared/my-message.service';
import {Subscription} from 'rxjs';
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-email-sign-up',
  templateUrl: './email-sign-up.component.html',
  styleUrls: ['./email-sign-up.component.css']
})
export class EmailSignUpComponent implements OnInit {

  showUploader = false;
  photoURL = 'https://firebasestorage.googleapis.com/v0/b/pick-me--pet-shelter.appspot.com/o/user.png?alt=media&token=087556eb-24fe-4e08-8d35-a59c24f99cbf';
  photoPath = '';
  storageSubscription = new Subscription();
  urlSubscription = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private storage: AngularFireStorage,
    private myMessageService: MyMessageService
  ) { }

  // ngOnDestroy(): void {
  //   if (this.photoPath !== ''){
  //     this.storage.ref(this.photoPath).delete();
  //   }
  // }

  ngOnInit(): void {
  }

  onSignUp(form: NgForm): void{
    let isError = false;
    this.authService.emailAndPasswordSignIn(
      form.value.email,
      form.value.password,
      form.value.displayName,
      form.value.lastname,
      form.value.address,
      form.value.phoneNumber,
      this.photoPath !== '' ? this.photoURL : undefined).then(() => {
        this.photoPath = '';
        this.router.navigate(['/home-page']);
      }
    ).catch(error => {
      isError = true;
      this.myMessageService.addMessage({severity: 'error', summary: 'Error:', detail: error.message});
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

  onHandleUploader(): void{
    this.showUploader = !this.showUploader;
  }

  async onUpload(event: any): Promise<void> {
    if (this.photoPath !== ''){
      this.storage.ref(this.photoPath).delete();
    }
    const file = event.files[0] as File;
    const path = `users/${file.name}_${Date.now()}`;
    this.storageSubscription = this.storage.upload(path, file)
      .snapshotChanges()
      .subscribe( (result) => {
          if (result?.state === 'success') {
            this.urlSubscription = this.storage.ref(path)
              .getDownloadURL()
              .subscribe(rez => {
                this.photoURL = rez;
                this.photoPath = path;
                this.onHandleUploader();
              });
          }
        }
      );
  }
}
