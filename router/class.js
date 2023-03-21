// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入学生的路由处理函数模块
const artcate_handler = require('../router_handler/class')
// 获取学生的列表数据
router.get('/list', artcate_handler.getlist)

// 更新学生状态
router.post('/changeinfo', artcate_handler.updateclass)


// 删除学生 即改变状态码0 1
router.post('/deleteclass' , artcate_handler.deleteClassById)

// 查找学生
// router.post('/searchstudent' , artcate_handler.searchStudent)

//增加
router.post('/addclass' , artcate_handler.addClass)

// 向外共享路由对象
module.exports = router