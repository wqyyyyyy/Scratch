const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

var usersSchema = new Schema({
  userName: String,
  passWord: String,
  avatar: String,
  introduce: String,
  worksList: [
    {
      worksTitle: String,
      wokksCover: String,
      views: Number,
      likes: Number,
    }
  ]
});

module.exports = model('Users', usersSchema, 'users');