"use client"
import { Button, CircularProgress, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { signOut, useSession } from "next-auth/react";
import DashboardUpperPage from './DashboardUpperPage';
import DashboardLowerPortion from './DashboardLowerPortion';


const Dashboard = () => {
  const session1 = useSession();
  const userDetails = session1?.data?.user;
  const [loading, setLoading] = useState(false);
  const BackendLogout = async () => {
    setLoading(true)
    const requestOptions = {
      method: "POST",
      url: `http://localhost:3000/api/auth/logout/`,
      data: {},
    };
    axios(requestOptions)
      .then(async () => {
        await signOut()
          .then(() => {
            setLoading(false)
            window.location.replace('http://localhost:3000/auth/login');
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
            window.location.replace('http://localhost:3000/auth/login');
          })
      })
      .catch(async (error) => {
        // ErrorHandler(error, error.response.data.message, 'single', 'error')
        await signOut()
          .then(() => {
            setLoading(false)
            window.location.replace('http://localhost:3000/auth/login');
          })
          .catch(() => {
            setLoading(false)
            window.location.replace('http://localhost:3000/auth/login');
          })
      });
  };

  return (<>
    <div>
      <DashboardUpperPage/>
    </div>
    <div>
      <DashboardLowerPortion/>
    </div>
  </>
  )
}

export default Dashboard