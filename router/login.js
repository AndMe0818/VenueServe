// 登录路由

// 引入 express
const express = require("express");
// 创建 路由
const login = express.Router();
// 引入 处理路由方法
const {loginFnc } = require("./login/index");
// 接收路由
login.post('/admin',loginFnc)



module.exports = login;