"use client"
import { Box, Typography, useMediaQuery } from '@mui/material'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2';
import InterviewItemCard from './InterviewItemCard';
import axios from 'axios';
import { toast } from 'react-toastify';
import Image from 'next/image';

const DashboardLowerPortion = () => {
  const isMobileScreen = useMediaQuery('(max-width:600px)');
  const session1 = useSession();
  const userDetails = session1?.data?.user;

  const [interviewList, setInterviewList] = useState([]);
  const[loading,setLoading] = useState(false);

  useEffect(() => {
      if (userDetails) {
          GetInterviewList();
      }
  }, [userDetails]);


  useEffect(() => {
   console.log('interviewpast listttt',interviewList);
}, [interviewList]);

  const GetInterviewList = async () => {
    try {
        const requestOptions = {
            method: 'GET',
            url: `http://localhost:5000/api/user-interviews/${userDetails?.email}`,
        };
        axios(requestOptions)
                .then((data) => {
                    setLoading(false);
                    console.log('data of listtttttttttttt',data?.data);
                    setInterviewList(data?.data)
                })
                .catch((error) => {
                    setLoading(false);
                    toast.info(`${error?.response?.data?.message}` ,{
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                });
    } catch (error) {
        console.error('Error fetching interview list:', error);
    }
};



  return (
    <div style={{ padding: isMobileScreen ? '0px' : '0px 50px' , marginTop:'50px'}}>
        <div style={{marginTop:'30px'}}>
        <Typography variant={isMobileScreen ? "h5" : "h4"} sx={{ color: '#6a91e6', fontWeight: 600 }}>
        Past Mock Interviews
            </Typography>
        </div>
        <Grid container spacing={3} my={3}>
                {interviewList.length > 0 ?  interviewList.map((interview, index) => (
                    <Grid size={{xs:12, sm:6, lg:4}} key={index}>
                        <InterviewItemCard interview={interview} />
                    </Grid>
                ))
              :
              <Box>
                <Image src={'/nodatafound.avif'} width={400} height={400} style={{ position: 'absolute' }} alt="no-data-found" />
              </Box>
              }

<Box
  sx={{
    background: 'linear-gradient(to bottom right, #ded9d8, #193067)',
    width: '80%',
    height: '400px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    
  }}
>
  <Image
    src={'/no-data-found.png'}
    width={500}
    height={400}
    alt="no-data-found"
  />
</Box>
            </Grid>
    </div>
  )
}

export default DashboardLowerPortion