import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import Utils from '../../app/utils';

import firebase from 'firebase';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'page-add-reminder',
  templateUrl: 'add-reminder.html'
})
export class AddReminder {
  private categories = ["Inspirational", "Motivational", "Thoughtful", "Persuasive"];
  private types = ["Facebook", "Twitter", "Google+"];
  private medias = ["Text", "Image", "Video"];

  public reminder = {
    id: UUID.UUID(),
    datetime: '',
    category: this.categories[0],
    type: this.types[0],
    media: this.medias[0],
    notes: '',
    notified: false
  };

  constructor(public navCtrl: NavController, private toastCtrl: ToastController) {
    this.reminder.datetime = Utils.getOffsetISOString();
  }

  saveReminder() {
    let self = this;

    if (this.isValidDate(this.reminder.datetime)) {
      firebase.database().ref(firebase.auth().currentUser.uid + '/' + this.reminder.id).set(this.reminder).then(() => {
        self.savedToast().present();
        self.navCtrl.pop();
      });
    } else {
      this.invalidDateToast().present();
    }
  }

  isValidDate(isoDateString: string) {
    return Utils.getDateFromOffsetISOString(isoDateString) > new Date();
  }

  savedToast() {
    return this.toastCtrl.create({
      message: this.reminder.type + ' reminder added',
      duration: 2000,
      position: 'bottom'
    });
  }

  invalidDateToast() {
    return this.toastCtrl.create({
      message: 'Invalid date or time!',
      duration: 2000,
      position: 'bottom',
    });
  }
}
