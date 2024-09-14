"use client"
import { Button } from '@mui/material'
// import { MockInterview } from '@/utils/schema'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import axios from 'axios'
import { toast } from 'react-toastify'

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
                console.log('dataaaaaaa',data);
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
        <div style={{ color:'#fff',margin: '2.5rem 0', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Let's Get Started</h2>
        <div style={{ display: 'flex', padding: '1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '1.25rem 0', gap: '1.25rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', padding: '1.25rem', borderRadius: '0.5rem', border: '1px solid #000', gap: '1.25rem' }}>
                    <h2 style={{ fontSize: '1.25rem' }}><strong>Job Role/Job Position: </strong>{interviewData?.jobPosition}</h2>
                    <h2 style={{ fontSize: '1.25rem' }}><strong>Job Description/Tech Stack: </strong>{interviewData?.jobDescription}</h2>
                    <h2 style={{ fontSize: '1.25rem' }}><strong>Years of Experience: </strong>{interviewData?.jobExperience} years</h2>
                </div>
                <div style={{ padding: '1.25rem', border: '1px solid #fbbf24', backgroundColor: '#fef3c7', borderRadius: '0.5rem' }}>
                    <h2 style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#ca8a04' }}><LightbulbIcon /><strong>Information</strong></h2>
                    <h2 style={{ marginTop: '0.75rem', color: '#854d0e' }}>Enable VideoCam and Microphone to start your AI Generated Mock Interview, It has 5 questions which you can answer and at last you will get the report on the basis of your answer. NOTE we never record your video, you can disable it anytime you want.</h2>
                </div>
            </div>
            <div>
                {webCamEnabled ? (
                    <Webcam 
                        onUserMedia={() => setWebCamEnabled(true)}
                        onUserMediaError={() => setWebCamEnabled(false)}
                        mirrored={true}
                        style={{
                            height: '300px',
                            width: '300px'
                        }} 
                    />
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
                        <Button onClick={() => setWebCamEnabled(true)} style={{ width: '100%' }}>Enable Web Cam and Microphone</Button>
                    </>
                )}
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'end', marginTop: '20px' }}>
                    <Link href={`/dashboard/interview/${params.interviewId}/start`}>
                        <Button>Start Interview</Button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
    
    )
}

export default page