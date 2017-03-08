import { Component } from '@angular/core';

import { NavController, ToastController } from 'ionic-angular';

import firebase from 'firebase';

@Component({
  selector: 'page-add-reminder',
  templateUrl: 'add-reminder.html'
})
export class AddReminder {
  public reminder = {
    date: new Date().toISOString(),
    time: '',
    category: '',
    type: '',
    notes: ''
  };


  constructor(public navCtrl: NavController, private toastCtrl: ToastController) {

  }

  saveReminder() {
    let self = this;

    var ref = firebase.database().ref(firebase.auth().currentUser.uid).push();
    ref.set(this.reminder).then(() => {
      self.savedToast();
      self.navCtrl.pop();
    });
  }

  savedToast() {
    let toast = this.toastCtrl.create({
      message: 'Reminder added',
      duration: 2000,
      position: 'bottom'
    });

    toast.present();
  }
}
