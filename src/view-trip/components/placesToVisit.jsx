import React from 'react'
import PlaceCards from './placesCards';

function PlacesToVisit({ tripData }) {
    console.log("debugging data : ",tripData?.tripData);
  return (
    <div>
      <h2 className='font-bold text-5xl mt-12'>Places to Visit</h2>
      
      <div>
          
        {tripData?.tripData?.itinerary &&
          Object.entries(tripData.tripData.itinerary).map(([day, details]) => (
            
            <div key={day.toUpperCase()}>
                  <h2 className='font-bold text-2xl mt-5'>{day.toUpperCase()}</h2>
              <p className='text-2xl'><span className='font-bold text-2xl'>Best Time to Visit: </span>{details.bestTimeToVisit}</p>
              <p className='text-2xl'><span className='font-bold text-2xl'>Theme:</span> {details.theme}</p>
              <div>
                <h3 className='font-bold m-5 text-4xl'>Plan:</h3>
                <div className='grid grid-cols-2 md:grid-cols-1 gap-5'>
                {details.plan?.map((planItem, index) => (
                  <div key={planItem}>
                    <PlaceCards places={planItem}/>
                  </div>
                ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
