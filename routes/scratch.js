var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var options = {
    headers: {
      'Content-Type': 'text/html; charset=utf-8'
    }
  }
  console.log(req.cookies.project)
  var fileNmae = 'scratch';
  res.sendFile('C:/Users/po/Desktop/doit/zhihuixue/zhihuixue_backend/static/scratch.html', options, (err) => {
    if (err) {
      next(err)
    } else {
      console.log('sent')
    }
  })
});

module.exports = router;