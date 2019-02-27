var express = require('express');
var router = express.Router();
const userModel = require('./models/usersModel');

var multer = require('multer');
var upload = multer();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST regesiter usrs listing. */
router.post('/register', upload.none(), function (req, res, next) {
  let registerName = req.body.registerName;
  let registerPwd = req.body.registerPwd;

  const nameReg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,12}$/
  const pwdReg = /^[a-zA-Z0-9]{8,20}$/

  // 检测用户名或密码是否合法
  if (nameReg.test(registerName) && pwdReg.test(registerPwd)) {
    let registerInfo = {
      userName: registerName,
      passWord: registerPwd,
      introduce: '这家伙很懒，什么也没说'
    }
    userModel.findOne({userName: registerName}, function (err, data) {
      if (err) {
        res.json({
          status: 1,
          message: err.message
        })
      } else {
        if (data) {
          res.json({
            status: 2,
            message: '用户名已经存在'
          }) 
        } else {
          let newUser = new userModel(registerInfo);
          newUser.save();
          res.json({
            status: 0,
            message: '注册成功'
          })
        }
      }
    })
  }
  // 用户名或密码不规范
  else {
    res.json({
      status: 2
    })
  }
})


//登陆
router.post('/login', upload.none(), function (req, res, next) {
  let loginName = req.body.userName ? req.body.userName : req.cookies.userName;
  let loginPwd = req.body.password ? req.body.password : req.cookies.passWord;
  // fetch请求头中加入了Credentials：‘include’ ，相应的要回应头要加入这一句
  res.header('Access-Control-Allow-Credentials', true);
  if (loginName && loginPwd) {
    if (loginName === 'null') {
      console.log(loginName,loginPwd)
      res.cookie('userName',loginName,{maxAge: 1000*60*30, domain: 'localhost',path: '/'})
      res.cookie('passWord',loginPwd, {maxAge: 1000*60*30, domain: 'localhost',path: '/'})
      res.json({
        status: 3,
        userInfo: {
          userName: '',
          worksList: '',
          intorduce: ''
        }
      })
    }
    else {
      userModel.findOne({userName: loginName}, function (err, data) {
        if (err) {
          res.json({
            status: 1,
            message: err.message
          })
        } else {
          if (data) {
            if (data.passWord === loginPwd) {
              res.cookie('userName',data.userName,{maxAge: 1000*60*30, domain: 'localhost',path: '/'})
              res.cookie('passWord',data.passWord, {maxAge: 1000*60*30, domain: 'localhost',path: '/'})
              res.json({
                status: 2,
                userInfo: {
                  userName: data.userName,
                  worksList: data.worksList,
                  intorduce: data.intorduce
                }
              })
            }
          } else {
            res.json({
              status: 0,
              message: '该用户不存在，请注册'
            })
          }
        }
      })
    }
  }
})

router.get('/login', (req, res, next) => {
  // res.header('Access-Control-Allow-Credentials', true);
  res.cookie('userName','no',{path: '/', domain: 'localhost'})
  res.cookie('oh','no', {path: '/', domain: 'localhost'})
  res.json({
    status: 0,
    message: '成功注销'
  })
})

module.exports = router;
