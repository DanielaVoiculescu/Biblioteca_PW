import {Component, Input, OnInit, Output} from '@angular/core';
import {EventEmitter} from "@angular/core";
import {Book} from "../../shared/models/book.model";
// import firebase from "firebase/compat";
// import Timestamp = firebase.firestore.Timestamp;
import {Router} from "@angular/router";
import {BookService} from "../book.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Subscription} from "rxjs";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  @Input() book: Book={
    name:'',
    description:'',
    author:'',
    photoURL:'',
    year: 0,
    code:'',
    lender:false,

  }
  photoURL = 'https://thumbs.dreamstime.com/b/book-icon-reading-concept-vector-graphic-book-icon-reading-concept-vector-graphic-book-icon-image-black-white-vector-158687730.jpg';
  photoPath = '';
  yearRange = new Date().getFullYear();
  storageSubscription = new Subscription();
  urlSubscription = new Subscription();
  year = 0;
  showUploader=false;
  @Input() editMode=false;
  edit=false;
  constructor(
    private router: Router,
    private bookService: BookService,
    private storage: AngularFireStorage
  ) { }

  @Output() closeBookEdit =new EventEmitter<void>();
  ngOnInit(): void {
    if(this.book.name !==''){
      this.photoURL=this.book.photoURL;
    }
    if(this.book.photoURL ===''){
      this.showUploader=true;
    }
  }
  onClose(){
    if(this.photoPath !==''){
      this.storage.ref(this.photoPath).delete()
    }
    this.closeBookEdit.emit();
    this.router.navigate(['/carti']);
  }
  onCreateBook():void{
    const book={
      ... this.book,
      photoURL: this.photoURL,
      photoPath: this.photoPath,
    }
    this.bookService.addBook(book).then(() =>{
      this.photoURL='';
      this.photoPath='';
      this.onClose();
    })
  }
  onSubmit(form :NgForm): void{
    if(!this.editMode){
      this.onCreateBook();
    }
    else {
       this.onEditBook();
    }
    form.reset();
  }
  async onUpload(event: any): Promise<void> {
    if (this.photoPath !== ''){
      this.storage.ref(this.photoPath).delete();
    }
    const file = event.files[0] as File;
    const path = `books/${file.name}_${Date.now()}`;
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

  onHandleUploader(): void{
    this.showUploader = !this.showUploader;
  }
  onEditBook(): void {

    if (this.photoPath !== '' && this.book.photoPath !== '') {
      if (this.book.photoPath) {
        this.storage.ref(this.book.photoPath).delete();
      }
    }
    const book = {
      ...this.book,
      photoPath: this.photoPath,
      photoURL: this.photoURL === '' ? this.book.photoURL : this.photoURL,

    };
    this.bookService.editBook(book).then(() => {
      this.photoURL = '';
      this.photoPath = '';
      this.onClose();
    });
  }
  onHandleEdit(){
    this.edit=! this.edit;
  }

}
