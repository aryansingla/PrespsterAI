"use client"
import { Typography } from '@mui/material'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2';
import InterviewItemCard from './InterviewItemCard';
import axios from 'axios';
import { toast } from 'react-toastify';

const DashboardLowerPortion = () => {
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
    <div style={{ padding: '0px 50px' }}>
        <div style={{marginTop:'30px'}}>
        <Typography variant="h4" sx={{ color: '#6a91e6', fontWeight: 600 }}>
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
              <Typography color="#fff">No past mock interviews found.</Typography>
              }
            </Grid>
    </div>
  )
}

export default DashboardLowerPortion