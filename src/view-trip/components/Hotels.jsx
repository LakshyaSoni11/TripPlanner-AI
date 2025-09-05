import React from 'react'
import { Link } from 'react-router-dom'
import HotelCard from './HotelCard'

function Hotels({tripData}) {
  return (
    <div >
         <h2 className='mt-10 text-4xl font-semibold'>Hotel recommendations for your selected place.</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-10'>
            {tripData?.tripData?.hotelOptions?.map((item,index)=>(
               <HotelCard item ={item}/>

            ))}
        </div>
    </div>
  )
}

export default Hotels