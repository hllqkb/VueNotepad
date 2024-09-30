var models = require('../db/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../db/sqlMap');

var conn = mysql.createConnection(models.mysql);

conn.connect(err => {
    if (err) {
        console.error('Database connection error:', err.stack);
        return;
    }
    console.log('Connected to database.');
});


var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.send('err');
    } else {
        console.log(ret);
        res.send(ret);
    }
}

var dateStr = function(str) {
    return new Date(str.slice(0,7));
}
// 增加用户接口
router.get('/hello', (req, res) => {
    
    res.send('hello world');
});
router.post('/addUser', (req, res) => {
    var sql = $sql.user.add;
    var params = req.body;
    console.log(params);
    // 去掉不需要的字段
    conn.query(sql, [params.name, params.account, params.pass], function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send('Database error');
        }
        if (result) {
            jsonWrite(res, result);
        } else {
            res.status(400).send('Failed to add user');
        }
    });
});


//查找用户接口
router.post('/login', (req, res) => {
    var sql_name = $sql.user.select_name; // 确保这段 SQL 语句是有效的
    var params = req.body;

    if (!params.name) {
        return res.status(400).send('用户名不能为空'); // 确保用户提供了用户名
    }
    
    sql_name += " where username = ?"; // 使用参数化查询预防 SQL 注入 

    conn.query(sql_name, [params.name], function(err, result) {
        if (err) {
            console.log(err); // 打印错误信息
            return res.status(500).send('查询失败，请联系管理员'); // 返回适当的状态和信息
        }

        if (result[0] === undefined) {
            res.send('-1'); // 查询不出用户名
        } else {
            var resultArray = result[0];
            console.log(resultArray);
            if (resultArray.password === params.password) {
                jsonWrite(res, result);
            } else {
                res.send('0'); // 密码错误
            }
        }
    });
});



//获取用户信息
router.get('/getUser', (req, res) => {
    var sql_name = $sql.user.select_name;
    // var sql_password = $sql.user.select_password;
    var params = req.body;
    console.log(params);
    if (params.name) {
        sql_name += "where username ='"+ params.name +"'";
    }
    conn.query(sql_name, params.name, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //查询不出username，data 返回-1
        } else {
            jsonWrite(res, result);
        }
    })
});

//更新用户信息
router.post('/updateUser', (req, res) => {
    var sql_update = $sql.user.update_user;
    var params = req.body;
    console.log(params);
    if (params.id) {
        sql_update  += " email = '" + params.email +
                        "',phone = '" + params.phone +
                        "',card = '" + params.card +
                        "',birth = '" + params.birth +
                        "',sex = '" + params.sex +
                        "' where id ='"+ params.id + "'";
    }    
    conn.query(sql_update, params.id, function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        if (result.affectedRows === undefined) {
            res.send('更新失败，请联系管理员')   //查询不出username，data 返回-1
        } else {
            res.send('ok'); 
        }
    })
});

//更改密码
router.post('/modifyPassword', (req, res) => {
    var sql_modify = $sql.user.update_user;
    var params = req.body;
    console.log(params);
    if (params.id) {
        sql_modify +=  " password = '" + params.pass +
                        "',repeatPass = '" + params.checkPass +
                        "' where id ='"+ params.id + "'";
    }
    conn.query(sql_modify, params.id, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result.affectedRows === undefined) {
            res.send('修改密码失败，请联系管理员')   //查询不出username，data 返回-1
        } else {
            res.send('ok'); 
        }
    })
});


module.exports = router;
