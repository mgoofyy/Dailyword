const routes = require('./routes/index');
const users = require('./routes/user/users');
const sign  = require('./routes/user/sign');

exports = module.exports = function(app) {
    app.use('/', routes);
    app.use('/users', users);
    app.post('/users/sign',sign.signup);
}