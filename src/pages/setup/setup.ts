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
  customTitle: string = "Enter your own";
  constructor(private navCtrl: NavController, private service: MemorizeService ) {
    this.textList = service.getNames();
    this.fullText = service.getText();
    this.isCustom = service.getTitle() == "custom";
    this.customText = window.localStorage["custom"];
    //TODO initialize height of custom element
  }

  selectText(title){
    if(title == "custom") {
      this.isCustom = true;
    } else {
      this.isCustom = false;
    };
    this.service.setTitle(title);
    this.fullText = this.service.getText();
    localStorage["scrollPos"] = 0; //This scroll position is used in memorize.ts, and we are setting it back to the top of the page
  }
  
  startMemorizing(title: string){
    console.log(this.navCtrl.parent);
    this.navCtrl.push(MemorizePage);
  }

  restartMemorization(){
    localStorage["scrollPos"] = 0;
    this.service.restart();
    this.continue();
  }

  continue(){
    this.navCtrl.parent.select(1);
  }
  
  showCustom(){
    return this.isCustom;
  }

  adjust(event): void {
    window.localStorage["custom"] = event.target.value;  //keep localstorage updated with what is in custom
    console.log(window.localStorage["custom"].length + " is the length of custom");

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