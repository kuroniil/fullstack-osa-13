const router = require('express').Router()
const jwt = require('jsonwebtoken')

const { Blog, User } = require('../models')
const { SECRET } = require('../util/config')
const { Op } = require('sequelize')


router.get('/', async (req, res) => {
  let queryWord = ""
  if (req.query.search) {
    queryWord = req.query.search
  }

  const blogs = await Blog.findAll({
    include: {
      model: User
    },
    where: {
      title: {
        [Op.iLike]: queryWord 
          ? '%' + queryWord + '%' 
          : '%'
      }
    }
  })
  res.json(blogs)
})

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error) {
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }

  next()
}

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const addedBlog = await Blog.create({...req.body, userId: user.id})
  res.json(addedBlog)
})

router.delete('/:id', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const targetBlog = await Blog.findByPk(req.params.id, 
  {include: {
      model: User,
      attributes: ['id']
    }})
  if (!targetBlog) {
    res.status(400).end()
  }
  if (targetBlog.userId === user.id) {
      await targetBlog.destroy()
      res.status(204).end()
  }
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