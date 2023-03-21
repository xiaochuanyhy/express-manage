// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

const joi = require('joi')

// 导入配置文件
const config = require('./config')

// 解析 token 的中间件
const expressJWT = require('express-jwt')

// write your code here...

// 导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors())

//配置表单结构的中间件 ，注意：只能解析application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// 响应数据的中间件
app.use(function (req, res, next) {
  // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
  res.cc = function (err, status = 1) {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})


// 导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)


// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

// 错误中间件
app.use(function (err, req, res, next) {
  // 省略其它代码...

  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
if (err instanceof joi.ValidationError) return res.cc(err)
  // 未知错误...
  res.cc(err)
})

// 导入并使用文章分类路由模块
const listRouter = require('./router/list')
const teacherRouter = require('./router/teacher')
const userlistRouter = require('./router/userlist')
const classRouter = require('./router/class')
// 为文章分类的路由挂载统一的访问前缀 /my/article
app.use('/my/list', listRouter)
app.use('/my/teacher', teacherRouter)
app.use('/my/user', userlistRouter)
app.use('/my/class', classRouter)
// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3007, function () {
  console.log('api server running at http://127.0.0.1:3007')
})
