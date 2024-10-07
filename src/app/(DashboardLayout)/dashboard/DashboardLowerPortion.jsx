"use client"
import { Box, Card, CardContent, CardHeader, Paper, Skeleton, Typography, useMediaQuery } from '@mui/material'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2';
import InterviewItemCard from './InterviewItemCard';
import axios from 'axios';
import { toast } from 'react-toastify';
import Image from 'next/image';

const DashboardLowerPortion = () => {
    const isMobileScreen = useMediaQuery('(max-width:600px)');
    const isTabScreen = useMediaQuery('(max-width:900px)');

    const session1 = useSession();
    const userDetails = session1?.data?.user;

    const [interviewList, setInterviewList] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     if (userDetails) {
    //         GetInterviewList();
    //     }
    // }, [userDetails]);

    useEffect(() => {
        const timer = setTimeout(() => {
            GetInterviewList();
        }, 2000); // Add a 2000ms (2 seconds) delay

        return () => clearTimeout(timer);
    }, []);


    useEffect(() => {
        console.log('interviewpast listttt', interviewList);
    }, [interviewList]);

    const GetInterviewList = async () => {
        setLoading(true);
        try {
            const requestOptions = {
                method: 'GET',
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-interviews/${userDetails?.email}`,
            };
            axios(requestOptions)
                .then((data) => {
                    setLoading(false);
                    console.log('data of listtttttttttttt', data?.data);
                    setInterviewList(data?.data)
                })
                .catch((error) => {
                    setLoading(false);
                    // toast.info(`${error?.response?.data?.message}`, {
                    //     position: "bottom-left",
                    //     autoClose: 5000,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     pauseOnHover: true,
                    //     draggable: true,
                    //     progress: undefined,
                    //     theme: "light",
                    // });
                });
        } catch (error) {
            console.error('Error fetching interview list:', error);
            setLoading(false);
        }
    };



    return (
        <div style={{ padding: isMobileScreen ? '0px' : '0px 50px', marginTop: '50px' }}>
            <>
                <div style={{ marginTop: '30px' }}>
                    <Typography variant={isMobileScreen ? "h5" : "h4"} sx={{ color: '#6a91e6', fontWeight: 600 }}>
                        Past Mock Interviews
                    </Typography>
                </div>

                {
                    loading ?
                        (
                            <Grid container spacing={3} sx={{ padding: '0px 10px 10px 10px' }}>
                                {/* Conditional rendering based on screen size */}
                                {isMobileScreen ? (
                                    <Grid size={12} >
                                        <Skeleton animation="wave" sx={{ backgroundColor: '#3d3e40' }} height={350} width="100%" />
                                    </Grid>
                                ) : (
                                    // Desktop and tablet view: show three skeletons
                                    <>
                                        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                                            <Paper sx={{ padding: '5px', backgroundColor: '#18181B' }}>
                                                <Skeleton animation="wave" height={150} width="100%" variant="rectangular" sx={{ backgroundColor: '#27272a' }} />
                                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                                                    <Skeleton animation="wave" sx={{ backgroundColor: '#27272a' }} height={50} width="40%" />
                                                    <Skeleton animation="wave" sx={{ backgroundColor: '#27272a' }} height={50} width="40%" />
                                                </Box>

                                            </Paper>
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 6, lg: 4 }}>

                                            <Paper sx={{ padding: '5px', backgroundColor: '#18181B' }}>
                                                <Skeleton animation="wave" height={150} width="100%" variant="rectangular" sx={{ backgroundColor: '#27272a' }} />
                                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                                                    <Skeleton animation="wave" sx={{ backgroundColor: '#27272a' }} height={50} width="40%" />
                                                    <Skeleton animation="wave" sx={{ backgroundColor: '#27272a' }} height={50} width="40%" />
                                                </Box>

                                            </Paper>
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                                            <Paper sx={{ padding: '5px', backgroundColor: '#18181B' }}>
                                                <Skeleton animation="wave" height={150} width="100%" variant="rectangular" sx={{ backgroundColor: '#27272a' }} />
                                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                                                    <Skeleton animation="wave" sx={{ backgroundColor: '#27272a' }} height={50} width="40%" />
                                                    <Skeleton animation="wave" sx={{ backgroundColor: '#27272a' }} height={50} width="40%" />
                                                </Box>

                                            </Paper>                                        </Grid>
                                        <Grid size={{ xs: 12, md: 6, lg: 4 }} >
                                            <Paper sx={{ padding: '5px', backgroundColor: '#18181B' }}>
                                                <Skeleton animation="wave" height={150} width="100%" variant="rectangular" sx={{ backgroundColor: '#27272a' }} />
                                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                                                    <Skeleton animation="wave" sx={{ backgroundColor: '#27272a' }} height={50} width="40%" />
                                                    <Skeleton animation="wave" sx={{ backgroundColor: '#27272a' }} height={50} width="40%" />
                                                </Box>

                                            </Paper>                                        </Grid>
                                        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                                            <Paper sx={{ padding: '5px', backgroundColor: '#18181B' }}>
                                                <Skeleton animation="wave" height={150} width="100%" variant="rectangular" sx={{ backgroundColor: '#27272a' }} />
                                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                                                    <Skeleton animation="wave" sx={{ backgroundColor: '#27272a' }} height={50} width="40%" />
                                                    <Skeleton animation="wave" sx={{ backgroundColor: '#27272a' }} height={50} width="40%" />
                                                </Box>

                                            </Paper>                                        </Grid>
                                        <Grid size={{ xs: 12, md: 6, lg: 4 }} >
                                            <Paper sx={{ padding: '5px', backgroundColor: '#18181B' }}>
                                                <Skeleton animation="wave" height={150} width="100%" variant="rectangular" sx={{ backgroundColor: '#27272a' }} />
                                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                                                    <Skeleton animation="wave" sx={{ backgroundColor: '#27272a' }} height={50} width="40%" />
                                                    <Skeleton animation="wave" sx={{ backgroundColor: '#27272a' }} height={50} width="40%" />
                                                </Box>

                                            </Paper>                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        )
                        :
                        (
                            <>

                                <Grid container spacing={3} my={1}>
                                    {interviewList.length > 0 ? interviewList.map((interview, index) => (
                                        <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
                                            <InterviewItemCard interview={interview} />
                                        </Grid>
                                    ))
                                        :
                                        <Box
                                            sx={{
                                                background: 'linear-gradient(to bottom right, #ded9d8, #193067)',
                                                width: isMobileScreen ? '90%' : '80%', // Reduce width for mobile screens
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginTop: isMobileScreen ? '5px' : '45px',
                                                mx: 'auto', // Center horizontally
                                                padding: isMobileScreen ? '20px' : '40px', // Add padding for smaller screens
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <Typography
                                                    // variant={isTabScreen ? "h6" : "h4"}
                                                    sx={{
                                                        color: '#060f25',
                                                        fontWeight: '600',
                                                        marginBottom: '20px',
                                                        marginTop: '40px',
                                                        fontSize: isMobileScreen ? '18px' : isTabScreen ? '18px' : '30px', // Adjust font size for mobile screens
                                                    }}
                                                >
                                                    Oops! No past interviews yet. Start one now!
                                                </Typography>
                                                <Image
                                                    src={'/no-data-found.png'}
                                                    width={isMobileScreen ? 300 : 500} // Adjust image width for mobile screens
                                                    height={isMobileScreen ? 250 : 400} // Adjust image height for mobile screens
                                                    alt="no-data-found"
                                                    style={{ maxWidth: '100%', height: 'auto' }} // Ensure image scales properly
                                                />
                                            </Box>
                                        </Box>


                                    }



                                </Grid>
                            </>
                        )
                }

            </>


        </div>
    )
}

export default DashboardLowerPortion