import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private angularFireAuth:AngularFireAuth) { }
  loginWithEmail(email: string, password: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }
  loginWithGoogle() {
    return this.angularFireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  loginWithFaccebook() {
    return this.angularFireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }
  loginWithTwitter() {
    return this.angularFireAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  }
  registerWithEmail(email: string, password: string) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  getStatus() {
    return this.angularFireAuth.authState;
  }
  logout() {
    return this.angularFireAuth.auth.signOut();
  }
}
