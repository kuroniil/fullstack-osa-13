require('dotenv').config()
const { DataTypes, Sequelize, QueryTypes, Model } = require('sequelize')
const express = require('express')
const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL)

class Blog extends Model {}

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    default: 0
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

app.post('/api/blogs', async (req, res) => {
    const addedBlog = await Blog.create(req.body)
    res.json(addedBlog)
})

app.delete('/api/blogs/:id', async (req, res) => {
    const targetBlog = await Blog.findByPk(req.params.id)
    await targetBlog.destroy()
    res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})