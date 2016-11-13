const routes = require('./routes/index');
const users = require('./routes/user/users');
const sign  = require('./routes/user/sign');
const login = require('./routes/user/login');

exports = module.exports = function(app) {
    app.use('/', routes); //请求API root URL
    app.post('/users/profile/update', users.update);  //
    app.post('/users/sign',sign.signup);  //注册
    app.post('/users/login',login.login); //登陆  密码登陆和验证码登陆
    app.post('/users/login/verfityCode',login.verfityCode); //获取登陆验证码
}