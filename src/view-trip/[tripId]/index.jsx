import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {db} from '@/service/firebaseConfig';
import { toast } from 'sonner';
import InfoSection from '../components/infoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/placesToVisit';
function ViewTrip() {
    const {tripId} = useParams();
    const [tripData , setData] = useState({});
    useEffect(()=>{
        tripId&&GetTripData();
    },[tripId]);
    const GetTripData =async() =>{
        //fetch data from server
        const docRef = doc(db,'AiTrips',tripId);
        const docSnap = await getDoc(docRef);
        
        if(docSnap.exists()){
            console.log("Document",docSnap.data());
            setData(docSnap.data());
        }
        else{
            console.log("No such document!");
            toast("No trip found");
        }
    }
  return (
    <div className='p-10 md:px-20 lg-px-40 xl:px-50 bg-[url(/hotelBg.jpg)] bg-cover bg-bottom bg-fixed'>
    {/* information section here */}
    <InfoSection tripData={tripData}/>
    {/* hotels list  */}
    <Hotels tripData={tripData}/>

    {/* places to visit  */}
    <PlacesToVisit tripData={tripData}/>
    </div>

  );
}

export default ViewTrip;