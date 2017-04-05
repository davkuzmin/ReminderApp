import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import Utils from '../app/utils';
import { LocalNotifications } from '@ionic-native/local-notifications';
/*
  Generated class for the Notification provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Notification {

  constructor(public notify: LocalNotifications) {
    console.log('Hello Notification Provider');
  }

  checkNotifications(reminders) {
    this.notify.hasPermission().then(val => {
      reminders.forEach(reminder => {
        this.notify.isScheduled(reminder.id).then((isScheduled) => {
          if (!isScheduled && !this.isOldReminder(reminder)) {
            this.scheduleNotification(reminder);
          }
        });
      });
    }).catch(err => { alert(err)});
  }

  scheduleNotification(reminder) {
    let info = reminder.category + ' ' + reminder.type + ' post(s)'
    let date = Utils.getDateFromOffsetISOString(reminder.datetime);
    let time = Utils.getTimeStringFromDate(date);

    this.notify.schedule({
      id: reminder.id,
      text: info + ' at ' + time,
      at: date
    });
  }

  isOldReminder(reminder): boolean {
    return Utils.getDateFromOffsetISOString(reminder.datetime) < new Date();
  }
}
