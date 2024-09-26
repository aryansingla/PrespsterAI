"use client"
import { Alert, Box, Button, Typography } from '@mui/material'
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

    const [interviewData, setInterviewData] = useState({});
    const [webCamEnabled, setWebCamEnabled] = useState(false);
    const [loading, setLoading] = useState(false);

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

    return (
        <>
            <Grid container sx={{ backgroundColor: 'black' }}>
                <Typography color="#fff" variant="h6" sx={{ fontWeight: 'bold' }}>Let's Get Started</Typography>
            </Grid>
            <Grid container spacing={2} style={{ color: '#fff' }}>

                <Grid size={{ xs: 12, lg:6 }}>

                    <div style={{ padding: '25px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', margin: '20px 0' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', padding: '1.25rem', borderRadius: '0.5rem', border: '1px solid #000', gap:'20px'}}>
                                <Typography style={{ fontSize: '30px' }}><strong style={{ color: '#6a91e6' }}>Job Role/Job Position: </strong>{interviewData?.jobPosition}</Typography>
                                <Typography style={{ fontSize: '30px' }}><strong style={{ color: '#6a91e6' }}>Job Description/Tech Stack: </strong>{interviewData?.jobDescription}</Typography>
                                <Typography style={{ fontSize: '30px' }}><strong style={{ color: '#6a91e6' }}>Years of Experience: </strong>{interviewData?.jobExperience} years</Typography>
                            </div>
                            <div style={{ border: '1px solid #000', backgroundColor: '#252626', borderRadius: '0.5rem' }}>
                                <h2 style={{ display: 'flex', alignItems: 'center', color: '#2663eb' }}>
                                    <Image
                                        src="/alert3.gif"
                                        alt="Information..."
                                        width={100}
                                        height={100}
                                        style={{ marginRight: '10px' }}  // Adjust margin if needed
                                    /><strong>Information</strong></h2>
                                <Typography variant='body1'
                                    style={{ color: '#fff', padding: '0px 20px 20px 20px' }}
                                >
                                    Enable VideoCam and Microphone to start your AI Generated Mock Interview, It has 5 questions which you can answer and at last you will get the report on the basis of your answer.
                                </Typography>
                                <Typography variant='body1'
                                    style={{ color: '#fff', padding: '0px 20px 20px 20px' }}
                                >
                                    <span style={{color: '#2663eb'}}>NOTE:</span> We never record your video, you can disable it anytime you want.
                                </Typography>
                            </div>
                        </div>

                    </div>
                </Grid>
                <Grid size={{ xs: 12, lg: 6 }}>
                    <div style={{
                        boxShadow: '0 10px 30px rgba(255, 255, 255, 0.7)',
                        borderRadius: '20px',
                        border: 'none',
                        padding: '20px',
                        backgroundColor: '#000' // Optional: add a background color to contrast the white shadow
                    }}>
                        {webCamEnabled ? (
                            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <Webcam
                                onUserMedia={() => setWebCamEnabled(true)}
                                onUserMediaError={() => setWebCamEnabled(false)}
                                mirrored={true}
                                style={{
                                    height: '50vh',
                                    width: '80%',
                                    margin:'auto'
                                }}
                            />
                            </Box>
                        ) : (
                            <>
                                <VideocamOffIcon style={{
                                    height: '18rem', /* 72 * 4 = 288px */
                                    width: '100%',
                                    margin: '1.75rem 0', /* 7 * 4 = 28px */
                                    padding: '5rem', /* 20 * 4 = 80px */
                                    backgroundColor: '#yourSecondaryColor', /* Replace with your actual secondary color */
                                    borderRadius: '0.5rem', /* rounded-lg = 8px */
                                    border: '1px solid #yourBorderColor' /* Replace with your actual border color */
                                }} />
                                <Button onClick={() => setWebCamEnabled(true)}
                                    style={{ width: '100%', color: 'white', backgroundColor: '#2663eb' }}>Enable Web Cam and Microphone</Button>
                            </>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'end', marginTop: '20px' }}>
                            <Link href={`/dashboard/interview/${params.interviewId}/start`}>
                                <Button style={{ color: 'white', backgroundColor: '#2663eb' }}>Start Interview</Button>
                            </Link>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </>

    )
}

export default page