// 用户管理路由
// 引入 express
const express = require("express");

const user = express.Router();

const { getUserList,getUser,addUser,deleteUser,updateUser} = require("./user/index");

// 获取用户列表
user.get("/getUserList", getUserList);
// 查询用户信息
user.get("/getUser", getUser);
// 添加用户
user.post('/addUser',addUser)
// 删除
user.post('/deleteUser',deleteUser)
// 修改用户
user.post('/updateUser',updateUser)

module.exports = user;
