import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { NotificationService } from '../../providers/notification-service';
import { ToastService } from '../../providers/toast-service';
import Utils from '../../app/utils';
import { UUID } from 'angular2-uuid';

import firebase from 'firebase';

@Component({
  selector: 'page-add-reminder',
  templateUrl: 'add-reminder.html',
})
export class AddReminder {
  private categories = ["Inspirational", "Motivational", "Lifestyle", "Family", "Fun", "Hobbies", "Ask a Question", "Product/Service", "Personal Story", "Business"];
  private types = ["Facebook", "Instagram", "Twitter", "Google+", "Other"];
  private medias = ["Text Only", "Image/Meme", "Video"];

  public reminder = {
    id: UUID.UUID(),
    datetime: '',
    category: this.categories[0],
    type: this.types[0],
    media: this.medias[0],
    notes: '',
    notified: false
  };

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private notifications: NotificationService,
    private toaster: ToastService,
  ) {
    this.reminder.datetime = Utils.getOffsetISOString();
  }

  saveReminder() {
    let user = firebase.auth().currentUser;

    if (this.isValidDate(this.reminder.datetime)) {
      firebase.database().ref('users/' + user.uid + '/reminders/' + this.reminder.id).set(this.reminder).then(() => {
        this.notifications.scheduleNotification(this.reminder);
        this.toaster.makeToast(this.reminder.type + ' reminder added');
        this.navCtrl.pop();
      }).catch(err => {
        this.toaster.makeToast(err.message);
      });
    } else {
      this.toaster.makeToast("Invalid date or time! Select a future date or time");
    }
  }

  isValidDate(isoDateString: string) {
    return Utils.getDateFromOffsetISOString(isoDateString) > new Date();
  }
}
