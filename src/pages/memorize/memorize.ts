import {Component, ViewChild} from '@angular/core';
import {Content, NavController} from 'ionic-angular';
import {ActionSheetController} from 'ionic-angular'
import {MemorizeServices as MemorizeService} from '../../services';
import * as helpers from '../../myfunctions'

@Component({
  selector: 'memorize-page',
  templateUrl: 'memorize.html',
  providers: [MemorizeService],
})
export class MemorizePage {
  @ViewChild(Content) content: Content;
  obscuredText: string[];
  displayedText: string[][];
  revealed: boolean[];
  //storage;
  hideLevel: number[];
  touched: boolean[];
  date: number[];
  maxHideLevel = 4;
  fullText: string[];
  data; 
  
  constructor(private navCtrl: NavController, private service: MemorizeService, public actionSheetGenerator: ActionSheetController ) {
    //this.obscuredText = helpers.obscureStrings(this.fullText, 1);
    //this.displayedText = this.fullText.splice(0);
    this.displayedText = [];
    //this.hideLevel = [];
    //this.refresh();
    //this.content.addScrollEventListener(this.onPageScroll);

    // let length = this.service.getText().length;
    // this.data = [];
    // for (var index = 0; index < length; index++) {
    //   this.data.push({ "hide": 0, "touched": false, "date": 0 });
    // }

    // console.log(this.data);


  }

  refresh(){
    this.data = this.service.getSave("next");
    // this.hideLevel = this.service.getSave("main");
    this.fullText = this.service.getText();
    this.displayedText = this.data.map(function(_, i){
      return [];
    });
    let textLength = this.fullText.length;
    for (let i = 0; i < textLength; i++) {
      this.updateDisplay(i);
    }
  }

  ionViewWillEnter() {
    this.refresh();
    this.content.scrollTo(0, localStorage["scrollPos"]);
    this.content.ionScrollEnd.subscribe(($event:any ) => {
      localStorage["scrollPos"] = $event.scrollTop
    });
  }

  save() {
    this.service.save("main", this.hideLevel);
  }
  
  MAX_HIDELEVEL = 4;
  updateDisplay(line) {
    let newText: string;
    //let fullText = this.service.getText();
    switch(this.data[line].hide){
      case 4:
      case 0:
      newText = this.fullText[line];
      break;
      // case 1:
      // newText = helpers.obscureEndOfString(this.fullText[line], 1, "first", "first");
      // break;
      /*case 2:
      newText = helpers.obscureEndOfString(this.fullText[line], 1, "even");
      break;*/
      case 1:
      newText = helpers.obscureEndOfString(this.fullText[line], 1,  "all", "first");
      break;
      case 2:
      newText = helpers.obscureEndOfString(this.fullText[line], 0,  "first", "all");
      break;
      case 3:
      newText = helpers.obscureEndOfString(this.fullText[line], 0,  "all", "all");
      break;
      default:
      console.log("WARNING: invalid hidelevel in updatedisplay: " + this.data[line].hide);
      newText = this.fullText[line];
    }
    this.displayedText[line] = newText.split(/([_]+)/);
  }

  testForChar(string: string): boolean{
    return helpers.testForChar(string);
  }

  hideCycle(line: number){
    if(this.repeatTest(line)) {
      this.data[line].touched = false;
      this.data[line].date = Date.now();
    } else { //if repeat status was just removed, don't reduce hide level
      if(this.data[line].hide < this.MAX_HIDELEVEL) {
        this.data[line].hide += 1;
      }
      this.data[line].touched = true;
      this.data[line].date = Date.now();
    }
    this.updateDisplay(line);
    this.service.save("next", this.data);
  }
  
  revealCycle(line: number){
    if(this.repeatTest(line)) { // remove repeat test status if it is present
      this.data[line].touched = false;
      this.data[line].date = Date.now();
    }
    if(this.data[line].hide > 0) {
      this.data[line].hide -= 1;
    } else {
      //nothing
    }
    this.updateDisplay(line);
    //this.service.save("main", this.hideLevel);
    this.service.save("next", this.data);
  }

  repeatTest(line){
    let element = this.data[line];
    if(element.touched && Date.now() - element.date > 3600000) { // half day 43200000 hour 3600000 
      return true;
    } else return false;
  }
}
