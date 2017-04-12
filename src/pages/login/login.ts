import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform } from 'ionic-angular';

import { Facebook } from '@ionic-native/facebook';
import { FireAuthService } from '../../providers/fire-auth-service';
import firebase from 'firebase';

import { HowToPage } from '../how-to/how-to';
import { RegisterPage } from '../register/register';
import { SchedulePage } from '../schedule/schedule';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public email = '';
  public password = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private facebook: Facebook,
    private toastCtrl: ToastController,
    private platform: Platform,
  ) {}

  login(email: string, password: string): void {
    firebase.auth().signInWithEmailAndPassword(this.email.trim(), this.password.trim()).then(res => {
      this.afterLoginRedirect();
    }).catch(e => {
      this.error(e);
    });
  }

  loginFacebookDesktop() {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;

      this.afterLoginRedirect();
    }).catch(function(error) {
      console.log(error.message);
    });
  }

  loginFacebook() {
    if (this.platform.is('cordova')) {
      this.loginFacebookCordova();
    } else {
      this.loginFacebookDesktop();
    }
  }

  loginFacebookCordova(): void {
    this.facebook.login(['email']).then( (response) => {
      const facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(response.authResponse.accessToken);

      firebase.auth().signInWithCredential(facebookCredential)
        .then((success) => {
          this.afterLoginRedirect();
        })
        .catch((error) => {
          alert("Firebase failure: " + error.message);
      });

    }).catch((error) => { alert(error) });
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  afterLoginRedirect() {
    this.navCtrl.setRoot(SchedulePage);
  }

  error(e) {
    let toast = this.toastCtrl.create({
      message: e.message,
      duration: 5000,
      position: 'bottom'
    });

    toast.present();
  }
}
