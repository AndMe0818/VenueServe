//引入mongoose
const mongoose = require("mongoose");

// 创建场地集合
const groundsSchema = new mongoose.Schema({
  //1. 场地类型
  gType: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 20,
  },
  //场地编号
  gNo: {
    type: Number,
    require: true,
  },
  // 状态
  gState: {
    type: Boolean,
    //true 启用 false禁用
    default: true,
  },
  gPrice: {
    type: Number,
    require: true,
  },
});
//创建集合
const Ground = mongoose.model("Ground", groundsSchema);
// 创建场地集合
// Ground.create({
//   gType: "乒乓球",
//   gNo: 3,
//   gState: true,
//   gPrice: 10,
// })
//   .then(() => {
//     console.log("场地创建成功");
//   })
//   .catch((err) => {
//     console.log(err);
//     console.log("场地创建失败");
//   });
// 导出用户集合
module.exports = { Ground };
