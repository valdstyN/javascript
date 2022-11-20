/**
 * @param {string} s
 * @return {number}
 * Another regex-based solution.
 */
var lengthOfLastWord = function(s) {
    return s.match(/([^\s]+)\s*?$/)[1].length;
};
