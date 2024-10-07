'use client'
import { Box, Typography } from '@mui/material'
import React from 'react'
import OuterNavbar from './OuterNavbar'
import { signOut, useSession } from "next-auth/react";
import Navbar from './Navbar';


const PricingComponent = () => {
    const { data: session, status } = useSession();
  return (
    <Box>
        {
            status === 'authenticated' 
            ?
            (
                <Box>
                    <Navbar/>
                </Box>
            )
            :
            (
                <Box><OuterNavbar /></Box>
            )
        }

        <Box>
            <Typography sx={{color:'#fff'}}>Pricing</Typography>
        </Box>
        
    </Box>
  )
}

export default PricingComponent