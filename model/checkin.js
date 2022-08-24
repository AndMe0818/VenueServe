// 预约表
//引入mongoose

const mongoose = require("mongoose");

// 创建场地预约 集合规则
const checkSchema = new mongoose.Schema({
  //场地id
  gid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ground",
  },
  //评论人的用户id
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  //   预约发起时间
  time: {
    type: Date,
    default: Date.now
  },
  // 当前天
  date:{
    type:Number
  },
  // 预约的类型 0 1 2 上午 中午 下午
  type: {
    type: Number,
  },
  //   预约状态：
  state: {
    type: Boolean,
    default:true
  },
});
//创建集合
const Check = mongoose.model("Check", checkSchema);
// 导出用户集合
// 609644c734eebd011419a986
// Check.create({
//       uid:'6054a1670d7d503770f32e41',
//       gid:'609644c734eebd011419a986',
//       type: 2,
//           date:20210517,
//     state:true
//     })
//       .then(() => {
//         console.log("预约成功");
//       })
//       .catch((err) => {
//         console.log(err);
//         console.log("预约创建失败");
//    });
module.exports = { Check };
