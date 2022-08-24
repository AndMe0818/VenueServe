const express = require("express");
//创建网站服务器
const app = express();
//引入系统模块path
const path = require("path");
//引入body-parser模块 用来处理post请求
const bodyParser = require("body-parser");
const qs = require("qs");
// 引入 qs parse 处理 get请求参数
const queryparse = qs.parse;

//引入 数据库链接模块
require("./model/connect");
// 引入用户集合
require("./model/user");
// 引入场地集合
require("./model/ground");
// 引入预约
require("./model/checkin");
// 引入express-session模块
const session = require("express-session");

// 处理post请求参数 app.use 拦截所有请求
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }))
// 设置session
app.use(
  session({
    secret: "sercet key",
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// 设置跨域和相应数据格式
app.all("/api/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, mytoken");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization");
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  if (req.method == "OPTIONS") res.send(200);
  /*让options请求快速返回*/ else next();
});

// 处理请求，返回统一格式的中间件
const resextra = require("./modules/resxtra");
app.use(resextra);

// app.use('/api',(req,res,next)=>{
//   req.session.username='12313'
//   next()
// })
// 路由守卫
app.use("/api", require("./middleware/loginGuard"));

// 引入路由
const login = require("./router/login");
app.use("/api/login", login);

const user = require("./router/users");
app.use("/api/user", user);

const ground = require('./router/ground')
app.use('/api/ground',ground)

const check = require('./router/check')
app.use('/api/check',check)
//错误处理中间键
app.use((err, req, res, next) => {
  logger.error(err.message, err);
  if (req.xhr) {
    return res.json({
      state: false,
      msg: err.message,
    });
  }
  next(err);
});

//监听端口
app.listen(8088, () => {
  console.log("服务器启动成功");
  console.log("Server listening at http://localhost:8088");
});
