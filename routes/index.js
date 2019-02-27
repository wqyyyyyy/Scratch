var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,path.join(__dirname + '/../public/sbfiles'))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '.sb3')
  }
})
var upload = multer({storage});
router.post('/savefile',upload.any(), function(req, res, next) {
  // console.log(req.files)
  res.json({
    status: 1
  })
});

router.get('/', function(req, res, next) {
  var options = {
    headers: {
      'Content-Type': 'text/html; charset=utf-8'
    }
  }
  res.sendFile('C:/Users/po/Desktop/doit/zhihuixue/zhihuixue_backend/static/index.html', options, (err) => {
    if (err) {
      next(err)
    } else {
      console.log('sent')
    }
  })
});


router.get('/requestfile',(req, res, next) => {
  var options = {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Access-Control-Allow-Credentials': true
    }
  }
  let project = req.query.project
  if (project) {
    res.cookie('project', project, {maxAge: 1000 * 60 * 60, httpOnly: true})
  }
  res.sendFile('C:/Users/po/Desktop/doit/zhihuixue/zhihuixue_backend/views/index.html', options, (err) => {
    if (err) {
      next(err)
    } else {
      console.log('sent')
    }
  })
})

router.get('/sbfile/getfile', (req, res, next) => {
  let project = req.cookies.project || '';
  if (project) {
    res.sendFile(path.join(__dirname + `/../static/sbfiles/${project}`))
  }
})

module.exports = router;