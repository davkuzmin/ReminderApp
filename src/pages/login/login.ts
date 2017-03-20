import { Component, NgZone } from '@angular/core';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';

import { NavController, ToastController } from 'ionic-angular';

import firebase from 'firebase';
import { FireAuthService } from '../../providers/fire-auth-service'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [FireAuthService]
})
export class LoginPage {
  public email;
  public password;

  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    private auth: FireAuthService,
    private zone: NgZone) { }

  login() {
    let self = this;

    return firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
      //https://forum.ionicframework.com/t/after-setroot-tabspage-the-default-tab-page-appears-twice/71770/10
      this.zone.run(() => {
        this.navCtrl.setRoot(TabsPage, {}, {animate: false});
      });
    }).catch(function(error) {
      this.invalidLogin();
    });
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  invalidLogin() {
    let toast = this.toastCtrl.create({
      message: 'Invalid Credentials',
      duration: 2500,
      position: 'bottom'
    });

    toast.present();
  }
}
