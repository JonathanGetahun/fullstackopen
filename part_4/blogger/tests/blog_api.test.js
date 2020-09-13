const mongoose = require('mongoose')
require('express-async-errors')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/test_helper')
const Blog = require('../models/blog')
const config = require('../utils/config')

const api = supertest(app)

beforeAll( () => {
    mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
})

beforeEach( async() => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('when some blogs are saved', () => {
    test('blog list returns correct number of blog posts', async () => {
    
        const response = await api.get('/api/blogs')

        expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('unique identifier is named id', async() => {
    const response = await api.get('/api/blogs')

    const result = await Blog.find({})
    result.map(value => expect(value.id).toBeDefined())
    
    })
})

describe('when blog gets posted', () => {
    test('total number of blogs increased by one', async() => {
        newBlog =  {
            title: 'Type wars',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
            likes: 2,
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
        
    })
    
    test('likes get value 0 as default', async () => {
        const newBlog = {
          title: 'Blazing Fast Delightful Testing',
          author: 'Rick Hanlon',
          url: 'https://jestjs.io/blog/2017/01/30/a-great-developer-experience'
        }
    
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await Blog.find({})
        const added = blogsAtEnd.find(b => b.url === newBlog.url)
    
        expect(added.likes).toBe(0)
      }) 
})

// afterAll(async () => {
//     await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
//     mongoose.connection.close()
// });
afterAll(() => {
    mongoose.connection.close()
})