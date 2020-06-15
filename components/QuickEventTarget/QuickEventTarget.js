/**
 * `QuickEventTarget` can be seen as a simplified `EventTarget`. 
 * 
 * Like `EventTarget`, `QuickEventTarget` can
 * + Accept new event listener by `addEventListener()`
 * + Remove a event listener by `removeEventListener()`
 * + Emit an event by `dispatchEvent()`
 * 
 * It is different from the embedded `EventTarget` that it dose not support
 * + `EventHandler` interface (only `Function`s can be used as listeners)
 * + Bubbling
 * + Default activity preventation
 * + "Once" listener
 * 
 * The acceptable event can be either `QuickEvent` or `Event`
 * 
 * @note `QuickEventTarget` is NOT a super or sub class of the `EventTarget`
 * 
 * @class
 */
function QuickEventTarget() {
    /**
     * Map event names to the array of listeners
     * @private
     * @type {{
     *     [type:string]: ((event: QuickEvent | Event) => any)[]
     * }}
     */
    this["[[eventListeners]]"] = {};
}

/**
 * @param {string} type 
 * @param {(event: QuickEvent | Event) => any} listener
 */
QuickEventTarget.prototype.addEventListener = function(type, listener) {
    if (!(listener instanceof Function)) {
        console.warn("The listener must be an function.");
        return;
    }
    if (!this["[[eventListeners]]"][type]){
        this["[[eventListeners]]"][type] = [listener];
    }
    else {
        var index = this["[[eventListeners]]"][type].indexOf(listener);
        if (index < 0)
            this["[[eventListeners]]"][type].push(listener);
    }
}

/**
 * @param {string} type
 * @param {(event: QuickEvent | Event) => any} listener
 */
QuickEventTarget.prototype.removeEventListener = function(type, listener) {
    var index = this["[[eventListeners]]"][type].indexOf(listener);
    if (index >= 0)
        this["[[eventListeners]]"][type].splice(index);
}

/**
 * @param {QuickEvent | Event} event
 */
QuickEventTarget.prototype.dispatchEvent = function(event) {
    var listeners = this["[[eventListeners"][event.type];
    if (listeners !== undefined) {
        var listenerCount = listeners.length;
        for(var i = 0; i < listenerCount; ++i) {
            try { listeners[i](event); }
            catch(error) { console.error(error); }
        }
    }
}