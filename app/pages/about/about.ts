import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MemorizeServices as MemorizeService} from '../../services';
import * as helpers from '../../myfunctions'

@Component({
  templateUrl: 'build/pages/about/about.html',
  providers: [MemorizeService],
})
export class AboutPage {
  fullText;
  obscuredText: string[];
  displayedText: string[];
  revealed: boolean[];
  storage;
  save: (data: boolean[]) => void;
  hideLevel: number[];
  maxHideLevel = 4;
  constructor(private navCtrl: NavController, private service: MemorizeService ) {
    this.fullText = service.getText(); 
    //this.obscuredText = helpers.obscureStrings(this.fullText, 1);
    //this.displayedText = this.fullText.splice(0);
    this.hideLevel = service.getSave();
    console.log(this.hideLevel);
    this.displayedText = [];
    //this.hideLevel = [];
    for (let i = 0; i < this.fullText.length; i++) {
    //  this.hideLevel[i] = 0;
      this.updateDisplay(i);//this.displayedText[i] = this.revealed[i] ? this.fullText[i] : this.obscuredText[i];
    }
  }

  revealClick (line) {
    this.displayedText[line] = this.fullText[line];
    this.revealed[line] = true;
    this.service.save(this.revealed);
  }

  hideClick (line) {
    this.displayedText[line] = this.obscuredText[line];
    this.revealed[line] = false;
    this.service.save(this.revealed);
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
    switch(this.hideLevel[line]){
      case 0:
      newText = this.fullText[line];
      break;
      case 1:
      newText = helpers.obscureEndOfString(this.fullText[line], 1, "odd");
      break;
      case 2:
      newText = helpers.obscureEndOfString(this.fullText[line], 1, "even");
      break;
      case 3:
      newText = helpers.obscureEndOfString(this.fullText[line], 1, "both");
      break;
      case 4:
      newText = helpers.obscureEndOfString(this.fullText[line], 0, "both");
      break;
      default:
      console.log("WARNING: invalid hidelevel in updatedisplay");
      newText = this.fullText[line];
    }
    this.displayedText[line] = newText;
  }

  testForChar(string: string): boolean{
    return helpers.testForChar(string);
  }

}
