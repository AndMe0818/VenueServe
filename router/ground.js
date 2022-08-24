// 场地管理路由
const express = require("express");

const ground = express.Router();

// 引入逻辑层
const { getGroundList,addGround,updateGround,deleteGround,checkGround} = require("./ground/index");
// 获取场地列表
ground.get("/getGroundList", getGroundList);
//增加场地
ground.post("/addGround", addGround);
// 修改场地
ground.post("/updateGround", updateGround);
// 删除场地
ground.post("/deleteGround", deleteGround);
// 场地预约信息
ground.post('/checkGround',checkGround)

module.exports = ground;
