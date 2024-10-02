"use client"
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, useMediaQuery } from '@mui/material'
// import { MockInterview } from '@/utils/schema'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import axios from 'axios'
import { toast } from 'react-toastify'
import Grid from '@mui/material/Grid2';
import Image from 'next/image'


const page = ({ params }) => {
    const isMediumScreen = useMediaQuery('(max-width:1450px)');
    const isTabScreen = useMediaQuery('(max-width:1200px)');
    const isSecondMediumScreen = useMediaQuery('(max-width:900px)');
    const isMobileScreen = useMediaQuery('(max-width:600px)');


    const [interviewData, setInterviewData] = useState({});
    const [webCamEnabled, setWebCamEnabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openInfoBox, setOpenInfoBox] = useState(false);


    useEffect(() => {
        console.log(params);
        GetInterviewDetails();
    }, [])


    const GetInterviewDetails = async () => {
        // const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));


        const requestOptions = {
            method: "POST",
            url: `http://localhost:5000/api/get-interview-details`,
            data: {
                mockId: params.interviewId,
            },
        };
        axios(requestOptions)
            .then((data) => {
                setLoading(false);
                setInterviewData(data?.data);
                console.log('dataaaaaaa', data);
                // toast.success(`${data?.data?.message}`, {
                //     position: "bottom-left",
                //     autoClose: 5000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     theme: "light",
                // });
            })
            .catch((error) => {
                setLoading(false);
                toast.error(`${error}`, {
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
    }

    const closeInfoBox = () => {
        setOpenInfoBox(false);
    }

    return (
        <>
            <Grid
                container
                sx={{
                    backgroundColor: 'black',
                    justifyContent: 'flex-start', // Centers horizontally on tablet screen, aligns left otherwise
                    alignItems: 'center',
                    marginBottom: '20px',
                    position: 'relative' // To position the image at the right end when on tablet screen
                }}
            >
                {/* Centered or left-aligned Typography */}
                <Typography
                    color="#fff"
                    variant={isSecondMediumScreen ? "h6" : "h4"}
                    sx={{
                        fontWeight: 'bold',
                        background: 'linear-gradient(to right, #8bb9e0, #4facfe)',
                        WebkitBackgroundClip: 'text', // Clip the background to text
                        WebkitTextFillColor: 'transparent', 
                    }}
                >
                    Let's Get Started
                </Typography>

                {/* Conditionally render the image on tab screens and position it at the right */}
                {isSecondMediumScreen && (
                    <Image
                        src="/information.png"
                        alt="Information..."
                        width={50}
                        height={50}
                        style={{
                            position: 'absolute',
                            right: 0,
                            marginRight: '10px',
                            cursor: 'pointer'
                        }}
                        onClick={() => setOpenInfoBox(true)}
                    />
                )}
            </Grid>

            <Grid container spacing={2} style={{ color: '#fff' }}>

                <Grid size={{ xs: 12, lg: 6 }}
                    sx={{
                        order: { xs: 2, lg: 1 }, // On small and extra small screens, this will be the second item. On medium and above, it will be the first.
                    }}
                >

                    <div style={{ padding: isSecondMediumScreen ? '2px' : '25px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', margin: '20px 0', backgroundColor: '#252626' }}>
                            <div style={{ display: !isSecondMediumScreen ? 'flex' : 'none', flexDirection: 'column', padding: '1.25rem', borderRadius: '0.5rem', border: '1px solid #000', gap: '20px', flex: '0.5' }}>
                                <Typography style={{ fontSize: isMediumScreen ? '23px' : '30px' }}><strong style={{ color: '#6a91e6' }}>Job Role/Job Position: </strong>{interviewData?.jobPosition}</Typography>
                                <Typography style={{ fontSize: isMediumScreen ? '23px' : '30px' }}><strong style={{ color: '#6a91e6' }}>Job Description/Tech Stack: </strong>{interviewData?.jobDescription}</Typography>
                                <Typography style={{ fontSize: isMediumScreen ? '23px' : '30px' }}><strong style={{ color: '#6a91e6' }}>Years of Experience: </strong>{interviewData?.jobExperience} years</Typography>
                            </div>
                            <div
                                style={{
                                    display: isMobileScreen ? 'flex' : 'none',
                                    flexDirection: 'column',
                                    padding: '15px',
                                    borderRadius: '0.5rem', border: '1px solid #000',
                                    gap: '20px', flex: isSecondMediumScreen ? '1' : '0.5',
                                    backgroundColor: '#252626',
                                    width: '100%'
                                }}
                            >
                                <div>
                                    <Typography style={{ fontSize: isMobileScreen ? '18px' : '23px' }}><strong style={{ color: '#6a91e6' }}>Job Role/Job Position </strong></Typography>
                                    <Typography style={{ fontSize: isMobileScreen ? '18px' : '23px' }}>{interviewData?.jobPosition}</Typography>
                                </div>

                                <div>
                                    <Typography style={{ fontSize: isMobileScreen ? '18px' : '23px' }}><strong style={{ color: '#6a91e6' }}>Job Description/Tech Stack </strong></Typography>
                                    <Typography style={{ fontSize: isMobileScreen ? '18px' : '23px' }}>{interviewData?.jobDescription}</Typography>
                                </div>

                                <div>
                                    <Typography style={{ fontSize: isMobileScreen ? '18px' : '23px' }}><strong style={{ color: '#6a91e6' }}>Years of Experience </strong></Typography>
                                    <Typography style={{ fontSize: isMobileScreen ? '18px' : '23px' }}>{interviewData?.jobExperience} years</Typography>
                                </div>
                            </div>
                            <div style={{ display: isSecondMediumScreen && !isMobileScreen ? 'flex' : 'none', flexDirection: 'column', padding: '1.25rem', borderRadius: '0.5rem', border: '1px solid #000', gap: '20px', flex: '0.5', backgroundColor: '#252626', }}>
                                <Typography style={{ fontSize: isMediumScreen ? '23px' : '30px' }}><strong style={{ color: '#6a91e6' }}>Job Role/Job Position: </strong>{interviewData?.jobPosition}</Typography>
                                <Typography style={{ fontSize: isMediumScreen ? '23px' : '30px' }}><strong style={{ color: '#6a91e6' }}>Job Description/Tech Stack: </strong>{interviewData?.jobDescription}</Typography>
                                <Typography style={{ fontSize: isMediumScreen ? '23px' : '30px' }}><strong style={{ color: '#6a91e6' }}>Years of Experience: </strong>{interviewData?.jobExperience} years</Typography>
                            </div>
                            <div style={{ border: '1px solid #000', backgroundColor: '#252626', borderRadius: '0.5rem', flex: '0.5', display: isSecondMediumScreen ? "none" : "block" }}>

                                <h2 style={{ display: 'flex', alignItems: 'center', color: '#2663eb' }}>
                                    <Image
                                        src="/information.png"
                                        alt="Information..."
                                        width={50}
                                        height={50}
                                        style={{ margin: '0px 10px' }}  // Adjust margin if needed
                                    /><strong>Information</strong></h2>

                                <Typography variant='body1'
                                    style={{ color: '#fff', padding: '0px 20px 20px 20px' }}
                                >
                                    Enable VideoCam and Microphone to start your AI Generated Mock Interview, It has 5 questions which you can answer and at last you will get the report on the basis of your answer.
                                </Typography>
                                <Typography variant='body1'
                                    style={{ color: '#fff', padding: '0px 20px 20px 20px' }}
                                >
                                    <span style={{ color: '#2663eb' }}>NOTE:</span> We never record your video, you can disable it anytime you want.
                                </Typography>

                            </div>
                        </div>

                    </div>
                </Grid>
                <Grid size={{ xs: 12, lg: 6 }}
                    sx={{
                        order: { xs: 1, lg: 2 }, // On small and extra small screens, this will be the first item. On medium and above, it will be the second.
                    }}
                >
                    <div style={{
                        boxShadow: '0 10px 30px rgba(255, 255, 255, 0.7)',
                        borderRadius: '20px',
                        border: 'none',
                        padding: '20px',
                        backgroundColor: '#000' // Optional: add a background color to contrast the white shadow
                    }}>
                        {webCamEnabled ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Webcam
                                    onUserMedia={() => setWebCamEnabled(true)}
                                    onUserMediaError={() => setWebCamEnabled(false)}
                                    mirrored={true}
                                    style={{
                                        height: '50vh',
                                        width: '80%',
                                        margin: 'auto'
                                    }}
                                />
                            </Box>
                        ) : (
                            <>
                                <VideocamOffIcon style={{
                                    height: '50vh', /* 72 * 4 = 288px */
                                    width: '100%',
                                    // margin: '1.75rem 0', /* 7 * 4 = 28px */
                                    padding: '5rem', 
                                    backgroundColor: '#yourSecondaryColor', /* Replace with your actual secondary color */
                                    borderRadius: '0.5rem', /* rounded-lg = 8px */
                                    border: '1px solid #yourBorderColor' /* Replace with your actual border color */
                                }} />
                              
                            </>
                        )}
                          <Button onClick={() => setWebCamEnabled(!webCamEnabled)}
                                    style={{ width: '100%', color: 'white', backgroundColor: '#2663eb' }}>{webCamEnabled ? 'Disable Web cam' : 'Enable Web Cam'}
                                </Button>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'end', marginTop: '20px' }}>
                            <Link href={`/dashboard/interview/${params.interviewId}/start`}>
                                <Button style={{ color: 'white', backgroundColor: '#2663eb' }}>Start Interview</Button>
                            </Link>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Dialog
                open={openInfoBox}
                onClose={closeInfoBox}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

            >
                <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: '#34373c' }}>
                    <Typography variant='body1'
                        style={{ color: '#fff', padding: '2px' }}
                    >
                        Enable VideoCam and Microphone to start your AI Generated Mock Interview, It has 5 questions which you can answer and at last you will get the report on the basis of your answer.
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: '#34373c' }}>
                    <DialogContentText id="alert-dialog-description">
                        <Typography variant='body1'
                            style={{ color: '#fff', padding: '2px' }}
                        >
                            We never record your video, you can disable it anytime you want.
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#34373c' }}>
                    <Button
                        onClick={closeInfoBox}
                        color="secondary"
                        variant="contained"
                        sx={{
                            textTransform: 'none',
                        }}
                    >
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    )
}

export default page