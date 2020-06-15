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