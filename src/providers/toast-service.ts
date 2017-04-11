import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

import firebase from 'firebase';

import 'rxjs/add/operator/map';

@Injectable()
export class ToastService {

  constructor(private toastCtrl: ToastController) {}

  makeToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: 'bottom'
    });

    toast.present();
  }
}
