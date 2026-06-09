import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import React from 'react'

const Rating = ({ value, text }) => {
  return (
    <div className='rating'>
        <span className='rating-star'>
            { value >= 1 ? <FaStar/> : value >= 0.5 ? <FaStarHalfAlt/> : <FaRegStar /> }
        </span>
        <span className='rating-star'>
            { value >= 2 ? <FaStar/> : value >= 1.5 ? <FaStarHalfAlt/> : <FaRegStar /> }
        </span>
        <span className='rating-star'>
            { value >= 3 ? <FaStar/> : value >= 2.5 ? <FaStarHalfAlt/> : <FaRegStar /> }
        </span>
        <span className='rating-star'>
            { value >= 4 ? <FaStar/> : value >= 3.5 ? <FaStarHalfAlt/> : <FaRegStar /> }
        </span>
        <span className='rating-star'>
            { value >= 5 ? <FaStar/> : value >= 4.5 ? <FaStarHalfAlt/> : <FaRegStar /> }
        </span>
        <span className="rating-text">
            { text && text }
        </span>
    </div>
  )
}

export default Rating
