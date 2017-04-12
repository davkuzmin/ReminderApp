import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private facebook: Facebook,
    private toastCtrl: ToastController) {}

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
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      console.log(error.message);
    });
  }

  loginFacebook(): void {
    this.facebook.login(['email']).then( (response) => {
      const facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(response.authResponse.accessToken);

      firebase.auth().signInWithCredential(facebookCredential)
        .then((success) => {
          alert("Firebase success: " + JSON.stringify(success));
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
