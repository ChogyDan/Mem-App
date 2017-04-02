import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MemorizeServices as MemorizeService} from '../../services';
import {MemorizePage} from '../memorize/memorize';
/*import {Autoresize} from '../../autoresize';*/

@Component({
  selector: 'setup-page',
  templateUrl: 'setup.html',
  providers: [MemorizeService, /*Autoresize*/],
})
export class SetupPage {
  fullText: string[] = ['uninitialized','string:','list', 'fullText'];
  textList: string [] = ['uninitialized','string:','list', 'textList'];
  isCustom: boolean;
  customText: string;
  constructor(private navCtrl: NavController, private service: MemorizeService ) {
    this.textList = service.getNames();
    this.fullText = service.getText();
    this.isCustom = service.getTitle() == "custom";
    this.customText = window.localStorage["custom"];
  }
  //mydata = new MemorizeServices();
  //text = this.mydata.getText();

  selectText(title){
    console.log("Title that was selected is " + title);
    if(title == 'custom') {
      this.isCustom = true;
    } else {
      this.isCustom = false;
    };
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
  
  showCustom(){
    return this.isCustom;
  }

  adjust(event): void {
    window.localStorage["custom"] = event.target.value;

    //Autoresize logic
    // This code is based on this module: From: https://gist.github.com/Eetezadi/368658ca4364354cfca768f24e2ac810
    // The module part of that module doesn't work, but the basic idea of it seems to work below (reassign height to scroll height).
    let ta = event.srcElement;
		if (ta) {
			ta.style.overflow = "hidden";
			ta.style.height = "auto";
			ta.style.height = ta.scrollHeight + "px";
		}//end of Autoresize

	}
}