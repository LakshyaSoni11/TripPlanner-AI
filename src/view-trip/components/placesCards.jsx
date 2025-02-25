import React from 'react'
import { Button } from '../../components/ui/button';
import { TbMapShare } from "react-icons/tb";
import { Link } from 'react-router-dom';
function PlaceCards({places}) {
  return (
    <div className='flex gap-8 items-center border-2 rounded-3xl p-2 hover:scale-105 transition-all shadow-xl'>
        <img src="/tripImg.png" className='h-60 rounded-3xl' alt="tripPhoto"/>
        <div className=''>
            <h2 className='font-semibold text-2xl'>Place Name: <span className='text-fuchsia-600'>{places.placeName}</span></h2>
            <p className='font-semibold text-lg  '><span className='text-lg text-gray-700'>{places.placeDetails}</span></p>
            <h2 className='font-semibold  text-lg'>Pricing: {places.ticketPricing}</h2>
            <h2 className='text-gray-600  text-lg'>{places.timeTravel}</h2>
            <h2 className='font-semibold text-lg '>Rating: <span className='font-bold'>{places.rating}</span></h2>
            <Link to={`https://www.google.com/maps/search/?api=1&query=${places.placeName}`} target='_blank'><Button className='mt-3'><TbMapShare /></Button></Link>
        </div>
    </div>
  )
}

export default PlaceCards;