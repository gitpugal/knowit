import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import star from "../star.png";
import { Link } from 'react-router-dom';

const IndividualCard = () => {
    const location = useLocation()
    const [movieData, setMovieData] = useState(location.state.show)
    // console.log(from)
  return (
    <div className='h-full overflow-y-scroll w-screen absolute bg-[#181920] '>
        <Link className='absolute bg-gradient-to-r from-teal-300 to-blue-600 p-2 rounded-xl right-3 top-3' to="/welcome">
            Back
        </Link>
        <img src={movieData.image?.original} 
        className='w-[100%] h-[28%]  object-cover object-top' alt="" />
        <h1 className='absolute top-16 text-6xl font-extrabold left-4'>{movieData.name}</h1>
        <div className='h-[40%] flex flex-col mt-8 gap-6 mb-10'>
        <div className='flex flex-row  gap-6 '>
            <div  className='h-[100%] w-[full]'>
                <img src={movieData.image?.medium} className='h-[100%] ml-4 rounded-xl' alt="" />
                {movieData.genres.map(tag => (
                <p className='inline mx-2 text-xs ml-4 relative'># {tag}</p>
                ))}
            </div>
            <div>
            <p className='text-2xl md:3xl font-bold'>{movieData.name}</p>
            <p className='font-light text-sm mt-2'>{movieData.language}</p>
            <p className=' mt-3'>Rating</p>
            <p className="text-gray-500">{movieData.rating.average} <img src={star} width={16} className="inline mb-1" alt="" /></p>
            <p className=' mt-3'>Release Date</p>
            <p  className="text-gray-500">{movieData.premiered}</p>
            <p className=' mt-3'>Rating</p>
            <p className="text-gray-500">{movieData.runtime} min</p>
            </div>
            </div>
        <div className='mt-8 md:mt-28  md:w-[50%] pb-20 px-10'>
            <h1>Summary</h1>
            <p>{movieData.summary.replace("<p>", "").replace("</p>", "")}</p>
        </div>
        </div>
        
    </div>
  )
}

export default IndividualCard