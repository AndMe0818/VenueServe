//引入mongoose
const mongoose = require("mongoose");
//创建用户集合规则
//引入joi模块
const Joi = require("joi");
const usersSchema = new mongoose.Schema({
  //1.用户名 邮箱
  username: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 20,
  },
  //登录凭证，保证唯一
  email: {
    type: String,
    //保证邮箱地址不重复
    unique: true,
  },
  password: {
    type: String,
    require: true,
    // select:false,
  },
  //角色 admin管理员 normal普通用户
  role: {
    type: String,
    required: true,
    default: 'normal',
  },
  // 状态
  state: {
    type: Boolean,
    //0 启用 1禁用
    default: true,
  },
});

//创建集合
const User = mongoose.model("User", usersSchema);

// 验证用户信息的方法
const validateUser = (user)=>{
  //定义验证规则
  const schema = Joi.object({
   username: Joi.string()
     .min(2)
     .max(12)
     .required()
     .error(new Error("用户名不符合规则")),
   email: Joi.string()
     .email()
     .required()
     .error(new Error("邮箱格式不符合要求")),
   password: Joi.string()
     .regex(/^[a-zA-Z0-9]{5,17}$/)
     .required()
     .error(new Error("密码格式不符合要求")),
   role: Joi.string()
     .valid("normal", "admin")
     .required()
     .error(new Error("角色值格式不符合要求")),
   state: Joi.boolean()
     .valid(true, false)
     .required()
     .error(new Error("状态值不符合要求")),
 });
   //进行验证
 return   schema.validateAsync(user);
}

// 实例化一个用户
// User.create({
//   username:'Element',
//   email:'12292823@qq.com',
//   password:'123456',
//   role:'normal',
//   state:0
// }).then(()=>{
//   console.log('用户创建成功');
// }).catch((err)=>{
//   console.log(err);
//   console.log('用户创建失败');
// })
// 导出用户集合
module.exports = { User,validateUser};
