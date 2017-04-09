import { Injectable } from '@angular/core';
import Utils from '../app/utils';

import { LocalNotifications } from '@ionic-native/local-notifications'

@Injectable()
export class NotificationService {

  constructor(
    public notify: LocalNotifications
  ) { }

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
    let info = reminder.category + ' ' + reminder.type
    let date = Utils.getDateFromOffsetISOString(reminder.datetime);
    let time = Utils.getTimeStringFromDate(date);

    this.notify.schedule({
      id: reminder.id,
      text: 'You have a ' + info + ' at ' + time,
      at: date
    });
  }

  isOldReminder(reminder): boolean {
    return Utils.getDateFromOffsetISOString(reminder.datetime) < new Date();
  }
}
