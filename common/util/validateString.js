

// 校验 用户名等字符串是否合法
exports.validateId = function (str) {
  return (/^[a-zA-Z0-9\-_]+$/i).test(str);
};