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