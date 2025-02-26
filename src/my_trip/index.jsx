import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import {db} from '@/service/firebaseConfig'
import UserComponentCard from './components/userComponentCard';
import { FaTripadvisor } from "react-icons/fa";
const MY_Trip = () => {
  const navigate = useNavigate();
  useEffect(() => {
    Get_User();
  }, []); 
const [userTrips , setUserTrips]= useState([]);
  const Get_User = async() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/');
    }
    const q= query(collection(db,'AiTrips'), where('userEmail','==',user?.email));
    const querySnapshot =await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc)=>{
      console.log(doc.id,"=>",doc.data());
      setUserTrips((prev)=> [...prev,doc.data()]);
    })
  };


  return <div className='sm:px-10 md:px-32 xl:px-10 '>
   
    <h2 className='font-bold text-5xl mb-10 flex items-center gap-2 '>My Trips  <FaTripadvisor /></h2>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 '>
      {userTrips?.length>0? userTrips.map((trip,index)=>{
        console.log('data',trip);
        return <UserComponentCard key={index} trip ={trip} />
      })
      : [1,2,3,4,5,6].map((items,idx)=>(
        <div key={idx} className='h-[280px] w-full animate-pulse bg-slate-300 opacity-0 transition-opacity ease-in-out duration-700 rounded-2xl  '>
        </div>
      ))
      }
      
      </div>
    </div>
}

export default MY_Trip