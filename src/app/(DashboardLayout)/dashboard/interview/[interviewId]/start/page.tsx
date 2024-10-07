"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Grid from '@mui/material/Grid2';
import RecordAnswerSection from './_components/RecordAnswerSection';
import QuestionSection from './_components/QuestionSection';
import { Button, useMediaQuery } from '@mui/material';
import Link from 'next/link';


const Page = ({ params }) => {
    const [interviewData, setInterviewData] = useState({});
    const [loading, setLoading] = useState(false);
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const isSmallScreen = useMediaQuery('(max-width:1130px)');
    const isMoreSmallScreen = useMediaQuery('(max-width:900px)');
    const isMobileSmallScreen = useMediaQuery('(max-width:600px)');


    

    useEffect(() => {
        console.log(params);
        GetInterviewDetails();
    }, []);

    const GetInterviewDetails = async () => {
        const requestOptions = {
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-interview-details`,
            data: {
                mockId: params.interviewId,
            },
        };
        axios(requestOptions)
            .then((data) => {
                setLoading(false);
                setInterviewData(data?.data);
                console.log('data', data);
                const jsonMockResp = JSON.parse(data?.data?.jsonMockResponse);
                console.log('jsonMockResp', jsonMockResp);
                setMockInterviewQuestion(jsonMockResp);
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
    };

    return (
        <>
            <Grid container spacing={2} sx={{ backgroundColor: 'black' }}>
                {isMoreSmallScreen ? (
                    <>
                     <Grid size={{xs:12}}>
                            <RecordAnswerSection
                                mockInterviewQuestion={mockInterviewQuestion}
                                activeQuestionIndex={activeQuestionIndex}
                                interviewData={interviewData}
                            />
                        </Grid>
                    <Grid size={{xs:12}}>
                            <QuestionSection
                                mockInterviewQuestion={mockInterviewQuestion}
                                activeQuestionIndex={activeQuestionIndex}
                                setActiveQuestionIndex={setActiveQuestionIndex}
                            />
                        </Grid>
                        {/* On small screens, RecordAnswerSection and button section are above the QuestionSection */}
                       
                        <Grid size={{xs:12}} sx={{ display: 'flex',flexDirection: isMobileSmallScreen ? 'column' : 'row', justifyContent: 'flex-end', marginTop: '-20px', gap: "10px", marginBottom:'20px' }}>
                            {activeQuestionIndex > 0 && (
                                <Button sx={{ backgroundColor: '#2663eb', color: '#fff',marginTop:'10px' }} onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>
                                    Previous Question
                                </Button>
                            )}
                            {activeQuestionIndex !== mockInterviewQuestion?.length - 1 && (
                                <Button sx={{ backgroundColor: '#2663eb', color: '#fff' }} onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
                                    Next Question
                                </Button>
                            )}
                            {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
                                <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
                                    <Button sx={{ backgroundColor: '#2663eb', color: '#fff' }}>End Interview</Button>
                                </Link>
                            )}
                        </Grid>
                        
                    </>
                ) :
                isSmallScreen ? (
                    <>
                    <Grid size={{xs:12}}>
                            <RecordAnswerSection
                                mockInterviewQuestion={mockInterviewQuestion}
                                activeQuestionIndex={activeQuestionIndex}
                                interviewData={interviewData}
                            />
                        </Grid>
                    <Grid size={{xs:12}}>
                            <QuestionSection
                                mockInterviewQuestion={mockInterviewQuestion}
                                activeQuestionIndex={activeQuestionIndex}
                                setActiveQuestionIndex={setActiveQuestionIndex}
                            />
                        </Grid>
                        {/* On small screens, RecordAnswerSection and button section are above the QuestionSection */}
                        
                        <Grid size={{xs:12}} sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-20px', gap: "10px",marginBottom:'20px'  }}>
                            {activeQuestionIndex > 0 && (
                                <Button sx={{ backgroundColor: '#2663eb', color: '#fff' }} onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>
                                    Previous Question
                                </Button>
                            )}
                            {activeQuestionIndex !== mockInterviewQuestion?.length - 1 && (
                                <Button sx={{ backgroundColor: '#2663eb', color: '#fff' }} onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
                                    Next Question
                                </Button>
                            )}
                            {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
                                <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
                                    <Button sx={{ backgroundColor: '#2663eb', color: '#fff' }}>End Interview</Button>
                                </Link>
                            )}
                        </Grid>
                        
                    </>
                )
                :
                (
                    <>
                        {/* On larger screens, QuestionSection is on the left and RecordAnswerSection is on the right */}
                        <Grid size={{xs:12, sm:6}}>
                            <QuestionSection
                                mockInterviewQuestion={mockInterviewQuestion}
                                activeQuestionIndex={activeQuestionIndex}
                                setActiveQuestionIndex={setActiveQuestionIndex}
                            />
                        </Grid>
                        <Grid size={{xs:12, sm:6}}>
                            <RecordAnswerSection
                                mockInterviewQuestion={mockInterviewQuestion}
                                activeQuestionIndex={activeQuestionIndex}
                                interviewData={interviewData}
                            />
                        </Grid>
                        <Grid size={{xs:12}} sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-20px', gap: "10px" ,marginBottom:'20px' }}>
                            {activeQuestionIndex > 0 && (
                                <Button sx={{ backgroundColor: '#2663eb', color: '#fff' }} onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>
                                    Previous Question
                                </Button>
                            )}
                            {activeQuestionIndex !== mockInterviewQuestion?.length - 1 && (
                                <Button sx={{ backgroundColor: '#2663eb', color: '#fff' }} onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
                                    Next Question
                                </Button>
                            )}
                            {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
                                <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
                                    <Button sx={{ backgroundColor: '#2663eb', color: '#fff' }}>End Interview</Button>
                                </Link>
                            )}
                        </Grid>
                    </>
                )}
            </Grid>
        </>
    );
};

export default Page;
