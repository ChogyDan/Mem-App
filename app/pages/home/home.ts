import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MemorizeServices as MemorizeService} from '../../services';
import {AboutPage} from '../about/about';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [MemorizeService],
})
export class HomePage {
  fullText: string[] = ['first line','second line','third line'];
  textList: string [] = ['first text', 'second text', 'third text'];
  constructor(private navCtrl: NavController, private service: MemorizeService ) {
    this.textList = service.getNames();
    this.textList.push("select test");
    this.fullText = service.getText("default");

  }
  //mydata = new MemorizeServices();
  //text = this.mydata.getText();

  selectText(text){
    console.log(text);
    this.fullText = this.service.getText(text);
  }

  swoosh(){
    console.log("swoosh called");
    this.navCtrl.push(AboutPage);
  }
}