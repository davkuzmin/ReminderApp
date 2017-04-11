import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AddRockstarPage } from '../add-rockstar/add-rockstar';
import { ViewRockstarPage } from '../view-rockstar/view-rockstar';

import { GuideService } from '../../providers/guide-service';
import Utils from '../../app/utils';

import firebase from 'firebase';

@Component({
  selector: 'page-rockstar',
  templateUrl: 'rockstar.html',
  providers: [GuideService],
})
export class RockstarPage {
  private user: any = null;
  private guides = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public guideService: GuideService,
  ) {
    this.getUser().then(() => {
      this.guideService.getGuides().then((guides) => {
        this.guides = guides;
      });
    });
  }

  ionViewWillEnter() {
    this.updateGuides();
  }

  updateGuides() {
    return this.getUser().then(() => {
      this.guideService.getGuides().then((guides) => {
        this.guides = guides;
      });
    });
  }

  getUser() {
    let user = firebase.auth().currentUser;

    return firebase.database().ref('users/' + user.uid).once('value').then((snapshot) => {
      this.user = snapshot.val();
    });
  }

  isAdmin() {
    return this.user ? this.user.isAdmin : false;
  }

  addGuide() {
    this.navCtrl.push(AddRockstarPage, this.user);
  }

  numComments(guide) {
    return guide.comments ? guide.comments.length : 0;
  }

  numLikes(guide) {
    return guide.likes ? guide.likes.length : 0;
  }

  timeAgo(guide) {
    return Utils.getSmartDateTimeString(guide.createdOn);
  }

  viewGuide(guide) {
    this.navCtrl.push(ViewRockstarPage, guide);
  }
}
