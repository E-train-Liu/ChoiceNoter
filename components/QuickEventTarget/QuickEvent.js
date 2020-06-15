/**
 * `QuickEvent` can be seen as a simplified version of DOM `Event`.
 * 
 * It only has the `type` property, but no others like `target` or `srcElement`
 * as well as methods like `prevebtDefault()`.
 * 
 * @note `QuickEvent` is NOT a sub or super class of `Event`
 * 
 * @class
 * @param {string} name
 */
function QuickEvent(type) {
    this.type = String(type);
}

// We define the version for old browsers then cover it
// with the new browser's version because because the
// older version notices the code analyzer of editors that
// `QuickEvent` is a class instead of a function.

try {
    // Test if Object.defineProperty() exist and be usable.
    // This function exists in IE8 but only work for DOM objects
    Object.defineProperty({}, "test", {
        value: "test"
    });

    QuickEvent = function(type) {
        Object.defineProperty(this, "type", {
            value: String(type),
            writable: false
        });
    }
}
catch(error) {
    console.warn("Object.defineProperty() not useable. The QuickEvent.type become writable.");
}