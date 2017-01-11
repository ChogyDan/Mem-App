import { Injectable } from '@angular/core';
import {practices37, Practices37} from './myservicevariables';
import * as texts from './texts';

var friends = "temp friends variable";

let mainTexts = new Practices37();

//from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
 function storageAvailable(type) {
	try {
		let storage: any = window[type];
			let x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
		return false;
	}
}

var count = 0;
@Injectable()
export class MemorizeServices {
    title: string;
    currentText: number;
    constructor(){
        this.title = this.getNames()[0];
        count += 1;
        console.log("Mem service count is " + count);
        this.currentText = 0;
    }
    getText(num?: number): string[] {
        if(num == undefined) {
            num = this.getCurrent();
        }
        if(num >= texts.texts.length) {
            num = 0;
        }
        let text = this.getTitle() === "friends" ? friends : practices37;
        //let textwithbr = practices37.replace(/(?:\r\n|\r|\n)/g, '\n<br>');
        //let textArray = practices37.split('\n');
        /*if(name === "friends") {
            return friends.split('\n');
        }*/
        // console.log("HI, num is " + num);
        // text = mainTexts.textList[num];
        // console.log("title in getTetxt " + text);

        //return text.split('\n');

        return texts.texts[num].split('\n');
    }//getText
    getNames(): string [] {
        // return mainTexts.titleList;
        return texts.titles;
    }
    getSave() { // 'save' refers to saved user data
        let save = storageAvailable('localStorage') ? window.localStorage[this._saveLocation()] : undefined;
        
        if( save != undefined && JSON.parse(save).length == this.getText().length){
            return JSON.parse(save);
        } else { //no save available
            console.log("WARNING: no save found.  Either first time or no localStorage");
            console.log("storage availalbe?: " + storageAvailable('localStorage'));
            console.log("localStorage save present? " + (save != undefined));
            if(save != undefined) {
              console.log("lengths: " + JSON.parse(save).length + " and text length: " + this.getText().length);
            }
            return this.getText().map(   function(_,i){  return 0; }   );
        }
    }

    restart() {
        this.save(
            this.getText().map(
                function(_,i){  return 0; }
            )
        );
    }

    save(data): void {
        if(data.length != this.getText().length) {
            console.log("ERROR: save data length is incorrect");
            return;
        }

        localStorage[this._saveLocation()] = JSON.stringify(data);
    }

    setTitle(title: string): void {
        window.localStorage['currentTitle'] = this.getNames().indexOf(title) != -1 ? title : this.getNames()[0];
    }

    getTitle(): string {
        if(storageAvailable('localStorage') && window.localStorage['currentTitle'] != undefined) {
            //console.log("currentTitle is " + window.localStorage['currentTitle']);
            return window.localStorage['currentTitle'];
        } else {
            return this.getNames()[0];
        }
    }

    setCurrent(current: number){
        window.localStorage['currentIndex'] = this.currentText;
    }

    getCurrent(): number {
        if(storageAvailable('localStorage') && window.localStorage['currentIndex'] != undefined) {
            console.log("currentIndex is " + window.localStorage['currentIndex']);
            return window.localStorage['currentIndex'];
        } else {
            return 0;
        }
    }

    private _saveLocation(): string {
        return "save__" + this.getTitle();
    }
}

