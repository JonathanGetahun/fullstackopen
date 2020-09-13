const bcrypt = require('bcrypt')
const User = require('../models/user')
// const { response } = require('express')
const userRouter = require('express').Router()



userRouter.post('/', async(req,res) => {
    const body = req.body

    if(!body.password || body.password < 3) return res.status(400).send('password is less than 3 char')
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password,saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        password: passwordHash
    })

    const savedUser = await user.save()

    res.json(savedUser)
})

userRouter.get('/', async(req,res) => {
    
    //populate or join two separate collections. In this one we are using the User
    //model, and have set blogs in there as a ref. 
    const users = await User.find({}).populate('blogs', {title:1,author:1,url:1,likes:1})
    res.json(users.map(user => user.toJSON()))
})

module.exports = userRouter