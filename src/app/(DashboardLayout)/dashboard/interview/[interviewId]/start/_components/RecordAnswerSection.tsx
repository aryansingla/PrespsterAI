"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { chatSession } from '@/utils/GeminiAIModel'

import moment from 'moment'
import { Box, Button, Typography } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

const RecordAnswerSection = ({ mockInterviewQuestion, activeQuestionIndex, interviewData }) => {
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });
    const session1 = useSession();
    const userDetails = session1?.data?.user;
    const [userAnswer, setUserAnswer] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        console.log("resultsssssssssssss:", results);
        results.map((result) => {
            console.log('setttingggggggg')
            setUserAnswer(prevAns => prevAns + result?.transcript)
        })
        console.log("userAnswerrrrrrrrrrrrrrrrrr:", userAnswer);
    }, [results])

    // useEffect(()=>{
    //     console.log("Results:", results);
    //     },[])

 // Check for errors
//   if (error) {
//     console.error("Speech recognition error:", error);
//   }

//   console.log("Results:", results);
  console.log("Interim result:", interimResult);
    const StartStopRecording = async () => {
        if (isRecording) {
            stopSpeechToText();
        } else {
            startSpeechToText();
        }
    }

    const updateUserAnswerInDb = async () => {
        console.log('userAnswer', userAnswer);
        setLoading(true);

        // Prepare the feedback prompt for Gemini AI
        const feedbackPrompt = `Question: ${activeQuestionIndex} ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}, depending on the question and user answer for the given interview question, please give us a rating for the answer and feedback as an area of improvement, if any, in 3-5 lines. Provide it in JSON format with 'rating' and 'feedback' fields.`;

        try {
            // Sending feedback prompt to Gemini AI and getting the result
            const result = await chatSession.sendMessage(feedbackPrompt);
            const mockJsonResp = (result.response.text())
                .replace(/```json/g, '')
                .replace(/```/g, '')
                .replace(/[\n\r\t]/g, '');

            console.log('feedback response', mockJsonResp);

            const JSONFeedbackResponse = JSON.parse(mockJsonResp);

            // Axios request options for submitting the user answer
            const requestOptions = {
                method: "POST",
                url: `http://localhost:5000/api/submit-answer`,
                data: {
                    mockId: interviewData?.mockId,
                    question: mockInterviewQuestion[activeQuestionIndex]?.question,
                    correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
                    userAns: userAnswer,
                    feedback: JSONFeedbackResponse?.feedback,
                    rating: JSONFeedbackResponse?.rating,
                    userEmail: userDetails?.email || 'unknown',
                    createdAt: moment().format('DD-MM-YYYY'),
                },
            };

            // Send the answer and feedback to the backend
            axios(requestOptions)
                .then((response) => {
                    setLoading(false);
                    console.log('Answer recorded successfully:', response.data);
                    toast.success(`User answer recorded successfully.`, {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setUserAnswer('');
                    setResults([]);
                })
                .catch((error) => {
                    setLoading(false);
                    console.error('Error saving user answer:', error);
                    toast.error(`Failed to save user answer. Please try again.`, {
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
            console.error('Error generating feedback:', error);
            setLoading(false);
            toast.error('Failed to generate feedback. Please try again.');
        }
    };


    useEffect(() => {
        console.log("userAnswerrrrrrrrrrrrrrrrrr22222222222222222222:", userAnswer);

        if (!isRecording && userAnswer.length > 0) {
            updateUserAnswerInDb();
        }
    }, [userAnswer,isRecording]);

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" style={{backgroundColor:'black'}}>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                // bgcolor="black"
                borderRadius="8px"
                p={5}
                mt={10}
            >
                <Image src={'/mywebcam.png'} width={400} height={400} style={{ position: 'absolute' }} alt="webcam" />
                <Webcam
                    mirrored={true}
                    style={{ 
                        height: 500, 
                        width: '100%', 
                        zIndex: 10,  // Ensure the webcam is on top
                        backgroundColor: 'transparent'  // Set the webcam background to transparent
                    }}
                />
            </Box>
            <Button
                disabled={loading}
                variant="outlined"
                sx={{ my: 4 }}
                onClick={StartStopRecording}
            >
                {isRecording ? (
                    <Typography sx={{ color: 'red', display: 'flex', gap: 2 }}>
                        <MicIcon /> Stop Recording...
                    </Typography>
                ) :
                    <Typography sx={{ color: '#fff', display: 'flex', gap: 2 }}>
                        Record Answer
                    </Typography>}
            </Button>
        </Box>
    )
}

export default RecordAnswerSection