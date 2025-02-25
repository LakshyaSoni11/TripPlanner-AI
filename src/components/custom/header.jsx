import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription
} from "@/components/ui/dialog"; 
import { FaGoogle } from 'react-icons/fa'; 

function Header() {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const [openDialog, setOpenDialog] = useState(false); 

  useEffect(() => {
    if (user) {
      console.log("User data:", user);
    }
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log("Login Success:", codeResp);
      GetUserProfile(codeResp);
    },
    onError: (error) => console.error("Login Error:", error)
  });

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json'
      }
    }).then((resp) => {
      console.log("User Profile:", resp.data);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.href = '/';
    }).catch((error) => {
      console.error("Error fetching user profile:", error);
    });
  };
  return (
    <div className='flex justify-between fixed w-full   shadow-2xl px-5 py-4'>
      <img src="/logo.svg" alt="logo" />
      <div className='ml-2'>
        {user ? (
          <div className='flex items-center gap-2'>
            <a href="/my_trip">
            <Button variant={'outline'}>My Trips</Button>
            </a>
            <a href="/create-trip">
            <Button variant={'outline'}>+ Create Trip</Button>
            </a>

            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} alt="userPicture"  className='rounded-full h-10'/>
              </PopoverTrigger>
              <PopoverContent>
                <p className='cursor-pointer' onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.href = '/';
                }}>
                  Logout
                </p>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <>
            <Button onClick={() => setOpenDialog(true)}>Sign In</Button>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogDescription className="flex flex-col items-center gap-4">
                    <img src="/logo.svg" alt="logo" className="w-16 h-16" />
                    <h2 className='text-lg font-bold text-black'>Sign in with GOOGLE</h2>
                    <p>Sign in with your personal email securely</p>
                    <Button onClick={login} className='mt-4 w-full flex items-center justify-center gap-2'>
                      <FaGoogle className='h-5 w-5' />
                      Sign in with Google
                    </Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
