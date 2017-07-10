import { Injectable } from '@angular/core';
import * as texts from './texts';

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
    text: string [];
    numCurrent: number;
    constructor(){
        this.title = this.getNames()[0];
        count += 1;
        console.log("DEBUG: Mem service count is " + count);
    }

    getText(): string[] {
        let returnText = "";
        let title = this.getTitle();
        if(title == "custom") {
            returnText = window.localStorage["custom"];
            if(returnText == undefined) {
                returnText = "";
            }
            console.log("returnText is custom: " + returnText);
        } else {
            returnText = texts.texts[texts.titles.indexOf(title)];
            if(returnText == undefined) {
                returnText = texts.texts[0];
                console.log("WARNING: invalid returnText detected.  Probably a bad title.  Using first text.");
            }
        }
        return returnText.split('\n');
    }//getText

    getNames(): string [] {
        return texts.titles;
    }
    getSave(setname) { // 'save' refers to saved user data
        let save = storageAvailable('localStorage') ? window.localStorage[this._saveLocation(setname)] : undefined;
        
        if( save != undefined && JSON.parse(save).length == this.getText().length){
            return JSON.parse(save);
        } else { //no save available
            console.log("WARNING: no save found.  Either first time or no localStorage");
            console.log("- storage availalbe?: " + storageAvailable('localStorage'));
            console.log("- localStorage save present? " + (save != undefined));
            if(save != undefined) {
              console.log("- lengths: " + JSON.parse(save).length + " and text length: " + this.getText().length);
            }
            console.log("- end no-save warning -");
            this.restart();
            return this.getSave(setname);
            // return this.getText().map(   function(_,i){  return 0; }   );  //TODO rewrite this properly
        }
    }

    restart() {
        console.log("restarting...");
        this.save("main",
            this.getText().map(
                function(_,i){  return 0; }
            )
        );
        this.save("touched",
             this.getText().map(
                function(_,i){  return 0; }
            )
        );
        this.save("date",
             this.getText().map(
                function(_,i){  return 0; }
            )
        );

        this.save("next", 
            this.getText().map(
                function(_,i){ return { "hide": 0, "touched": false, "date": 0 }; }
            )
        );

    }

    save(setname: string, data): void {
        if(data.length != this.getText().length) {
            console.log("ERROR: save data length is incorrect");
            return;
        }

        localStorage[this._saveLocation(setname)] = JSON.stringify(data);
    }

    setTitle(title: string): void {
        if(title == 'custom'){
            console.log("custom text");
            window.localStorage['currentTitle'] = "custom";
        } else {
            //do a search on the title, if it is found, use title as title, otherwise just use the first text available
            window.localStorage['currentTitle'] = this.getNames().indexOf(title) != -1 ? title : this.getNames()[0];
        }
    }

    getTitle(): string {
        if(window.localStorage['currentTitle'] == "custom") {
            return "custom";
        }
        if(storageAvailable('localStorage') && window.localStorage['currentTitle'] != undefined) {
            //console.log("currentTitle is " + window.localStorage['currentTitle']);
            return window.localStorage['currentTitle'];
        } else {
            console.log("WARNING: returning default title (see services.ts:getTitle)");
            return this.getNames()[0];
        }
    }

    private _saveLocation(setname: string): string {
        return "save__" + this.getTitle() + setname;
    }
}

