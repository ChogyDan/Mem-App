import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ActionSheetController} from 'ionic-angular'
import {MemorizeServices as MemorizeService} from '../../services';
import * as helpers from '../../myfunctions'

@Component({
  selector: 'memorize-page',
  templateUrl: 'memorize.html',
  providers: [MemorizeService],
})
export class MemorizePage {
  obscuredText: string[];
  displayedText: string[][];
  revealed: boolean[];
  storage;
  hideLevel: number[];
  maxHideLevel = 4;
  constructor(private navCtrl: NavController, private service: MemorizeService, public actionSheetGenerator: ActionSheetController ) {
    //this.obscuredText = helpers.obscureStrings(this.fullText, 1);
    //this.displayedText = this.fullText.splice(0);
    this.displayedText = [];
    //this.hideLevel = [];
    this.refresh();


  }

  refresh(){
    this.hideLevel = this.service.getSave();
    this.displayedText = this.hideLevel.map(function(_, i){
      return ["DEBUG: uninitialized displayText in memorize:refresh"];
    })
    for (let i = 0; i < this.service.getText().length; i++) {
      this.updateDisplay(i);
    }
  }

  ionViewWillEnter() {
      this.refresh();
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
    this.service.save(this.hideLevel);
  }
  
  hideMore(line){
    console.log("hide more");
    if(this.hideLevel[line] === 4){
      console.log("WARNING: max hide already achieved");
      return;
    }
    this.hideLevel[line] += 1;
    this.updateDisplay(line);
    this.service.save(this.hideLevel);
  }
  hideLess(line){
    if(this.hideLevel[line] === 0){
      console.log("WARNING: min hide already achieved");
      return;
    }
    this.hideLevel[line] -= 1;
    this.updateDisplay(line);
    this.service.save(this.hideLevel);
  }

  updateDisplay(line) {
    let newText: string;
    let fullText = this.service.getText();
    switch(this.hideLevel[line]){
      case 0:
      newText = fullText[line];
      break;
      case 1:
      newText = helpers.obscureEndOfString(fullText[line], 1, "odd");
      break;
      /*case 2:
      newText = helpers.obscureEndOfString(fullText[line], 1, "even");
      break;*/
      case 2:
      newText = helpers.obscureEndOfString(fullText[line], 1, "both");
      break;
      case 3:
      newText = helpers.obscureEndOfString(fullText[line], 0, "both");
      break;
      case 4:
      newText = helpers.obscureEndOfString(fullText[line], 1, "both");
      break;
      default:
      console.log("WARNING: invalid hidelevel in updatedisplay: " + this.hideLevel[line]);
      newText = fullText[line];
    }
    this.displayedText[line] = newText.split(/([_]+)/);
  }

  testForChar(string: string): boolean{
    return helpers.testForChar(string);
  }

  hideCycle(line: number){
    if(this.hideLevel[line] < 4) {
      this.hideLevel[line] += 1;
    } else {
      this.hideLevel[line] = 0;
      /*let actionsheet = this.actionSheetGenerator.create({
        title: "Choose path",
        buttons: [{
          text: "Hide completely",
          handler: () => {
            this.hideLevel[line] = 3;
          }
        },
        {
          text: "Reveal completely",
          handler: () => {
            this.hideLevel[line] = 0;
          }
        },
        {
          title: "Leave as is",
          handler: () => { }
        }]
      });
      actionsheet.present().then(function(){ });*/
    }
    this.updateDisplay(line);
    this.service.save(this.hideLevel);
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