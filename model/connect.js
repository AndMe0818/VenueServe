const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/myObj',{useNewUrlParser: true,useUnifiedTopology: true})
    .then(()=>{console.log('数据库链接成功')})
    .catch((err)=>{console.log(err,'数据库链接失败')})