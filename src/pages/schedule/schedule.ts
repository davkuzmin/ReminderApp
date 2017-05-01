import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import firebase from 'firebase';

import Utils from '../../app/utils';
import { OffsetISODate } from '../../app/pipes';

import { NotificationService } from '../../providers/notification-service';

import { AddReminder } from '../add-reminder/add-reminder';
import { ViewReminder } from '../view-reminder/view-reminder';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  private loading = null;

  private reminders: any[] = [];
  private currentReminders: any[] = [];
  private pastReminders: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private notifications: NotificationService,
  ) {
    this.loading = this.loadingCtrl.create({
      content: 'Loading reminders...'
    });
    this.loading.present();

    let user = firebase.auth().currentUser;

    firebase.database().ref('users/' + user.uid + '/reminders').on('value', (snapshot) => {
      this.reminders = Utils.ObjToArray(snapshot.val());
      this.currentReminders = this.getCurrentReminders();
      this.pastReminders = Utils.arrayDiff(this.reminders, this.currentReminders);

      //this.notifications.onNotificationTap(this, this.viewReminder);

      this.loading.dismiss();
    });
  }

  add() {
    this.navCtrl.push(AddReminder);
  }

  edit(reminder) {
    this.navCtrl.push(AddReminder, { 'reminder': reminder });
  }

  delete(reminder) {
    let user = firebase.auth().currentUser;
    firebase.database().ref('users/' + user.uid + '/reminders/' + reminder.id).remove();
  }

  getSocialMediaIcon(type: string[]) {
    return Utils.getSocialMediaIcon(type);
  }

  getCurrentReminders() {
    let now = new Date();
    return this.reminders.filter(reminder => {
      return Utils.getDateFromOffsetISOString(reminder.datetime) >= now || reminder.repeat != 0;
    });
  }

  viewReminder(reminder) {
    //something going wrong here
    this.navCtrl.push(ViewReminder, { 'reminder': reminder });
  }
}
