import {Injectable} from "@angular/core";
import {Book} from "../shared/models/book.model";
import {Observable, Subject} from "rxjs";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {map} from "rxjs/operators";

@Injectable({
  providedIn:'root'
})
export class BookService{
    editMode= new Subject<boolean>();
    booksCollection: AngularFirestoreCollection;
    books: Observable<Book[]>;
    bookList: Book[]=[];
    /*oldestBooksCollection: AngularFirestoreCollection;
    oldestBooks:Observable<Book[]>;*/
    constructor(private afStorage: AngularFireStorage, private afs: AngularFirestore) {
      this.booksCollection=this.afs.collection('books');
      this.books=this.booksCollection.snapshotChanges().pipe(map(changes=>{
        return changes.map(a =>{
          const data =a.payload.doc.data() as Book;
          data.id=a.payload.doc.id;
          return data;
        })
      }));

    }
  addBook(book: Book): Promise<any>{
    return this.afs.collection('books').add(book);
  }
  editBook(book: Book): Promise<void>{
    const petRef: AngularFirestoreDocument<Book> = this.afs.doc(`books/${book.id}`);
    return petRef.set(book, {merge: true});
  }
  deleteBook(book:Book): void{
    const bookRef: AngularFirestoreDocument<Book> = this.afs.doc(`books/${book.id}`);
    bookRef.delete();
  }
  existBook(code: string): boolean{
    const bookRef: AngularFirestoreDocument<Book> = this.afs.doc(`books/${code}`);
    if(bookRef){
      return true;
    }
    else {
      return false;
    }
  }
  editLender(book: Book): Promise<void>{
    const formRef: AngularFirestoreDocument<Book> = this.afs.doc(`books/${book.id}`);
    const Lender: Book = {
      ...book,
      lender: true,
    };
    return formRef.set(Lender, {merge: true});
  }
  getBookByCode(code: string):Observable<Book>{
    const docRef: AngularFirestoreDocument = this.booksCollection.doc<Book>(code);
    return docRef.valueChanges().pipe(map(book =>{
      return{
        ...book,
        id:code
      }
    })) as Observable<Book>
  }
  editRetur(book:Book):Promise<void>{
    const formRef: AngularFirestoreDocument<Book> = this.afs.doc(`books/${book.id}`);
    const Lender: Book = {
      ...book,
      lender: false,
    };
    return formRef.set(Lender, {merge: true});
  }

}
