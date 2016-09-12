import { Injectable } from '@angular/core';
import {practices37, friends} from './myservicevariables';
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

@Injectable()
export class MemorizeServices {
    _this;
    title: number;
    constructor(){
        this._this = this;
    }
    getText(name:string='nothing entered'): string[] {
        let textwithbr = practices37.replace(/(?:\r\n|\r|\n)/g, '\n<br>');
        let textArray = practices37.split('\n');
        if(name === "friends") {
            return friends.split('\n');
        }
        return textArray;
    }//getText
    getNames(): string [] {
        return ["37 practices", "friends"];
    }
    getSave() {
        
        if(storageAvailable('localStorage') && window.localStorage['save'] != undefined && JSON.parse(window.localStorage['save']).length == this.getText().length){
            return JSON.parse(window.localStorage['save']);
        } else {
            console.log("WARNING: no save found.  Either first time or no localStorage");
            console.log("storage availalbe?: " + storageAvailable('localStorage'));
            console.log("localStorage save present? " + (window.localStorage['save'] != undefined));
            if(window.localStorage['save'] != undefined) {
              console.log("lengths: " + JSON.parse(window.localStorage['save']).length + " and text length: " + this.getText().length);
            }
            return this._this.getText().map(function(_,i){
                return 0;
            });
        }

    }
    save(data): void {

        if(data.length != this.getText().length) {
            console.log("ERROR: save data length is incorrect");
            return;
        }

        localStorage['save'] = JSON.stringify(data);
    }

    setTitle(title: string): void {
        let index = this.getNames().indexOf(title);
        this.title = index == -1 ? 0 : index;
    }
}

