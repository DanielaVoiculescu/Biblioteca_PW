import {Component, OnInit, Output} from '@angular/core';
import {User} from "../../shared/models/user.model";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {NgForm} from "@angular/forms";
import {EventEmitter} from "@angular/core";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: User | null = null;
  subscription = new  Subscription();
  constructor(private router: Router,
              private authService: AuthService,
              private storage: AngularFireStorage) {
    this.subscription = this.authService.user$.subscribe(resultUser => {
      if ( resultUser !== undefined){
        this.user = resultUser;

      } else {
        this.user = null;

      }
    });
  }
  @Output() closeBookEdit = new EventEmitter<void>();
  ngOnInit(): void {
  }
  showUploader=false;
  onHandleUploader(): void{
    this.showUploader = !this.showUploader;
  }
  photoPath = '';
  storageSubscription = new Subscription();
  urlSubscription = new Subscription();
  photoURL = this.user?.photoURL;

  async onUpload(event: any): Promise<void> {
    if (this.photoPath !== ''){
      this.storage.ref(this.photoPath).delete();
    }
    const file = event.files[0] as File;
    const path = `users/${file.name}_${Date.now()}`;
    console.log(path);
    this.storageSubscription = this.storage.upload(path, file)
      .snapshotChanges()
      .subscribe( (result) => {
          if (result?.state === 'success') {
            this.urlSubscription = this.storage.ref(path)
              .getDownloadURL()
              .subscribe(rez => {
                this.photoURL = rez;
                this.photoPath = path;

              });
          }
        }
      );
  }
  onSubmit(ngForm: NgForm){
    this.authService.updateUserData(this.user,ngForm.value.displayName,ngForm.value.lastname,ngForm.value.address,ngForm.value.phoneNumber,this.photoURL);

  }
  onClose(){
    // this.router.navigate(['/profile']);
    this.closeBookEdit.emit();
  }
}
