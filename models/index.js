var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.mongoose_db, {
    server: {
        poolSize: 20
    }
}, function (err) {
    if (err) {
        console.log(err.message);
        // logger.error('connect to %s error: ', config.mongoose_db, err.message);
        process.exit(1);
    }
});

require('./user.js');
require('./post.js');
require('./oneWord.js');

exports.User = mongoose.model('User');
exports.DPOST = mongoose.model('DPOST');
exports.OneWord = mongoose.model('OneWord');