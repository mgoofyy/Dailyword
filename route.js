const routes = require('./routes/index');
const users = require('./routes/user/users');


exports = module.exports = function(app) {
    app.use('/', routes);
    app.use('/users', users);
}