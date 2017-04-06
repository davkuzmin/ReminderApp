import { Component } from '@angular/core';
import { ModalController, NavController, ToastController } from 'ionic-angular';
import { InfoModal } from '../../pages/reminder-modal/reminder-modal';

import Utils from '../../app/utils';

//import { LocalNotifications } from '@ionic-native/local-notifications'
//import { NotificationService } from '../../providers/notification-service';

import firebase from 'firebase';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'page-add-reminder',
  templateUrl: 'add-reminder.html',
})
export class AddReminder {
  private categories = ["Inspiration", "Motivation", "Lifestyle", "Family", "Fun", "Hobbies", "Ask a Question", "Product/Service", "Personal Story", "Business"];
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

  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController, public modalCtrl:ModalController) {
    this.reminder.datetime = Utils.getOffsetISOString();
  }

  saveReminder() {
    let self = this;

    if (this.isValidDate(this.reminder.datetime)) {
      firebase.database().ref(firebase.auth().currentUser.uid + '/' + this.reminder.id).set(this.reminder).then(() => {
        //this.notifications.scheduleNotification(this.reminder);
        self.savedToast().present();
        self.navCtrl.pop();
      }).catch(err => {
        this.errToast(err.message).present();
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

  errToast(msg: string) {
    return this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
    });
  }

  openInfo() {
    let myModal = this.modalCtrl.create(InfoModal);
    myModal.present();
  }






}
