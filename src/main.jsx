import React from 'react'; // Add this line
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "./index.css";
import App from './App.jsx';
import { RouterProvider , createBrowserRouter } from 'react-router-dom';
import CreateTrip from './create-trip/index.jsx';
import Header from './components/custom/header.jsx';
import { Toaster } from 'sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from './view-trip/[tripId]/index.jsx';
import MY_Trip from './my_trip/index.jsx';
const router = createBrowserRouter([
  {
    path:'/',
    element: <App />
  },
  {
    path:'/create-trip',
    element: <CreateTrip />
  },
  {
    path:'/view-trip/:tripId',
    element: <ViewTrip/>
  },
  {
    path:'my_trip',
    element:<MY_Trip/>
  }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <Header />
    <Toaster/>
    <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
