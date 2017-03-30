import { Injectable } from '@angular/core';
import firebase from 'firebase';

import 'rxjs/add/operator/map';

@Injectable()
export class FireAuthService {
  data: any;

  constructor() { }

  login(email: string, password: string): firebase.Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout(): firebase.Promise<any> {
    return firebase.auth().signOut();
  }
}
