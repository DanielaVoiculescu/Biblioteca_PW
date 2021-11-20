import {Injectable} from "@angular/core";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Observable, Subscription} from "rxjs";
import {Book} from "../shared/models/book.model";
import {Lender} from "../shared/models/lender.module";
import {map} from "rxjs/operators";
import {BookService} from "../books/book.service";
import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;

@Injectable({
  providedIn:'root'
})
export class LenderService {
  lendersCollection: AngularFirestoreCollection;
  lenders: Observable<Lender[]>;
  lendersList: Lender[] = [];

  constructor(private afStorage: AngularFireStorage,
              private afs: AngularFirestore,
              private bookService: BookService) {
    this.lendersCollection = this.afs.collection('lenders');
    this.lenders = this.lendersCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Lender
        data.id = a.payload.doc.id;
        return data
      })
    }))
    this.lenders.subscribe(lenders => {
      this.lendersList = lenders;
    })
  }

  addLender(lender: Lender): Promise<any> {
    return this.afs.collection('lenders').add(lender);

  }

 /* getLenderList(username: string): Lender[] {
    let lenders: Lender[]=[];
    for(var lnd in this.lendersList){
      if(this.lendersList[lnd].readerName=== username){
        lenders.push(this.lendersList[lnd]);
      }
    }
    return lenders;
  }*/
  makeReturn(lender: Lender){
    const lenderref: AngularFirestoreDocument<Lender>=this.afs.doc(`lenders/${lender.id}`);
    const returnedLender={
      ...lender,
      returned: true,
      returnDate: Timestamp.now()
    }
    return lenderref.set(returnedLender,{merge:true});
  }

  getNonReturnLenders(): Lender[]{
    let lenders: Lender[]=[];
    for(var lnd in this.lendersList){
      if(this.lendersList[lnd].returned==false){
        lenders.push(this.lendersList[lnd]);
      }
    }
    return lenders;
  }

}
