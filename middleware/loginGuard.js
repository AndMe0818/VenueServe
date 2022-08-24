// 路由守卫
const guard = (req, res, next) => {
  //判断用户是否访问的是登录接口
  //判断用户登录状态
  //如果是登录的 放行
  //如果不是登录的 重定向到登录页面
  if (req.url != "/login/admin" && ! req.session.username) {
    res.sendResult( req.session.username, 403, "请登录后再操作");
   
  } else {
    //   if(req.session.role=='normal'){}
    //如果是登录状态并且是普通用户
    // res.sendResult(req.session, 200, "登录成功");

    //用户是登录状态 请求放行
    next();
  }
 
};
module.exports = guard;
