import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  guides = [{
    title: "myTitle",
    category: "myCategory",
    computedText: "myText"
  },{
    title: "myTitle",
    category: "myCategory",
    computedText: "myText"
  },{
    title: "myTitle",
    category: "myCategory",
    computedText: "myText"
  },{
    title: "myTitle",
    category: "myCategory",
    computedText: "myText"
  }];

  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
    console.log('component initialized!');
  }

}
