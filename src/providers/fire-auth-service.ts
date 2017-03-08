import { Injectable } from '@angular/core';
import firebase from 'firebase';

import 'rxjs/add/operator/map';

/*
  Generated class for the GuideService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
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
