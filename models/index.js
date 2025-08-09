const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')
const ReadinglistBlog = require('./readinglist_blog')

User.hasMany(Blog)
Blog.belongsTo(User)

User.hasOne(Readinglist)
Readinglist.belongsTo(User)

Readinglist.hasMany(ReadinglistBlog)
ReadinglistBlog.belongsTo(Readinglist)

Blog.hasMany(ReadinglistBlog)
ReadinglistBlog.belongsTo(Blog)

module.exports = {
  Blog,
  User,
  Readinglist,
  ReadinglistBlog
}