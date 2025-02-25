import React from 'react'
import { Link } from 'react-router-dom'
function HotelCard({ item }) {
    return (
        <Link to={`https://www.google.com/maps/search/?api=1&query=${item.hotelName},${item.hotelAddress}`} target='_blank'>
            <div className='cursor-pointer hover:scale-110 transition-all'>
                <img src="/hotelCard.jpg" key={item} className='rounded-lg' alt="image" />
                <div className='my-2 flex flex-col'>
                    <h2 className='font-semibold mt-3 text-xl'>{item.hotelName}</h2>
                    <h2 className='  text-s text-gray-500'>📍{item.hotelAddress}</h2>
                    <h2 className='  text-s text-gray-700'>Price: {item.price} rs/night</h2>
                    <h2 className='  text-s text-gray-700'>⭐ {item.rating} Stars</h2>

                </div>
            </div>
        </Link>
    )
}

export default HotelCard