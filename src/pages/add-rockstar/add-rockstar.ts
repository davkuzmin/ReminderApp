import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GuideService } from '../../providers/guide-service';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'page-add-rockstar',
  templateUrl: 'add-rockstar.html',
  providers: [GuideService],
})
export class AddRockstarPage {
  private user: any;
  private guide = {
    id: UUID.UUID(),
    title: "",
    content: ""
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private guideService: GuideService,
  ) {
    this.user = this.navParams.data;
  }

  saveGuide() {
    this.guideService.save(this.guide).then(() => {
      this.navCtrl.pop();
    });
  }
}
