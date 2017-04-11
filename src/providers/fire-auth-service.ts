import { Injectable } from '@angular/core';
import { ToastService } from './toast-service';

import firebase from 'firebase';

import 'rxjs/add/operator/map';

@Injectable()
export class FireAuthService {

  constructor(private toaster: ToastService) { }

  login(email: string, password: string): firebase.Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout(): firebase.Promise<any> {
    return firebase.auth().signOut();
  }

  register(email: string, password: string): firebase.Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email.trim(), password.trim()).then(user => {
      firebase.database().ref('users/' + user.uid).set({
        uid: user.uid,
        email: user.email,
        isAdmin: false,
      });
    }).catch(e => {
      this.toaster.makeToast(e.message);
    });
  }
}
