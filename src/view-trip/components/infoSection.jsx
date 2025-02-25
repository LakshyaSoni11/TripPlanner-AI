import React from 'react'
import { Button } from '../../components/ui/button';
import { CiShare2 } from "react-icons/ci";

function InfoSection({tripData}) {
  return (
    <div >
    <div className='mt-20 '>
        <img src="/hotelPage.jpeg" className='h-[330px] w-full  rounded-2xl' alt="trip photo" />
        <div className='flex justify-between items-center'>
        <div className='mt-10'>
            <h2 className='text-3xl font-bold mb-5 mt-5'>{tripData?.tripData?.location}</h2>
            <div className='flex gap-5'>
            <h2 className='bg-gray-300 p-2 rounded-full text-gray-600'>💰Budget: {tripData?.tripData?.budget}</h2>
            <h2 className='bg-gray-300 p-2 rounded-full text-gray-600'>🗓️ {tripData?.userSelection?.days} Days</h2>
            <h2 className='bg-gray-300 p-2 rounded-full text-gray-600'>🏖️Traveller: {tripData?.userSelection?.name}</h2>
            </div>
        </div>
        <Button><CiShare2 /></Button>
        </div>
    </div>
    </div>
  )
}

export default InfoSection;