import {Component} from '@angular/core';

//import { HomePage } from '../home/home';
import {SetupPage} from '../setup/setup';
import {MemorizePage} from '../memorize/memorize';
import {ContactPage} from '../contact/contact';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = SetupPage;
  tab2Root: any = MemorizePage;
  tab3Root: any = ContactPage;

  constructor() {

  }
}
