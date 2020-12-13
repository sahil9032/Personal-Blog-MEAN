const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: String,
  author: String,
  date: {type: Date, default: Date.now()},
  imagePath: String,
  content: String,
  comments: [{
    author: String,
    content: String,
    date: {type: Date, default: Date.now()}
  }]
});

module.exports = mongoose.model('Post', blogSchema, 'Post')
