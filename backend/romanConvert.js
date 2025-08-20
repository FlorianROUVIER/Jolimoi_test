// Import roman number as json
const romanMap = require('./data/romanNumber.json');

function convertToRomanNumber(num) {
    if (num === 0) return 'N/A'; 

    let result = '';
    for (const { value, symbol } of romanMap) {
        while (num >= value) {
            result += symbol;
            num -= value;
        }
    }
    return result;
}

module.exports = convertToRomanNumber;