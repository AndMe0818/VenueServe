// 用户 逻辑层
// 引入 user 用户集合
const { User, validateUser } = require("../../model/user");

// 用户列表集合
const getUserList = async (req, res) => {
  console.log(req.url);
  console.log(req.query);
  //接受客户端传递过来的当前页的参数
  let info = req.query.info;
  let pagenum = Number(req.query.pagenum) || 1;
  // 默认每页显示十条数据 pagesize
  let pagesize = Number(req.query.pagesize) || 5;
  //页码对应数据查询开始位置
  console.log(pagenum, pagesize);
  let start = (pagenum - 1) * pagesize;

  //查询总人数
  // 如果用户使用了搜索
  if (info !== "") {
    // countDocuments({条件}) 查询符合条件的个数
    let total = await User.countDocuments({ username: { $regex: info } });
    //将用户信息从数据库中查询
    let users = await User.find({ username: { $regex: info } }, { password: 0 })
      .limit(pagesize)
      .skip(start);
    res.sendResult({ users, total }, 200, "获取成功");
  } else {
    let total = await User.countDocuments({});
    //将用户信息从数据库中查询
    let users = await User.find({}, { password: 0 })
      .limit(pagesize)
      .skip(start);
    res.sendResult({ users, total }, 200, "获取成功");
  }
};
// 查找用户
const getUser = async (req, res) => {
  let id = req.query.id;
  let user = await User.findOne({ _id: id });
  res.sendResult({ user: user }, 200, "查找用户成功");
};
// 用户添加
const addUser = async (req, res, next) => {
  try {
    await validateUser(req.body);
  } catch (err) {
    res.sendResult(req.body, 400, err.message);
    return next();
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.sendResult(req.body, 400, "邮箱已被注册，请更换");
    return next();
  }
  //将用户信息添加
  await User.create(req.body);

  res.sendResult(req.body, 201, "添加用户成功");
};
// 用户删除
const deleteUser = async (req, res) => {
  // req.body
  console.log(req.body.id);
  let id = req.body.id;
  await User.findOneAndDelete({ _id: id });
  res.sendResult(undefined, 204, "已删除");
};
// 用户修改
const updateUser = async (req, res) => {
  //接受客户端传递过来的参数
  const { _id, username, email, role, state, password } = req.body;
  // try {
  //   await validateUser(req.body);
  // } catch (err) {
  //   res.sendResult(req.body, 400, err.message);
  //   return next();
  // }
  // console.log(req.body)
  let user = await User.findOne({ email: email });
  if (user) {
    res.sendResult(req.body, 400, "邮箱已被注册，请更换");
  } else {
    await User.updateOne(
      { _id: _id },
      {
        username: username,
        email: email,
        role: role,
        state: state,
      }
    );
    res.sendResult(undefined, 201, "用户修改成功");
  }
};
module.exports = { getUserList, getUser, addUser, deleteUser, updateUser };
