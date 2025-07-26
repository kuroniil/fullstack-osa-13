const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class ReadinglistBlog extends Model {}

ReadinglistBlog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ReadinglistId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'readinglists', key: 'id' },
  },
  BlogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'blogs', key: 'id' },
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