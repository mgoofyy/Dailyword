

// 校验 用户名等字符串是否合法
exports.validateId = function (str) {
  return (/^[a-zA-Z0-9\-_]+$/i).test(str);
};

// 手机号校验
exports.validatePhone = function(str) {
  return (/^(1.[0-9]{9})$/).test(str);
}
