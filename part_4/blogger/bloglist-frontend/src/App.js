import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogService'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newBlog, setNewBlog] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedBlogAppUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedBlogAppUserJSON){
      const user = JSON.parse(loggedBlogAppUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  })

  const handleLogin = async (event) => {
    event.preventDefault()
    //if the login is successful, the form fields are emptied and the server response
    //(including token and user details) is saved to the user field of the application's state
   try{
     //will get the username and password from the login backend, because it is
     //returned in the response
     const user = await loginService.login({
       username,password
     })

     window.localStorage.setItem(
       'loggedBlogAppUser', JSON.stringify(user)
     )

     blogService.setToken(user.token)
     setUser(user)
     setUsername('')
     setPassword('')
   } catch (exception){
     setErrorMessage('Wrong credentials')
     setTimeout(() => {
       setErrorMessage(null)
     }, 5000)
   }
  }

  const addBlog = () => (
    <Blog props={newBlog}/>
  )

  const handleBlogChange = () => (
    setNewBlog(newBlog)
  )

  const loginForm = () => (
    <form onSubmit ={handleLogin}>
    <div>
      username 
        <input 
        type="text"
        value={username}
        name="Username"
        onChange={({target}) => setUsername(target.value)}
        />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({target}) => setPassword(target.value)}
        />
    </div>
    <button type="submit">login</button>
  </form>
  )


const blogForm = () => (
  <form onSubmit = {addBlog}>
    <input
      value={newBlog}
      onChange={handleBlogChange}
      />
      <button type ="submit">save</button>
  </form>
)
  

  return (
    <div>
      <h2>blogs by jon gee</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

  
    {user !== null ? 
      <div><p>{user.name} logged-in</p> {blogForm()} </div> : 
      loginForm()}
  
      

    </div>
  )
}

export default App