const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class ReadinglistBlog extends Model {}

ReadinglistBlog.init({
  blogId: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'blogs', key: 'id' },
  },
  readinglistId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'readinglists', key: 'id' },
  },
  readState: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'readinglistBlog'
})

module.exports = ReadinglistBlog