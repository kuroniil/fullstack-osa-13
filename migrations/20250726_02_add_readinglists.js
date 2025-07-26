const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('readinglists', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
    },
    })
    await queryInterface.createTable('readinglist_blogs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      readinglist_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'readinglists', key: 'id' },
    },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id' },
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('readinglists')
    await queryInterface.dropTable('readinglist_blogs')
  },
}