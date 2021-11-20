import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;

export interface Lender{

  readerName: string,
  bookName: string,
  bookCode: string,
  bookAuthor: string,
  lenderDate: Timestamp,
  returnDate: Timestamp,
  returned: boolean;
  id? : string;
}
