// 登录逻辑层

// 引入 user 用户集合
const { User, validateUser } = require("../../model/user");

const loginFnc = async (req, res, next) => {
  console.log(req.url);
  // 结构 请求参数  获取到 邮箱和密码
  const { email, password } = req.body;
  // 查询数据库
  let user = await User.findOne({ email });
  if (user) {
    if (password == user.password) {
      user.password = undefined;
     req.session.username = user.username;
     req.session.role = user.role;
     console.log(req.session);
      return res.sendResult({user:user}, 200, "登录成功");
    } else {
      return res.sendResult({ email, password }, 400, "邮箱地址或密码错误");
    }
  } else {
    return res.sendResult({ email, password }, 400, "邮箱地址或密码错误");
  }
  // next();
};

module.exports = { loginFnc };
