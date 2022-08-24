// 场地 逻辑层
const { Ground } = require("../../model/ground");
const { Check } = require("../../model/checkin");
const { User } = require("../../model/user");
// 获取场地列表
const getGroundList = async (req, res) => {
  let type = req.query.type;
  console.log(type);
  if (type) {
    let grounds = await Ground.find({ gType: { $regex: type } });
    res.sendResult({ grounds: grounds }, 204, "场地列表路由");
  } else {
    let grounds = await Ground.find({});
    res.sendResult({ grounds: grounds }, 204, "场地列表路由");
  }
};
// 增加场地
const addGround = async (req, res) => {
  console.log(req.body);
  await Ground.create(req.body)
  res.sendResult(req.body, 201, "场地增加成功");
};
// 修改场地
const updateGround = async (req, res) => {
  res.sendResult(undefined, 204, "场地修改");
};
// 删除场地
const deleteGround = async (req, res) => {
  res.sendResult(undefined, 204, "场地删除");
};
// 查看预约场地
const checkGround = async (req, res) => {
  console.log(req.body);
  let gid = req.body.gid;
  let date = req.body.date;
  let checks = await Check.find({ gid: gid, date: date }).populate('uid').populate('gid');
  res.sendResult({ checkList: checks }, 200, "场地预约");
};

// 导出
module.exports = {
  getGroundList,
  addGround,
  updateGround,
  deleteGround,
  checkGround,
};
