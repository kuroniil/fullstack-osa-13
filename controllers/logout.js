const router = require('express').Router()
const User = require('../models/user')
const Session = require('../models/session')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

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

router.delete('/', tokenExtractor, async (req, res) => {
   const user = await User.findByPk(req.decodedToken.id)
   if (!user) {
    res.status(400).end()
   }
   await Session.destroy({ where: {
      userId: user.id
   }})
   res.status(204).end()
})

module.exports = router 