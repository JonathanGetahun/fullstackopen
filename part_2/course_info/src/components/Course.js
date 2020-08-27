import React from 'react';
import {Header,Content} from '../index'

const Course = ({course}) => {
    return( 
      <div>
      <Header course={course} />
      <Content course={course} />
      </div>
   
    )
   }

   export default Course;