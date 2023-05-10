import { upload } from '@testing-library/user-event/dist/upload';
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import eye from "../eye.png" ;
import jobData from '../constants';
import star from "../star.png"
import { Link } from 'react-router-dom';
const Welcome = () => {
    const location = useLocation();
    const [cuurentUser, setCurrentUser] = useState({});
    const [jobData, setjobData] = useState([])
  const navigate = useNavigate();
    useEffect(() => {
        axios.get("https://api.tvmaze.com/search/shows?q=all")
            .then(res => {
              setjobData(res.data);
              console.log(res.data[0])
            })
            .catch(err => console.log(err))
    }, [])

  return (
    <div className=' w-full h-screen overflow-y-scroll scrollbar-hide absolute bg-[#181920] text-white'>
        {
          <div className='flex flex-col gap-8 h-full'>
        <div className='flex flex-col items-center mt-3 h-full'>
        <h1 className='absolute sky-700 w-[95%] py-2 px-3  rounded-md '>
        Know <span className='text-xl font-bold text-gradient text-teal-300'>it.</span>
        </h1>
        <div className='absolute flex flex-row gap-3 justify-center 
        top-[100px] w-full mx-3 px-2 text-white '>
        <input type="text" className='bg-white bg-opacity-10 p-2 rounded-2xl' />
        
        <button className='bg-red-500 p-2 rounded-xl' onClick={() => {
          setCurrentUser({});
          navigate("/signin")
        }
        }>Go to home</button>
        </div>
        </div>
        

        <div className='mt-[140px] mx-auto w-full flex  flex-col items-center h-full'>
          {jobData.map(job => 
          {if(job.show.image?.original.length > 0 ) {
          return <div 
            className=' py-1 px-1 h-[45%] md:h-[100%] w-full rounded-2xl md:w-[70%] relative flex flex-row gap-8 md:gap-20  mb-0 md:mb-28' key={job.name+""+Math.random()}>
              <div  className='h-[100%] top-0 w-[full]'>
              <img src={job.show.image?.medium} className='h-[80%] md:h-[100%] ml-4 rounded-xl' alt="" />
              {job.show.genres.map(tag => (
                <p className='inline mx-2 text-xs ml-4 relative'># {tag}</p>
              ))}
              </div>
              <div className='mt-0 md:mt-5'>
              <p className='text-2xl md:3xl font-bold'>{job.show.name}</p>
              <p className='font-light text-sm mt-2'>{job.show.language}</p>
              <p className="text-gray-500 mt-2">{job.show.rating.average} <img src={star} width={17} className="inline mb-1" alt="" /></p>
              <p  className="text-gray-500 mt-2">{job.show.premiered}</p>
              <p className="text-gray-500 mt-2">{job.show.runtime} min</p>
              <p  className="text-gray-500">{job.show.mode}</p>
              <p className="text-gray-500">{job.show.duration}</p>
    
              <Link className='bg-gradient-to-r
              relative top-4 md:top-[30%] from-teal-400 to-sky-700 p-2 rounded-md' to="/individualCard" state={job}>View details</Link>
            
              </div>
              </div>}}
          )
          }
        </div>
        </div>
        }
    </div>
  )
}

export default Welcome
