import React from 'react';
import ReactDOM from 'react-dom';
import Course from './components/Course'

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = (props) => {
  const sum = props.parts.reduce((s,p) => {
    console.log(s)
    return s += p.exercises
  }, 0)
  
  return(
    <p>Number of exercises {sum}</p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {
       course.parts.map(val => 
         <Part key={val.id} part={val} />
       )}
       <Total parts={course.parts} />
    </div>
  )
}




const App = () => {
  const course = [{
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: "meow",
        exercises: 2,
        id: 4
      }
    ]
  },
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }]

  return (course.map(courses => <Course course={courses} />))
}

export {Header, Content}


ReactDOM.render(<App />, document.getElementById('root'))