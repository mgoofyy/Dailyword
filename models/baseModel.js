var moment = require('moment');
var timeTools = require('../common/util/time.js')

module.exports = function (schema) {
    schema.method.formatDate = function () {
        return timeTools.formatDate(this.createDate, true);
    };

    schema.method.formatDate = function () {
        return timeTools.formatDate(this.updateDate, true);
    };
}