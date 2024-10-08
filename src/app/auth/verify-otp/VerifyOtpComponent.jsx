"use client";
import React from 'react'
import { Box, Card, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
// import AuthTwoSteps from "../authForms/AuthTwoSteps";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthVerifyOtp from '../../../components/Auth/AuthForms/AuthVerifyOtp';

const VerifyOtpComponent = () => {
    const router = useRouter();

    useEffect(() => {
      const checkPageReload = () => {
        const entries = performance.getEntriesByType('navigation');
        if (entries.length > 0 && entries[0].type === 'reload') {
          router.replace("/auth/forgot-password");
          localStorage.removeItem("email");
        }
      };
  
      checkPageReload();
    }, [router]);
  
    // Check if window is defined before using localStorage
    const[userEmail,setUserEmail] = useState('');
    useEffect(()=>{
      setUserEmail(localStorage.getItem("email"));
    },[])
  return (
    <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            backgroundColor: "#000",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid
            size={{xs:11,sm:11,lg:4,xl:4}}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 3, zIndex: 1, width: "100%", maxWidth: "100%" ,height: "400px"}}
            >
              <AuthVerifyOtp />
            </Card>
          </Grid>
        </Grid>
      </Box>
  )
}

export default VerifyOtpComponent