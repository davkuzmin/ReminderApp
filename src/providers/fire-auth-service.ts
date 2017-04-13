import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { ToastService } from './toast-service';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import firebase from 'firebase';

import 'rxjs/add/operator/map';

@Injectable()
export class FireAuthService {

  constructor(
    private toaster: ToastService,
    private facebook: Facebook,
    private platform: Platform,
  ) { }

  login(email: string, password: string): firebase.Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password).catch(e => {
      this.toaster.makeToast(e.message);
    });;
  }

  loginFacebook() {
    return this.platform.is('cordova') ? this.loginFacebookCordova() : this.loginFacebookDesktop();
  }

  loginFacebookDesktop(): firebase.Promise<any> {
    let provider = new firebase.auth.FacebookAuthProvider();

    return firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;

      return firebase.database().ref('users/' + user.uid).update(user.providerData[0]);
    }).catch(e => {
      this.toaster.makeToast(e.message);
    });
  }

  loginFacebookCordova(): Promise<FacebookLoginResponse> {
    return this.facebook.login(['email']).then(response => {
      const facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(response.authResponse.accessToken);

        return firebase.auth().signInWithCredential(facebookCredential).then((args) => {
          //alert(JSON.stringify(args));
        });
    }).catch((e) => {
      this.toaster.makeToast(e.message);
    });
  }

  logout(): firebase.Promise<any> {
    return firebase.auth().signOut().catch(e => {
      this.toaster.makeToast(e.message);
    });;
  }

  register(email: string, password: string, name?: string): firebase.Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email.trim(), password.trim()).then(user => {
      firebase.database().ref('users/' + user.uid).set({
        uid: user.uid,
        email: user.email,
        isAdmin: false,
        displayName: name.trim(),
      });
    }).catch(e => {
      this.toaster.makeToast(e.message);
    });
  }
}
