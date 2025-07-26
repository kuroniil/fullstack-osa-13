const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')
const ReadinglistBlog = require('./readinglist_blog')

User.hasMany(Blog)
Blog.belongsTo(User)
User.hasOne(Readinglist)
Readinglist.belongsTo(User)
Blog.belongsTo(Readinglist, { through: ReadinglistBlog })

module.exports = {
  Blog,
  User,
  Readinglist,
  ReadinglistBlog
}