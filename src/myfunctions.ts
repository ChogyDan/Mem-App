export let obscureEndOfString = function(string: string, count: number, config: string) {
    //count refers to the number of characters to be not hidden, 
    // ie, 1 would mean the first character of each word stay revealed 
    // and 0 would mean the whole word is hidden
    let even = config === "even" || config ==="both";
    let odd = config === "odd" || config === "both";
    if(string.length == 0){
        return '';
    }
    let obscuredStringWorker = [];
    let dividedString = string.split(' '); //TODO maybe change this to Capturing Parentheses https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
    for (let i = 0; i < dividedString.length; i++) {
        if((i%2==0 && even || i%2===1 && odd) && testForChar(dividedString[i])) {
            obscuredStringWorker[i] = ""; //initialize...
            for (let charI = 0, charCurrent = ''; charI < dividedString[i].length; charI++) {
                charCurrent = dividedString[i][charI];
                obscuredStringWorker[i] += charI<count || /[^'’\w]/.test(charCurrent) ? charCurrent : '_'; //second part of OR makes punctuation ignored
            }
        } else obscuredStringWorker[i] = dividedString[i];
    }
    return obscuredStringWorker.join(' ');//('&nbsp;&nbsp;&nbsp;');
}


export function obscureStrings (stringArray: string[], count: number): string[] {
    let returnStringsWorker: string[] = [];
    for (let index = 0; index < stringArray.length; index++) {
        returnStringsWorker[index] = obscureEndOfString(stringArray[index], count, "both");
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