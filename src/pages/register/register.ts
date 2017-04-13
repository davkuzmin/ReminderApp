import { Component } from '@angular/core';
import { HowToPage } from '../how-to/how-to';

import { NavController } from 'ionic-angular';
import { FireAuthService } from '../../providers/fire-auth-service';

import firebase from 'firebase';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  private displayName: string = "";
  public email: string = "";
  public password: string = "";

  constructor(
    public navCtrl: NavController,
    private fireAuth: FireAuthService,
  ) {

  }

  register() {
    this.fireAuth.register(this.email, this.password, this.displayName);
  }
}
