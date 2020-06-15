/**
 * The class representing options of a choice question.
 * 
 * @class
 * @overload
 * 
 * @param {number} [options]  The number of options. 4 on default.
 * @param {boolean} [mutiSelect] Is multiple selection enabled. Be `false` on default.
 *//**
 *
 * The class representing options of a choice question.
 * 
 * @class
 * @overload
 * 
 * @param {boolean[]} options An array of booleans seperately representing that if each option have been selected.
 * @param {boolean} [mutiSelect] Is multiple selection enabled. Be `false` on default.
 */
function QuestionModel(options, mutiSelect) {

    /** 
     * An array of booleans seperately representing that if each option have been selected
     * @private @type {boolean[]} 
     */
    this["[[options]]"] = null;
    /**
     * If multiple selection enabled.
     * @private @type {boolean}
     */
    this["[[multiSelect]]"] = Boolean(mutiSelect);

    // question: number
    // multiSelect: boolean = false
    if (typeof options === "number" || options instanceof Number) {
        this["[[options]]"] = new Array(options);
        this["[[options]]"].fill(false);
    }
    // question: boolean[]
    // multiSelect: boolean = false
    else if (Array.isArray(options)) {
        this["[[options]]"] = new Array(options.length);
        this.setOptions(options);
    }
    // Default, no parameter
    else {
        this["[[options]]"] = [false, false, false, false];
    }
}


/**
 * Check if the index is not a integer or out of range.
 * Throw an error when it is illegal.
 * 
 * @private
 * 
 * @throws {RangeError} When the index is illegal.
 * 
 * @param {QuestionModel} question
 * @param {any} index
 */
QuestionModel.prototype["[[assertLegalIndex]]"] = function(index) {
    var i = Number(index);
    if (!Number.isInteger(i) || i < 0 || i >= this["[[options]]"].length)
        throw new RangeError("Option index" + index + " out of range " + questions["[[options]]"].length);
}

/**
 * Select or unselect the option with the specified index.
 * 
 * @note When multiple selection is disabled. Selecting a new option will cause
 *       that the option selected previously being unselected.
 * 
 * @param {number} index  The index of the option.
 * @param {boolean} selected  If the option will be selected or not.
 * 
 * @throws {RangeError} When the index is invalid or out of range.
 */
QuestionModel.prototype.setOption = function (index, selected) {
    this["[[assertLegalIndex]]"](index);
    var isSelected = Boolean(selected);

    if (!this["[[multiSelect]]"] && isSelected)
        this["[[options]]"].fill(false);
    this["[[options]]"][index] = isSelected;
}


/**
 * Get that if the option with the specified index have been selected.
 *  
 * @param {number} index  The index of the option.
 * 
 * @returns {boolean} If the option have been selected
 * 
 * @throws {RangeError} When the index is invalid or out of range.
 */
QuestionModel.prototype.getOption = function (index) {
    assertLegalIndex(index);
    return this["[[options]]"][index];
}


/**
 * If the option with specified index have been selected, unselect it.
 * Otherwise select it.
 * 
 * @note When multiple selection is disabled. Selecting a new option will cause
 *       that the option selected previously being unselected.
 *  
 * @param {number} index  The index of the option.
 * 
 * @throws {RangeError} When the index is invalid or out of range.
 */
QuestionModel.prototype.toggleOption = function (index) {
    this["[[assertLegalIndex]]"](index);

    if(!this["[[multiSelect]]"] && !this["[[options]]"][index])
        this["[[options]]"].fill(false);
    this["[[options]]"][index] = !this["[[options]]"][index];
}


/**
 * Set the number of options and that if each option is selected.
 * 
 * @note If multiple selection is diabled, only the first selected option will be kept.
 * 
 * @param {boolean[]} options  An array of booleans representing is each option selected seperately.
 */
QuestionModel.prototype.setOptions = function (options) {
    if (!Array.isArray(options))
        throw new TypeError("options must be an Array");

    var length = options.length;
    this["[[options]]"].length = length;

    if (this["[[multiSelect]]"]) {
        for (var i = 0; i < length; ++i)
            this["[[options]]"][i] = Boolean(options[i]);
    }
    // To ensure that only one option will be selected, keep the first selected option
    else {
        var i;
        for (i = 0; i < length; ++i) {
            var option = Boolean(options[i]);
            this["[[options]]"] = option;
            if (option)
                break;
        }
        if (i < length)
            this["[[options]]"].fill(false, i + 1, length);
    }
}


/**
 * Get if each option have been selected.
 * 
 * @returns {boolean[]} An array of booleans representing that if each the options have been selected.
 */
QuestionModel.prototype.getOptions = function () {
    return this["[[options]]"].slice();
}


/**
 * Set the number of options in this `QuestionModel`.
 * 
 * When the `optionCount` is greater than that of current one, more options will be added.
 * When it is less than the current one, some options will be discarded.
 * 
 * @throws {RangeError} When the optionCount is not a non-negtive integer.
 * 
 * @param {number} optionCount The number of options.
 */
QuestionModel.prototype.setOptionCount = function (optionCount) {
    // No need to check that if the optionCount is legal. The Array will do it.
    var oldOptionCount = this["[[options]]"].length;
    this["[[options]]"].length = optionCount;
    // If the options array grows, new options should be not selected on default
    if (optionCount > oldOptionCount)
        this["[[options]]"].fill(false, oldOptionCount);
}


/**
 * Get number of options in this `QuestionModel`.
 * 
 * @returns {number} The number of options.
 */
QuestionModel.prototype.getOptionCount = function () {
    return this["[[options]]"].length;
}


/**
 * Enable or diable multiple selection.
 * 
 * @note If multiple selection is diabled, only the first selected option will be kept.
 * 
 * @param {boolean} multiSelect  If multiple selection will be enabled.
 */
QuestionModel.prototype.setMultiSelect = function (multiSelect) {
    var isMultiSelect = Boolean(multiSelect);
    this["[[multiSelect]]"] = isMultiSelect;
    if (!multiSelect) {
        var indexOfFirstSelected = this["[[options]]"].indexOf(true);
        if (indexOfFirstSelected >= 0)
            this["[[options]]"].fill(false, indexOfFirstSelected + 1);
    }
}


/**
 * Get that if multiple selection is enabled.
 * 
 * @returns {boolean} If multiple selection is enabled..
 */
QuestionModel.prototype.isMultiSelect = function () {
    return this["[[multiSelect]]"];
}


/**
 * Enable multiple selection when it is disabled.
 * Disable multiple selection when it is enabled.
 * 
 * @note If multiple selection is diabled, only the first selected option will be kept.
 */
QuestionModel.prototype.toggleMultiSelect = function() {
    this.setMultiSelect(!this["[[multiSelect]]"]);
}