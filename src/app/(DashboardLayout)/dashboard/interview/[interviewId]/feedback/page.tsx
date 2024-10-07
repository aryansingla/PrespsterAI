"use client"
import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, Button, Paper, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

const Feedback = ({ params }) => {
    const isMobileScreen = useMediaQuery('(max-width:600px)');
    const router = useRouter();
    const [feedBackList, setFeedBackList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState<number | null>(null);  // State for managing expanded panel (type is now number or null)


    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);  // Toggle the panel's expansion
    };

    useEffect(() => {
        GetFeedBack();
    }, []);

    const GetFeedBack = async () => {
        try {
            const requestOptions = {
                method: "GET",
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/interview-feedback/${params.interviewId}`,
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
        <Box p={isMobileScreen ? 1 :4}>
            {feedBackList.length === 0 ? (
                <Typography variant="h5" color="#fff" fontWeight="bold">
                    No Interview Performed.
                </Typography>
            ) : (
                <>
                    <Typography color="green" fontWeight="bold" sx={{fontSize:'30px'}}>
                        Congratulations
                    </Typography>
                    <Typography fontWeight="bold" color="#fff" sx={{fontSize:'30px'}}>
                        Here is your Interview Feedback
                    </Typography>
                    <Typography variant="body1" color="#fff">
                        Find below the Interview Question with the correct answer, your answer, and feedback for improvement.
                    </Typography>

                    {feedBackList.map((item, index) => (
                        <Accordion 
                        key={index} 
                        expanded={expanded === index}
                        sx={{ mt: 3, backgroundColor:'#171717' }}
                        onChange={handleAccordionChange(index)}
                        >
                            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color:'#fff'}}/>}>
                                <Typography color="#708ecf">{item?.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box display="flex" flexDirection="column" gap={2}>
                                    <Typography color="error">
                                        <strong>Rating: </strong>{item?.rating}
                                    </Typography>
                                    <Paper  sx={{backgroundColor:'#c1c3c7',padding:'20px 10px'}}>
                                        <Typography><strong>Your answer: </strong>{item?.userAns}</Typography>
                                    </Paper>
                                    <Paper  sx={{backgroundColor:'#c1c3c7',padding:'20px 10px'}}>
                                    <Typography sx={{color:'#2b6e07'}}><strong>Correct answer: </strong>{item?.correctAns}</Typography>
                                        </Paper>
                                        <Paper  sx={{backgroundColor:'#c1c3c7',padding:'20px 10px'}}>
                                        <Typography sx={{color:'#053963'}}><strong>Feedback: </strong>{item?.feedback}</Typography>
                                        </Paper>
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
