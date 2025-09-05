import { Input } from '../components/ui/input';
import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { SelectBudgetOptions, SelectTravelsList } from '../constants/options';
import { toast } from 'sonner';
import { AI_PROMPT } from '../constants/options';
import { chatSession } from '../service/AIMODAL';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FaGoogle } from "react-icons/fa";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';


function CreateTrip() {
    const [place, setPlace] = useState("");
    const [openDilauge, setOpenDilauge] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const handleInputChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const login = useGoogleLogin({
        onSuccess: (codeResp) => {
            console.log("Login Success:", codeResp);
            GetUserProfile(codeResp);
        },
        onError: (error) => console.error("Login Error:", error),
        redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI, 
    });


    const onGenerateTrip = async () => {
        const user = localStorage.getItem('user');
        if (!user) {
            setOpenDilauge(true);
            return;
        }
        if (formData?.days > 5 || !formData.budget || !formData.location || !formData.days) {
            toast("Please fill all the fields", { type: "error" });
            return;
        }
        setLoading(true);
        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location?.label)
            .replace('{totalDays}', formData?.days)
            .replace('{budget}', formData?.budget)
            .replace('{traveler}', formData?.name)
        console.log(FINAL_PROMPT);
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        console.log("--", result?.response?.text());
        setLoading(false);
        saveAiTrip(result?.response?.text());
    }

    const saveAiTrip = async (TripData) => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        // Add a new document in collection "cities"
        let tripDataParsed;
        try {
            tripDataParsed = JSON.parse(TripData);
        } catch (error) {
            console.error("Error parsing TripData:", error);
            toast("Invalid trip data format", { type: "error" });
            return;
        }
        const docId = Date.now().toString();
        await setDoc(doc(db, "AiTrips", docId), {
            userSelection: formData,
            tripData: tripDataParsed,
            userEmail: user?.email,
            id: docId
        });
        setLoading(false);
        navigate('/view-trip/' + docId);
    }
    const GetUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'application/json'
            }
        }).then((resp) => {
            console.log("User Profile:", resp.data);
            localStorage.setItem('user', JSON.stringify(resp.data));
            setOpenDilauge(false);
            onGenerateTrip();
        }).catch((error) => {
            console.error("Error fetching user profile:", error);
        });
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    return (
        <div className='sm:px-10 md:px-32 xl:px-10 px-5 pt-20' >
            <div className='text-center flex flex-col items-center justify-center gap-5 '>
                <h2 className='capitalize font-bold text-5xl'>Plan Your Dream Trip with Ease </h2>
                <p className='mt-5 text-gray-500 text-2xl '>Your perfect vacation, tailored to your budget and preferences. </p>
                <div className='border-3 p-10 rounded-3xl shadow-2xl shadow-amber-300 border-transparent '>
                    <img src="/travelIcon.png" className='w-250 ' alt="travel icon" />

                </div>
            </div>
            <div className='mt-10 flex flex-col gap-[54px]'>
                <div className=' p-3'>
                    <h2 className='font-bold my-5 text-3xl capitalize'>Where do you want to go?</h2>

                    <input
                        type="text"
                        className='p-2 w-full rounded-md border-2 '
                        placeholder='Enter the place you want to visit'
                        value={place}
                        onChange={(e) => {
                            setPlace(e.target.value);
                            handleInputChange('location', { label: e.target.value });
                        }}
                    />
                </div>

                <div>
                    <h2 className='mt-1 font-bold text-3xl mb-5 capitalize'>how many days your trip will last?</h2>
                    <Input
                        placeholder='Ex-3'
                        className='p-5'
                        type='number'
                        onChange={(e) => handleInputChange('days', e.target.value)}
                    />
                </div>
            </div>

            <div className='mt-10 font-bold text-3xl'>
                <h2 className='font-bold  my-5 capitalize'>select your budget plan?</h2>
                <div className='grid grid-cols-3 gap-10 mt-5 p-4'>
                    {SelectBudgetOptions.map((items, index) => (
                        <div key={index}
                            onClick={() => handleInputChange('budget', items.title)}
                            className={`border rounded-xl p-4 hover:shadow-lg
                            ${formData?.budget === items.title ? 'shadow-xl border-black' : ''}
                            `}>
                            <img src='/money.png' alt='money icon' className='h-20 ml-50'></img>
                            <h2 className='font-bold capitalize text-2xl flex items-center gap-2 mb-2'>{items.icon} {items.title} </h2>
                            <h2 className='text-lg text-gray-500'>{items.description}</h2>
                        </div>
                    ))}
                </div>
            </div>

            <div className='mt-10 font-bold text-3xl'>
                <h2 className='font-bold  my-5 capitalize'>Select your style of travel.</h2>
                <div className='grid grid-cols-3 gap-10 mt-5 p-4'>
                    {SelectTravelsList.map((items, index) => (
                        <div key={index} onClick={() => {
                            handleInputChange('people', items.people)
                            handleInputChange('name', items.name);
                        }}
                            className={`border rounded-xl p-4 hover:shadow-lg ${formData?.people === items.people ? 'shadow-xl border-black' : ''
                                }`}

                        >
                            <h2 className='text-2xl'>{items.icon}</h2>
                            <h2 className='font-bold capitalize text-2xl mb-2'>{items.name}</h2>
                            <h2 className='text-lg text-gray-500'>{items.description}</h2>
                            <h2 className='text-lg'>People: {items.people}</h2>
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex justify-center pb-10'>
                <Button
                    disabled={loading}
                    onClick={onGenerateTrip} className='text-3xl p-9 cursor-pointer'>
                    {loading ? <AiOutlineLoading3Quarters className='h-3 w-3 animate-spin' /> : "Generate Trip"}
                </Button>
            </div>
            <Dialog open={openDilauge}>
                <DialogContent>
                    <DialogHeader>
                        <DialogDescription>
                            <img src="/logo.svg" alt="" />
                            <h2 className='text-lg font-bold text-black'>Sign in with GOOGLE </h2>
                            <p>Sign in with your personal email id securily</p>
                            <Button
                                onClick={login} className='mt-7 w-full flex items-center '>
                                <FaGoogle className='h-7 w-7' />
                                Sign in with google
                            </Button>

                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default CreateTrip;
