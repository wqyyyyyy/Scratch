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

var upload = multer({
  // dest: 'sbfiles/',
  storage
});
router.post('/savefile',upload.any(), function(req, res, next) {
  // console.log(req.files)
  res.json({
    status: 1
  })
});

router.get('/requesetfile',(req, res, next) => {
  console.log(req.query)
  let projcet = req.query.project
  var options = {
    headers: {
      'Content-Type': 'text/html; charset=utf-8'
    }
  }
  console.log(req.cookies.project)
  res.header('Access-Control-Allow-Credentials', true);
  res.cookie('project', projcet, {maxAge: 1000 * 60 * 60, httpOnly: true})
  // var fileNmae = 'scratch';
  res.sendFile('C:/Users/po/Desktop/doit/zhihuixue/zhihuixue_backend/views/index.html', options, (err) => {
    if (err) {
      next(err)
    } else {
      console.log('sent')
    }
  })
  // res.sendFile(path.join(__dirname + '/../static/sbfiles/blob.sb3'))
})

module.exports = router;