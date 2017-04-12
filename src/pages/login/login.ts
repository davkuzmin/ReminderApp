import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
    private fireAuth: FireAuthService,
  ) {}

  login(): void {
    this.fireAuth.login(this.email, this.password).then(() => {
      this.afterLoginRedirect();
    });
  }

  loginFacebook() {
    this.fireAuth.loginFacebook().then(() => {
      this.afterLoginRedirect();
    });
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  afterLoginRedirect() {
    this.navCtrl.setRoot(SchedulePage);
  }
}
