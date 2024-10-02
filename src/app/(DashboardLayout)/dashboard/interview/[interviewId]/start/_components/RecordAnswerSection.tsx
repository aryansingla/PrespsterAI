"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { chatSession } from '@/utils/GeminiAIModel'

import moment from 'moment'
import { Box, Button, CircularProgress, Typography, useMediaQuery } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

const blinkAnimation = {
    '@keyframes blink': {
        '0%': { opacity: 1 },
        '50%': { opacity: 0.5 },
        '100%': { opacity: 1 },
    },
    animation: 'blink 1s linear infinite'
};

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
    const isMoreSmallScreen = useMediaQuery('(max-width:1200px)');
    const isMobileSmallScreen = useMediaQuery('(max-width:600px)');

    const [webCamEnabled, setWebCamEnabled] = useState(false);

    const [recordLoading, setRecordLoading] = useState(false);


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
            setRecordLoading(true);
            stopSpeechToText();
            setRecordLoading(false);
        } else {
            startSpeechToText();
        }
    }

    const updateUserAnswerInDb = async () => {
        console.log('userAnswer', userAnswer);
        setLoading(true);
        setRecordLoading(true);

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
                    setRecordLoading(false);
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
                    setRecordLoading(false);
                });
        } catch (error) {
            console.error('Error generating feedback:', error);
            setLoading(false);
            toast.error('Failed to generate feedback. Please try again.');
            setRecordLoading(false);
        }
    };


    useEffect(() => {
        console.log("userAnswerrrrrrrrrrrrrrrrrr22222222222222222222:", userAnswer);

        if (!isRecording && userAnswer.length > 0) {
            updateUserAnswerInDb();
        }
    }, [userAnswer, isRecording]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            style={{ backgroundColor: 'black' }}

        >
            <Box>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                borderRadius="8px"
                p={0}
                // mt={isMobileSmallScreen ? 0 : 0}
                sx={{
                    boxShadow: '0 10px 30px rgba(255, 255, 255, 0.7)',
                    borderRadius: '20px',
                    border: 'none',
                    padding: '20px',
                    backgroundColor: '#000',
                    height: isMobileSmallScreen ? '23vh' : '60vh', // Fixed height
                    width: '100%', // Optionally set a fixed width
                    position: 'relative', // Ensures absolute positioning works
                }}
            >
                {
                    webCamEnabled ?
                        (
                            <Webcam
                                onUserMedia={() => setWebCamEnabled(true)}
                                onUserMediaError={() => setWebCamEnabled(false)}
                                mirrored={true}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover', // Makes sure the webcam fills the box
                                    zIndex: 10,
                                    backgroundColor: 'transparent',
                                }}
                            />
                        )
                        :
                        (
                            <Image
                                src={'/mywebcam.png'}
                                alt="webcam"
                                width={isMobileSmallScreen ? 150 : 300}
                                height={isMobileSmallScreen ? 150 : 300}
                                style={{
                                    // position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: isMobileSmallScreen ? '50%' : isMoreSmallScreen? '60%' : '50%',
                                    height: isMobileSmallScreen ? '90%' : isMoreSmallScreen? '70%' : '70%',
                                    // objectFit: 'cover', // Makes sure the image fills the box
                                    zIndex: 10,
                                }}
                            />
                        )
                }
  
                </Box>
                <Button
                    onClick={() => setWebCamEnabled(!webCamEnabled)}
                    style={{
                        // position: 'absolute',
                        marginTop:'15px',
                        marginBottom:'5px',
                        width: isMobileSmallScreen ? '50px' : '50px', // Set equal width and height
                        height: isMobileSmallScreen ? '50px' : '50px', 
                        color: 'white',
                        backgroundColor: '#2663eb',
                        zIndex: 20,
                        borderRadius:'80%'
                    }}
                >
                    {webCamEnabled ? (<><VideocamOffIcon /> </>) : (<><VideocamIcon /> </>)}
                </Button>
                </Box>
         

            <Button
                disabled={recordLoading}
                variant="outlined"
                onClick={StartStopRecording}
                sx={{
                    my: isMobileSmallScreen ? 1 : 4,
                    '&.Mui-disabled': {
                        borderColor: 'white',
                        backgroundColor: '#2d2e2e',
                        color: '#fff',
                    },
                }}
            >
                {isRecording ? (
                    <Typography
                        sx={{
                            color: 'red',
                            display: 'flex',
                            gap: 2,
                            alignItems: 'center',
                            ...blinkAnimation,
                        }}
                    >
                        <MicIcon sx={{ animation: 'blink 1s infinite' }} /> Stop Recording...
                    </Typography>
                ) : recordLoading ? (
                    <Typography sx={{ color: '#fff', display: 'flex', gap: 2 }}>
                        <CircularProgress size={20} sx={{ marginRight: '20px' }} /> Submitting
                    </Typography>
                ) : (
                    <Typography sx={{ color: '#fff', display: 'flex', gap: 2 }}>
                        Record Answer
                    </Typography>
                )}
            </Button>
        </Box>
    )
}

export default RecordAnswerSection