// 预约路由

const express = require("express");

const check = express.Router();

const { bookGround,getCheckList} = require("./check/index");


//增加场地
check.post("/bookGround", bookGround);

// 查询预约列表
check.post('/getCheckList',getCheckList)


module.exports = check;