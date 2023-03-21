// 导入数据库操作模块
const db = require('../db/index')

exports.searchuser=(req,res) => {
  const sql = `select id, username, is_delete, status, postion  from ev_users where id=?`
  db.query(sql, req.body.id, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
  
  
    // 把数据响应给客户端
    res.send({
      status: 0,
      message: '更新成功',
      data: results,
    })
  })
}

// 获取文章分类列表数据的处理函数
exports.getlist = (req, res) => {
  // 根据分类的状态，获取所有未被删除的分类列表数据
// is_delete 为 0 表示没有被 标记为删除 的数据
const sql = 'select id, username, is_delete, status, postion from ev_users '
db.query(sql, (err, results) => {
  // 1. 执行 SQL 语句失败
  if (err) return res.cc(err)

  // 2. 执行 SQL 语句成功
  res.send({
    status: 0,
    message: '获取学生列表成功',
    data: results,
  })
})
}

// 更新学生状态
exports.updateuser = (req, res) => {
  const sql = `update ev_users  set ? where id=?`
  db.query(sql, [req.body, req.body.id], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
  
    // 执行 SQL 语句成功，但影响行数不为 1
    if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')
  
    // 修改用户信息成功
    return res.cc('修改用户基本信息成功！', 0)
  })
}


//  删除学生byid
exports.deleteuser = (req, res) => {
  const sql = "UPDATE ev_users SET is_delete = 1 WHERE id=?"
  db.query(sql, req.body.id, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
  
    // SQL 语句执行成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('删除失败！')
  
    // 删除文章分类成功
    res.cc('删除成功！', 0)
  })
}

