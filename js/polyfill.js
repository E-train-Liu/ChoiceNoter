/**
 * Polyfill of functions and properties for old browsers like IE8.
 */

/**
 * The non-ES3 functions and properties should be updated when it is used.
 * 
 * Note: as other files all reply on these polyfill, the polyfill should not
 * be depended on other files.
 * 
 * Here are functions and properties that have been polyfilled
 * 
 * + console
 * 
 *      - log()
 *      - error()
 *      - warn()
 * 
 * + Array
 * 
 *      - isArray()
 *      - of()
 *      - from()
 * 
 * + Array.prototype
 * 
 *      - fill()
 * 
 * + Number
 * 
 *      - isInteger()
 * 
 * Here are functions and properties that are not fully polyfilled. Be cafeful when using them. 
 * 
 * + console
 * 
 *      - log()
 *         
 *          + For browsers without console, no way to output the logs.
 *          + For IE 8-9 whose console object will disapper when devtool is closed, no way to print logs on the real console.
 *          + Styled or formatted output not polyfilled.
 * 
 *      - error()
 * 
 *          + Same with log()
 *          + The output will not be highlighted in browsers not supporting originally.
 * 
 *      - warn()
 * 
 *          + Same with error()
 * 
 * Here are functions and properties that CANNOT be polyfilled. Check before using.
 * 
 */

// No console or console is totally broken
if (typeof console === "undefined" || !console.log) {
    console = {
        log: function() {},
        error: function() {},
        warn: function() {}
        
    };
}
// Has basic console.log but no other functions like console.error
else {
    if (!console.error)
        console.error = console.log;
    if (!console.warn)
        console.warn = console.log;
}




if (!Array.prototype.fill) {
    Array.prototype.fill = function(value, start, end) {
        if (start === undefined)
            start = 0;
        if (end === undefined)
            end = this.length;

        for(var i = start; i < end; ++i)
            this[i] = value;
        
        return this;
    }
}


if (!Array.isArray) {
    // See https://stackoverflow.com/questions/767486/how-do-you-check-if-a-variable-is-an-array-in-javascript#answer-26633883
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray#Polyfill
    Array.isArray = function(a) {
        return Object.prototype.toString.call(a) === "[object Array]";
    }
}


if (!Array.of) {
    Array.of = function() {
        return Array.prototype.slice.call(arguments);
    }
}


if (!Array.from) {
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#Polyfill
    Array.from = function(arrayLike, mapFn, thisArg) {
        var hasMapFn = mapFn === undefined;
        var hasThisArg = thisArg === undefined;
        if (Array.isArray(arrayLike) && !hasMapFn && !hasThisArg)
            return arrayLike.slice();

        if (typeof arrayLike.length !== "number")
            throw new TypeError ("Array.from: the 1st arg must be an arraylike object.");
        if (hasMapFn && typeof mapFn !== "function")
            throw new TypeError("Array.from: if the 2nd arg is given, it must be a function.");

        var length = arrayLike.length;
        var result = new Array(length);

        for(var i = 0; i < length; ++i) {
            if (hasMapFn) {
                if (hasThisArg)
                    result[i] = mapFn.call(thisArg, arrayLike[i]);
                else
                    result[i] = mapFn(arrayLike);
            }
            else
                result[i] = arrayLike[i];
        }

        return result;
    }
}




if (!Number.isInteger) {
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger#Polyfill
    Number.isInteger = function(value) {
        return typeof value === 'number' && 
            isFinite(value) && 
            Math.floor(value) === value;
    }
}