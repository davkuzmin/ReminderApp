import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { ToastService } from './toast-service';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import firebase from 'firebase';

import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(
    private toaster: ToastService,
    private facebook: Facebook,
    private platform: Platform,
  ) { }

  getCurrentUser(): firebase.Promise<any> {
    let user = firebase.auth().currentUser;
    return firebase.database().ref('users/' + user.uid).once('value').then((snap) => {
      return snap.val();
    });
  }
}
