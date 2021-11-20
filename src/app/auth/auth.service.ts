import { Injectable } from '@angular/core';


import firebase from "firebase/compat/app";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Observable, of} from 'rxjs';

import {User} from '../shared/models/user.model';
import {map, switchMap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null | undefined>;
  usersCollection: AngularFirestoreCollection;
  users: Observable<User[]>;
  userList: User[] =[];
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/` + user.uid).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    this.usersCollection = this.afs.collection('users');
    this.users = this.usersCollection.snapshotChanges().pipe( map( changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as User;
        data.uid = a.payload.doc.id;
        return data;
      });
    }));
    this.users.subscribe(users =>{
      this.userList=users;
    })
  }



   logout(): Promise<void> {
    return this.afAuth.signOut();
  }

   updateUserData(user: any, displayName?:string, lastname?:string,address? :string,phoneNumber?: string, photoURL?: string): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      photoURL: photoURL ? photoURL : user.photoURL,
      displayName: displayName ? displayName : user.displayName,
      lastname: lastname ? lastname : user.lastname,
      address: address ? address : user.address,
      phoneNumber: phoneNumber ? phoneNumber : user.phoneNumber,
      roles: user.roles ? user.roles : {customer: true}
    };

    return userRef.set(data, {merge : true});
  }

  async emailAndPasswordSignIn(email: string, password: string, displayName: string, lastname: string,address : string,phoneNumber : string, photoURL?: string): Promise<void>{
    return this.afAuth.createUserWithEmailAndPassword(email, password).then( result => {
        this.updateUserData(result.user, displayName, lastname,address,phoneNumber, photoURL).catch((error) => {
          window.alert(error.message);
        });
      }
    );
  }

  async emailLogin(email: string, password: string): Promise<void> {
    return this.afAuth.signInWithEmailAndPassword(email, password).then( userResult => {
      /*this.updateUserData(userResult.user).catch((error) => {
        window.alert(error.message);
      });*/
    });
  }

  getUserPhoto(uid: string): Observable<string>{
    const userCollection = this.afs.collection('users');
    const docRef: AngularFirestoreDocument = userCollection.doc<User>(uid);
    return docRef.valueChanges().pipe(map( user => {
      if (user !== undefined) {
      return user.photoURL;
      }
      return '';
    }));
  }
  getCustomers():User[]{
    let usersList: User[]=[];
    for(var lnd in this.userList){
      if(this.userList[lnd].roles.customer == true){
        usersList.push(this.userList[lnd]);
      }
    }
    return usersList;
  }
  getLibrarian():User[]{
    let usersList: User[]=[];
    for(var lnd in this.userList){
      if(this.userList[lnd].roles.admin == true){
        usersList.push(this.userList[lnd]);
      }
    }
    return usersList;
  }

  addUser(user: User): Promise<any>{
    return this.afs.collection('users').add(user);
  }
  editUser(user: User): Promise<void>{
    const petRef: AngularFirestoreDocument<User> = this.afs.doc(`books/${user.uid}`);
    return petRef.set(user, {merge: true});
  }
  deleteUser(user:User): void{
    const bookRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    bookRef.delete();
  }
}
