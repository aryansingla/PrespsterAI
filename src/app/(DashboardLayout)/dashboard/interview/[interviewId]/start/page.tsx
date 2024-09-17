"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Grid from '@mui/material/Grid2';
import RecordAnswerSection from './_components/RecordAnswerSection';
import QuestionSection from './_components/QuestionSection';
import { Button } from '@mui/material';
import Link from 'next/link';


const page = ({ params }) => {
    const [interviewData, setInterviewData] = useState({});
    const [loading, setLoading] = useState(false);
    const[mockInterviewQuestion,setMockInterviewQuestion] = useState([]);
    const[activeQuestionIndex,setActiveQuestionIcdex] = useState(0);

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
                const jsonMockResp = JSON.parse(data?.data?.jsonMockResponse);
                console.log('jsonMockResp',jsonMockResp);
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
    }


  return (
    <>
    <Grid container spacing={2} sx={{backgroundColor:'black'}}>
        <Grid size={{xs:12 , sm:6}}>
            <QuestionSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            setActiveQuestionIcdex={setActiveQuestionIcdex}/>
        </Grid>
        <Grid size={{xs:12 , sm:6}}>
            <RecordAnswerSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}/>
        </Grid>
        <Grid size={{xs:12}} sx={{display:'flex', justifyContent:'flex-end' , marginTop:'-20px' , gap:"10px"}}>
                {activeQuestionIndex > 0 && <Button sx={{backgroundColor:'#2663eb', color:'#fff'}} onClick={()=> setActiveQuestionIcdex(activeQuestionIndex-1)}>Previous Question</Button>}
                {activeQuestionIndex != mockInterviewQuestion?.length - 1 && <Button sx={{backgroundColor:'#2663eb', color:'#fff'}} onClick={()=> setActiveQuestionIcdex(activeQuestionIndex+  1)}>Next Question</Button>}
                {activeQuestionIndex == mockInterviewQuestion?.length - 1 && 
                <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
                <Button sx={{backgroundColor:'#2663eb', color:'#fff'}}>End Interview</Button>
                </Link>
                }
        </Grid>
    </Grid>
    </>
  )
}

export default page