import React from 'react'
import { Link } from 'react-router-dom'
import image from '../assets/pna.jpg'

const PageNotAvailable = () => {
  return (
    <div className='page-not-available'>
      <img src={image} />
      <p className='msg-1'>Lost Your Way?</p>
      <p className='msg-2'>Sorry we can't find that page.</p>
      <p className='msg-3'>You'll find lots to explore on the home page</p>
      <Link to='/' className='btn-div'>
         TMDB Home
      </Link>
      <p className='error-msg'>Error Code <span> 404</span></p>
    </div>
  )
}

export default PageNotAvailable