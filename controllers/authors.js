const router = require('express').Router()
const { Blog } = require('../models')
const { col, fn } = require('sequelize')


router.get('/', async (req, res) => {
    const authors = await Blog.findAll({ 
      group: ['author'],
      attributes: ['author', [fn('COUNT', col('id')), 'blogs'], [fn('SUM', col('likes')), 'likes']]
    })

    res.json(authors)
  })

module.exports = router