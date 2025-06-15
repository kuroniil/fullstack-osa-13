const router = require('express').Router()

const { Blog } = require('../models')

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

router.put('/:id', async (req, res) => {
  if (req.body.likes || req.body.likes === 0) {
    const blog = await Blog.findByPk(req.params.id)
    blog.likes = req.body.likes
    await blog.save()
    res.json(blog)
  } else {
    res.status(404).end()
  }
  
})

module.exports = router