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


  /*revealClick (line) {
    this.displayedText[line] = this.fullText[line];
    this.revealed[line] = true;
    this.service.save(this.revealed);
  }

  hideClick (line) {
    this.displayedText[line] = this.obscuredText[line];
    this.revealed[line] = false;
    this.service.save(this.revealed);
  }*/
  save() {
    this.service.save("main", this.hideLevel);
  }
  
  // hideMore(line){
  //   console.log("hide more");
  //   if(this.hideLevel[line] === MAX_HIDELEVEL){
  //     console.log("WARNING: max hide already achieved");
  //     return;
  //   }
  //   this.hideLevel[line] += 1;
  //   this.updateDisplay(line);
  //   this.service.save(this.hideLevel);
  //   console.log ("hide level: " + this.hideLevel[line]);
  // }
  // hideLess(line){
  //   if(this.hideLevel[line] === 0){
  //     console.log("WARNING: min hide already achieved");
  //     return;
  //   }
  //   this.hideLevel[line] -= 1;
  //   this.updateDisplay(line);
  //   this.service.save(this.hideLevel);
  // }
  MAX_HIDELEVEL = 5;
  updateDisplay(line) {
    let newText: string;
    //let fullText = this.service.getText();
    switch(this.data[line].hide){
      case 5:
      case 0:
      newText = this.fullText[line];
      break;
      case 1:
      newText = helpers.obscureEndOfString(this.fullText[line], 1, "first", "first");
      break;
      /*case 2:
      newText = helpers.obscureEndOfString(this.fullText[line], 1, "even");
      break;*/
      case 2:
      newText = helpers.obscureEndOfString(this.fullText[line], 1,  "all", "first");
      break;
      case 3:
      newText = helpers.obscureEndOfString(this.fullText[line], 0,  "first", "all");
      break;
      case 4:
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
    } else {
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

  /*changeHide(line: number) {
    let explicitButtons = [
    {
      text: this.fullText[line],
      handler: () => {
        this.hideLevel[line] = 0;
        this.displayedText[line] = this.fullText[line]
      },
    },
    {
      text: helpers.obscureEndOfString(this.fullText[line], 1, "odd"),
      handler: () => {
        this.hideLevel[line] = 1;
        this.displayedText[line] = helpers.obscureEndOfString(this.fullText[line], 1, "odd")
      },
    },
    {
      text: helpers.obscureEndOfString(this.fullText[line], 1, "even"),
      handler: () => {
        this.hideLevel[line] = 2;
        this.displayedText[line] = helpers.obscureEndOfString(this.fullText[line], 1, "even")
      },
    },
    {
      text: helpers.obscureEndOfString(this.fullText[line], 1, "both"),
      handler: () => {
        this.hideLevel[line] = 3;
        this.displayedText[line] = helpers.obscureEndOfString(this.fullText[line], 1, "both")
      },
    },
    {
      text: helpers.obscureEndOfString(this.fullText[line], 0, "both"),
      handler: () => {
        this.hideLevel[line] = 4;
        this.displayedText[line] = helpers.obscureEndOfString(this.fullText[line], 0, "both")
      },
    },
    ];
    let actionSheet = this.actionSheetGenerator.create({
      title: this.fullText[line],
      buttons: [
        {
          text: 'Hide more',
          handler: () => {
            console.log("button clicked");
            this.hideMore(line);
          }
        },
        {
          text: 'Hide Less',
          handler: () => {
            console.log("hide less clicked");
            this.hideLess(line);
          }
        }
      ]

    });
    actionSheet.present().then(function(){

    });

  }*/

}
