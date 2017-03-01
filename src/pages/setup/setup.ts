import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MemorizeServices as MemorizeService} from '../../services';
import {MemorizePage} from '../memorize/memorize';

@Component({
  selector: 'setup-page',
  templateUrl: 'setup.html',
  providers: [MemorizeService],
})
export class SetupPage {
  fullText: string[] = ['uninitialized','string:','list', 'fullText'];
  textList: string [] = ['uninitialized','string:','list', 'textList'];
  constructor(private navCtrl: NavController, private service: MemorizeService ) {
    this.textList = service.getNames();
    this.fullText = service.getText();
  }
  //mydata = new MemorizeServices();
  //text = this.mydata.getText();

  selectText(title){
    console.log("Title that was selected is " + title);
    this.service.setTitle(title);
    this.fullText = this.service.getText();
  }

  swoosh(){
    console.log("swoosh called");
    this.navCtrl.parent.push(MemorizePage);
  }
  
  startMemorizing(title: string){
    console.log(this.navCtrl.parent);
    this.navCtrl.push(MemorizePage);
  }

  restartMemorization(){
    this.service.restart();
    this.continue();
  }

  continue(){
    // console.log("continue called 2");
    // console.log(this.navCtrl.parent.getByIndex(1));
    this.navCtrl.parent.select(1);
  }
}