import {Component} from '@angular/core';
import {ViewController} from 'ionic-angular';

@Component ( {
	selector: 'reminder-modal',
	templateUrl: 'reminder-modal.html',
})

export class InfoModal {
	constructor(public viewCtrl: ViewController) {} 

	closeModal() {
		this.viewCtrl.dismiss();
	}
}