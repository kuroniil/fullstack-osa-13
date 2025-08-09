const router = require('express').Router()

const { ReadinglistBlog, Readinglist } = require('../models')

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

module.exports = router