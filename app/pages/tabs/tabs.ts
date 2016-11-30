import {Component} from '@angular/core';
import {SetupPage} from '../setup/setup';
import {MemorizePage} from '../memorize/memorize';
import {ContactPage} from '../contact/contact';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = SetupPage;
    this.tab2Root = MemorizePage;
    this.tab3Root = ContactPage;
  }
}
