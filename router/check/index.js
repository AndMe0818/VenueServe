// 工作日志业务层
const { Check } = require("../../model/checkin");

// 预定场地
const bookGround = async (req, res) => {
  //接受用户传递信息
  const { gid, uid, date, type } = req.body;
  //   添加 预约
  await Check.create({
    uid: uid,
    gid: gid,
    date: date,
    type: type,
    state: true,
    time: new Date(),
  });
  res.sendResult("预约发起路由", 204, "场地预约成功");
};

//   预约列表
const getCheckList = async (req, res) => {
  let { data, uid } = req.body;
  if (req.session.role == "admin") {
    if (data) {
      let checks = await Check.find({ date: date })
        .sort({ _id: -1 })
        .populate("uid")
        .populate("gid");
      return res.sendResult({ checkList: checks }, 200, "场地预约预约列表");
    } else {
      let checks = await Check.find({})
        .sort({ _id: -1 })
        .populate("uid")
        .populate("gid");
      return res.sendResult({ checkList: checks }, 200, "场地预约列表");
    }
  } else {
    if (data) {
      let checks = await Check.find({ uid: uid, date: date })
        .sort({ _id: -1 })
        .populate("uid")
        .populate("gid");
      return res.sendResult({ checkList: checks }, 200, "场地预约预约列表");
    } else {
      let checks = await Check.find({uid:uid})
        .sort({ _id: -1 })
        .populate("uid")
        .populate("gid");
      return res.sendResult({ checkList: checks }, 200, "场地预约列表");
    }
  }
};
// 导出
module.exports = {
  bookGround,
  getCheckList,
};
