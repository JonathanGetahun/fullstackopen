const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async(request, response) => {
      const blog = await Blog.find({}).populate('user', {name:1, username:1})
      response.json(blog)
  })
  
  blogRouter.post('/', async(request, response) => {
    
    const body = request.body
    //userId is being created in request and saved to user
    const user = await User.findById(body.userId)
    
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    if(!blog.likes){
      blog.likes = 0
    }
    //we save the blog after the user id is added into the blog db
    const savedBlog = await blog.save()
    //we save the blog data in the user db as well, because it can have more than one.
    user.blogs = user.blogs.concat(savedBlog._id)
    
    await user.save()
    response.json(savedBlog)
  })

  blogRouter.delete('/:id', async(request,response) => {
      blog = await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end()
  })

  blogRouter.put('/:id', async(request, response) => {
    blog = request.body
    const changed = await Blog.findByIdAndUpdate(request.params.id,blog,{new: true})
    response.json(changed.toJSON)
  })

  module.exports =  blogRouter 