/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {

    if (size === 0 || string === '') return '';
    if (size === undefined) return string;

    let result = '';
    let currentChar = '';
    let charCount = 0;

    for (let i = 0; i < string.length; i++) {
        let char = string[i];

        if (char === currentChar) {
            charCount++;

        } else {
            currentChar = char;
            charCount = 1;
        }


        if (charCount <= size) {
            result += char;
        }
    }
    return result;
}
