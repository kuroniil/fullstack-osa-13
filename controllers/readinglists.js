const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const { User, ReadinglistBlog, Readinglist } = require('../models')

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

router.post('/', async (req, res) => {
  const { blog_id, user_id } = req.body
  let userReadinglist = await Readinglist.findOne({ where: {user_id: user_id} })
  if (!userReadinglist) {
    userReadinglist = await Readinglist.create({ userId: user_id })
  }
  try {
    const addedBlog = await ReadinglistBlog.create({ blogId: blog_id, readinglistId: userReadinglist.id })
    res.json(addedBlog)
  } catch (e) {
    console.log(e)
    res.send('error adding blog to readinglist')
  }
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const readinglist = await Readinglist.findOne({ where: { userId: user.id }})
  const read = typeof req.body.read == 'boolean' ? req.body.read : null
  const blogInReadinglist = await ReadinglistBlog.findOne({ where: { 
    readinglistId: readinglist.id,
    blogId: req.params.id
  }})
  if ((read !== null) && blogInReadinglist) {
    const readinglist_blog = await ReadinglistBlog.update(
      { readState: read },
      { where: { blogId: req.params.id, readinglistId: readinglist.id } }
    )
    res.json(readinglist_blog)
  } else {
    res.status(400).end()
  }
})

module.exports = router