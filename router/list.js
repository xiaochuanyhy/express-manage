// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入学生的路由处理函数模块
const artcate_handler = require('../router_handler/list')
// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 获取学生的列表数据
router.get('/student', artcate_handler.getlist)

// 更新学生状态
router.post('/changeinfo', artcate_handler.updatetag)


// 删除学生 即改变状态码0 1
router.post('/deletestudent' , artcate_handler.deleteStudentById)

// 查找学生
router.post('/searchstudent' , artcate_handler.searchStudent)

//增加
router.post('/addchstudent' , artcate_handler.addStudent)

// 向外共享路由对象
module.exports = router