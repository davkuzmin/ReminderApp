import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { GuideService } from '../../providers/guide-service';
import { ViewGuide } from '../view-guide/view-guide'

@Component({
  selector: 'page-guides',
  templateUrl: 'guides.html',
  providers: [GuideService]
})
export class GuidesPage {
  public guides: Array<any> = [];

  constructor(public navCtrl: NavController, public guideService: GuideService) {
    this.loadGuides();
  }

  loadGuides() {
    return this.guideService.load().then((data) => {
      this.guides = data.map((guide) => {
        return {
          title: guide.split(' ')[0],
          abbreviatedContent: guide.substring(0, 20) + '...',
          content: guide
        };
      });
    });
  }

  viewGuide(guide) {
    this.navCtrl.push(ViewGuide, guide);
  }
}
