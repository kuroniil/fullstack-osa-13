const router = require('express').Router()

const { Blog } = require('../models/blog')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res) => {
  const addedBlog = await Blog.create(req.body)
  res.json(addedBlog)
})

router.delete('/:id', async (req, res) => {
  const targetBlog = await Blog.findByPk(req.params.id)
  await targetBlog.destroy()
  res.status(204).end()
})

module.exports = router