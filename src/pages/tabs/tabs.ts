import { Component } from '@angular/core';

import { RemindersPage } from '../reminders/reminders';
import { GuidesPage } from '../guides/guides';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = RemindersPage;
  tab2Root: any = GuidesPage;

  constructor() {

  }
}
