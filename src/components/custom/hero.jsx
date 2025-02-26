import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
function Hero () {
  return ( 
    <div className='flex flex-col items-center px-10 pt-20   gap-9'>
        <h1
        className='font-extrabold text-[60px] text-center'
        ><span className='text-yellow-400'>Welcome to AI-Trip Planner – Your Smart Travel Companion! </span> 📍 Custom itineraries with top attractions, hotels, and travel tips  </h1>
        <p className='text-2xl  text-amber-950 text-center mt-[10px]'>Discover personalized travel plans tailored to your budget and preferences. Whether you're looking for a budget-friendly getaway or a luxurious vacation, our AI-driven trip planner curates the best itinerary just for you.</p>
        <Link to={'/Create-trip'}>
        <Button className='capitalize text-2xl p-7'>get started, its free</Button>
        </Link>
        <img src="/landing.png" className='h-150 w-200 rounded-4xl' alt="" />
    </div>
  )
}

export default Hero