
ArrayUtility = function core$ArrayUtility() {
}

ArrayUtility.prototype = {
	/**
	 * Creates (multiple-dimensional) array.
	 */
	createArray: function core$createArray(length) {
        var arr = new Array(length || 0),
            i = length;

        if (arguments.length > 1) {
            var args = Array.prototype.slice.call(arguments, 1);
            while(i--) arr[length-1 - i] = ArrayUtility.prototype.createArray.apply(this, args);
        }

        return arr;
    },

	/**
	 * Deep copy an array
	 */
	/*deepCopyArray: function core$deepCopyArray(array) {
		return $.extend(true, [], array);
	},*/

	/**
     * Helper function that finds one array in another array. Maybe change to KMP
	 * @param {Array} arrShort - the shorter array
	 * @param {Array} arrLong - the longer array
	 * @return {boolean} true if arrShort is in arrLong
     */
    isArrayInArray: function core$isArrayInArray(arrShort, arrLong) {
        var lCount = arrLong.length;
        var sCount = arrShort.length;
        var k;
        for (var i = 0; i <= lCount - sCount; i++) {
            k = 0;
            for (var j = 0; j < sCount; j++) {
                if (arrLong[i + j] == arrShort[j]) {
					k++;
				} else {
					break;
				}
            }
            if (k == sCount) return true;
        }
        return false;
    },

	/**
     * Helper function that finds if any array in the list of array is in another array
	 * @return {Boolean} True if any array in arrList in in arr
     */
    isAnyArraysInArray: function core$isInArrays(arrList, arrLong) {
        for (var i = 0; i < arrList.length; i++) {
            if (ArrayUtility.prototype.isArrayInArray(arrList[i], arrLong)) { return true; }
        }
        return false;
    },
}
