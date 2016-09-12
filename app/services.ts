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

var count = 0;
@Injectable()
export class MemorizeServices {
    _this;
    title: string;
    constructor(){
        this._this = this;
        this.title = this.getNames()[0];
        count += 1;
        console.log("Mem service count is " + count);
    }
    getText(): string[] {
        let text = this.getTitle() === "friends" ? friends : practices37;
        //let textwithbr = practices37.replace(/(?:\r\n|\r|\n)/g, '\n<br>');
        //let textArray = practices37.split('\n');
        /*if(name === "friends") {
            return friends.split('\n');
        }*/
        console.log("title in getTetxt " + this.title);

        return text.split('\n');
    }//getText
    getNames(): string [] {
        return ["37 practices", "friends"];
    }
    getSave() {
        let save = storageAvailable('localStorage') ? window.localStorage[this._saveLocation()] : undefined;
        
        if( save != undefined && JSON.parse(save).length == this.getText().length){
            return JSON.parse(save);
        } else {
            console.log("WARNING: no save found.  Either first time or no localStorage");
            console.log("storage availalbe?: " + storageAvailable('localStorage'));
            console.log("localStorage save present? " + (save != undefined));
            if(save != undefined) {
              console.log("lengths: " + JSON.parse(save).length + " and text length: " + this.getText().length);
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

        localStorage[this._saveLocation()] = JSON.stringify(data);
    }

    setTitle(title: string): void {
        window.localStorage['currentTitle'] = this.getNames().indexOf(title) != -1 ? title : this.getNames()[0];
    }

    getTitle(): string {
        if(storageAvailable('localStorage') && window.localStorage['currentTitle'] != undefined) {
            console.log("currentTitle is " + window.localStorage['currentTitle']);
            return window.localStorage['currentTitle'];
        } else {
            return this.getNames()[0];
        }
    }

    private _saveLocation(): string {
        return "save__" + this.getTitle();
    }
}

