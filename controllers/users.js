const router = require('express').Router()

const { User, Blog, Readinglist, ReadinglistBlog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog
    }
  })
    res.json(users)
})

router.post('/', async (req, res) => {
  const addedUser = await User.create(req.body)
  res.json(addedUser)
})

router.put('/:username', async (req, res) => {
    const user = await User.findOne({ where:  { username: req.params.username } })
    const newUsername = req.body.username
    if (newUsername) {
        user.username = newUsername
        await user.save()
        res.json(user)
    } else {
        response.status(404).end()
    }
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, { 
    attributes: ['id', 'name', 'username'],
    include: {
      model: Readinglist,
      attributes: ['id'],
      include: {
        model: Blog,
        attributes: ['url', 'title', 'author', 'likes', 'year'],
        through: { attributes: ['readinglistId', 'readState'] }
      }
    }

  })
  if (!user.readinglist) {
    const readinglist = await Readinglist.create({ userId: user.id })
    user.readinglist = readinglist
  }
    res.json({
      id: user.id,
      name: user.name,
      username: user.username,
      readings: user.readinglist.blogs
    })
})

module.exports = router