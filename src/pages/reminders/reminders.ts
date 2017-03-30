import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { ReminderView } from '../reminder-view/reminder-view';
import { AddReminder } from '../add-reminder/add-reminder';
import { LoginPage } from '../login/login';
import { OffsetISODate } from '../../app/pipes';

import Utils from '../../app/utils';

import firebase from 'firebase';
import { FireAuthService } from '../../providers/fire-auth-service';

import { LocalNotifications } from '@ionic-native/local-notifications'
import { NotificationService } from '../../providers/notification-service';

@Component({
  selector: 'page-reminders',
  templateUrl: 'reminders.html',
  providers: [FireAuthService, LocalNotifications, NotificationService]
})
export class RemindersPage {
  private loader = null;
  private reminders: Array<any> = [];

  constructor(public navCtrl: NavController,
    private auth: FireAuthService,
    private alertCtrl: AlertController,
    private notifications: NotificationService) { }

  ionViewWillEnter() {
    this.updateReminders();
  }

  updateReminders() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.database().ref(user.uid).once('value').then((snapshot) => {
          this.reminders = Utils.ObjToArray(snapshot.val());
          this.notifications.checkNotifications(this.reminders);
        });
      }
    });
  }

  addReminder() {
    this.navCtrl.push(AddReminder);
  }

  getSocialMediaIcon(type: string) {
    return Utils.getSocialMediaIcon(type);
  }

  viewReminder(reminder) {
    this.navCtrl.push(ReminderView, {
      reminder:reminder
    });
  }
}
