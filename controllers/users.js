const router = require('express').Router()

const { User } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll()
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

module.exports = router