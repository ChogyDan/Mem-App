import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MemorizeServices as MemorizeService} from '../../services';
import {AboutPage} from '../about/about';

@Component({
  templateUrl: 'build/pages/start/start.html',
  providers: [MemorizeService],
})
export class StartPage {
  fullText: string[] = ['first line','second line','third line'];
  textList: string [] = ['first text', 'second text', 'third text'];
  constructor(private navCtrl: NavController, private service: MemorizeService ) {
    this.textList = service.getNames();
    this.textList.push("select test");
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
    this.navCtrl.parent.push(AboutPage);
  }
  
  startMemorizing(title: string){
    console.log(this.navCtrl.parent);
    this.navCtrl.push(AboutPage);
  }
}