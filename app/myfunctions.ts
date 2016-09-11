export let obscureEndOfString = function(string: string, count: number, config: string) {
    let even = config === "even" || config ==="both";
    let odd = config === "odd" || config === "both";
    if(string.length == 0){
        return '';
    }
    let obscuredStringWorker = [];
    let dividedString = string.split(' ');
    for (let i = 0; i < dividedString.length; i++) {
        if((i%2==0 && even || i%2===1 && odd) && testForChar(dividedString[i])) {
            obscuredStringWorker[i] = ""; //initialize...
            for (let charI = 0; charI < dividedString[i].length; charI++) {
                obscuredStringWorker[i] += charI<count ? dividedString[i][charI] : '_';
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