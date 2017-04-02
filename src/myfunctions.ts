export let obscureEndOfString = function(string: string, count: number, config_line: string, config_word: string) {
//TODO count is depracated.  clean up.
/*    so config needs to represent these things:
    - except first word, except first letter, hidden
    - except first letter, hidden
    - excecpt first word, hidden
    - all hidden*/

 /*   //count refers to the number of characters to be not hidden, 
    // ie, 1 would mean the first character of each word stay revealed 
    // and 0 would mean the whole word is hidden
    //let even = config === "even" || config ==="both";
    //let odd = config === "odd" || config === "both";*/
    if(string.length == 0){
        return '';
    }
    let initial_i;
    let initial_charI;
    if(config_line == "first"){
        initial_i = 1;
    } else {
        initial_i = 0;
    }
    if(config_word == "first") {
        initial_charI = 1;
    } else {
        initial_charI = 0;
    }
    let obscuredStringWorker = [];
    let dividedString = string.split(' '); //TODO maybe change this to Capturing Parentheses https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
    if(initial_i == 1){ obscuredStringWorker[0] = dividedString[0]; }
    for (let i = initial_i; i < dividedString.length; i++) {
        if( testForChar(dividedString[i]) ){
            obscuredStringWorker[i] = ""; //initialize...
            if(initial_charI == 1) { obscuredStringWorker[i] += dividedString[i][0]; }
            for (let charI = initial_charI, charCurrent = ''; charI < dividedString[i].length; charI++) {
                charCurrent = dividedString[i][charI];
                obscuredStringWorker[i] += /*charI<count ||*/ /[^'’\w]/.test(charCurrent) ? charCurrent : '_'; //second part of OR makes punctuation ignored
            }
        } 
        else obscuredStringWorker[i] = dividedString[i];
    }
    return obscuredStringWorker.join(' ');//('&nbsp;&nbsp;&nbsp;');
}


export function obscureStrings (stringArray: string[], count: number): string[] {
    let returnStringsWorker: string[] = [];
    for (let index = 0; index < stringArray.length; index++) {
        returnStringsWorker[index] = obscureEndOfString(stringArray[index], count, "all", "all");
    }
    return returnStringsWorker;
}

//return true if there is an alphabetic character
export function testForChar(theString: string): boolean{
    return /[a-z]/i.test(theString);
}
class NumberWasIndexed {
    makeNotAssignable: string;
}

/*
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return false;
    }
}*/