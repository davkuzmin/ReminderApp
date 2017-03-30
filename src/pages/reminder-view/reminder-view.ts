import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { ViewGuide } from '../view-guide/view-guide';
import { GuideService } from '../../providers/guide-service';

import firebase from 'firebase';

@Component ({
	selector: 'reminder-view',
	templateUrl: 'reminder-view.html',
	providers: [GuideService]
})

export class ReminderView {
	reminder: any;
	correspondingGuide: any = null;

	constructor(public navCtrl: NavController,
		public params: NavParams,
		public guideService: GuideService,
		public alertCtrl: AlertController) {
		this.reminder = params.get('reminder');

		//placeholder guide
		this.guideService.fetch().then((guides) => {
			this.correspondingGuide = guides.map((guide) => {
				return {
					title: guide.split(' ')[0],
					abbreviatedContent: guide.substring(0, 20) + '...',
					content: guide
				};
			})[0];
		});

	}

	onSwipe($event) { //http://stackoverflow.com/questions/36970425/determine-whether-a-swipe-event-is-for-a-left-swipe-or-a-right-swipe
		if ($event.direction == 2 && this.correspondingGuide) { //right to left swipe.
			this.navCtrl.push(ViewGuide, this.correspondingGuide);
    }
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
		firebase.database().ref(firebase.auth().currentUser.uid + '/' + this.reminder.id).remove().then(() => {
			this.navCtrl.pop();
		});
	}
}
