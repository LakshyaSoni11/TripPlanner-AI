import React from 'react'
import { Link } from 'react-router-dom';
const UserComponentCard = ({ trip }) => {
  // console.log('hey this is called');
  console.log('data', trip);

  return (
 
      
         <div className='border-2 rounded-3xl shadow-2xl  flex flex-col p-2 justify-center  items-center hover:scale-104   transition-all' >
      <Link to={'/view-trip/' + trip?.id}>
        <img src="/tripImg.png" alt="trips" className='rounded-2xl h-60 ' />
      </Link>
      <h2 className='text-2xl font-semibold mt-3'><span className='font-bold text-xl mx-5'>Locaiton :  </span>{trip?.tripData?.location}</h2>
    </div>
  )
}

export default UserComponentCard