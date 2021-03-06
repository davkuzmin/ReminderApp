import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { ViewGuide } from '../view-guide/view-guide';

import Utils from '../../app/utils';

import firebase from 'firebase';

@Component ({
	selector: 'page-view-reminder',
	templateUrl: 'view-reminder.html',
})

export class ViewReminder {
	reminder: any;
	correspondingGuide: any = null;

	constructor(public navCtrl: NavController,
		public params: NavParams,
		public alertCtrl: AlertController) {

		this.reminder = params.get('reminder');
	}

	getSocialMediaIcon(type: string[]) {
    return Utils.getSocialMediaIcon(type);
  }

	formatDate() {
		return Utils.formatDate(this.reminder.datetime);
	}

	repeatOn() {
		return this.reminder.repeat != 0 ? this.reminder.repeat : '';
	}

	confirmDelete() {
	  let alert = this.alertCtrl.create({
	    title: 'Confirm',
	    message: 'Do you want to delete this reminder?',
	    buttons: [
	      {
	        text: 'No',
	        role: 'cancel',
	      },
	      {
	        text: 'Yes',
	        handler: () => {
						this.delete();
	        }
	      }
	    ]
	  });
	  alert.present();
	}

	delete() {
		let user = firebase.auth().currentUser;
		firebase.database().ref('users/' + user.uid + '/reminders/' + this.reminder.id).remove().then(() => {
			this.navCtrl.pop();
		});
	}
}
