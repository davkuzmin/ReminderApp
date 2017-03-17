import {Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component ({
	selector: 'reminder-view',
	templateUrl: 'reminder-view.html'
})

export class ReminderView {
	reminder: any;
	constructor(public navCtrl: NavController, public params: NavParams) {
		this.reminder = params.get('reminder')
	}

}