import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ViewCommentsPage } from '../view-comments/view-comments';

@Component({
  selector: 'page-view-rockstar',
  templateUrl: 'view-rockstar.html'
})
export class ViewRockstarPage {
  private guide;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.guide = this.navParams.data;
  }

  viewComments(guide) {
    this.navCtrl.push(ViewCommentsPage, guide);
  }
}
