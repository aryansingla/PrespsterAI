"use client"
import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/navigation';
import axios from 'axios';  // Assuming you're using Axios for making API requests
import { toast } from 'react-toastify';

const Feedback = ({ params }) => {
    const router = useRouter();
    const [feedBackList, setFeedBackList] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        GetFeedBack();
    }, []);

    const GetFeedBack = async () => {
        try {
            const requestOptions = {
                method: "GET",
                url: `http://localhost:5000/api/interview-feedback/${params.interviewId}`,
            };
            axios(requestOptions)
                .then((data) => {
                    setLoading(false);
                    setFeedBackList(data?.data);
                    console.log('dataaaaaaa', data);
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
        } catch (error) {
            console.error('Error fetching feedback:', error);
        }
    };

    return (
        <Box p={4}>
            {feedBackList.length === 0 ? (
                <Typography variant="h5" color="#fff" fontWeight="bold">
                    No Interview Performed.
                </Typography>
            ) : (
                <>
                    <Typography variant="h3" color="green" fontWeight="bold">
                        Congratulations
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" color="#fff">
                        Here is your Interview Feedback
                    </Typography>
                    <Typography variant="body1" color="#fff">
                        Find below the Interview Question with the correct answer, your answer, and feedback for improvement.
                    </Typography>

                    {feedBackList.map((item, index) => (
                        <Accordion key={index} sx={{ mt: 3 }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography color="#000">{item?.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box display="flex" flexDirection="column" gap={2}>
                                    <Typography color="error">
                                        <strong>Rating: </strong>{item?.rating}
                                    </Typography>
                                    <Typography variant="body2" bgcolor="red.50" color="error" p={2} border={1} borderRadius={1}>
                                        <strong>Your answer: </strong>{item?.userAns}
                                    </Typography>
                                    <Typography variant="body2" bgcolor="green.50" color="green" p={2} border={1} borderRadius={1}>
                                        <strong>Correct answer: </strong>{item?.correctAns}
                                    </Typography>
                                    <Typography variant="body2" bgcolor="blue.50" color="blue" p={2} border={1} borderRadius={1}>
                                        <strong>Feedback: </strong>{item?.feedback}
                                    </Typography>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    ))}

                    <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={() => router.replace('/dashboard')}>
                        Go Back to Dashboard
                    </Button>
                </>
            )}
        </Box>
    );
};

export default Feedback;
