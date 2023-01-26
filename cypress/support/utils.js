const Papa = require('papaparse')
class Utils {
    static csvToObject(csv_str) {
        var objs = Papa.parse(csv_str, {
            header: true,
            dynamicTyping: false,
        })
        return objs.data
    }

    static generateRandomCharacters(length) {
        return (+new Date * Math.random()).toString(36).substring(0, length)
    }

    static randomInteger(max) {
        return Math.round(Math.random() * max)
    }
}

module.exports = Utils;
