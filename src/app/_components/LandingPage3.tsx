'use client'
import { Avatar, Box, Button, Card, CardContent, Typography, useMediaQuery } from '@mui/material'
import Grid from '@mui/material/Grid2';
import React from 'react'
import GppGoodIcon from '@mui/icons-material/GppGood';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const Landingpage3 = () => {
    const isMobileScreen = useMediaQuery('(max-width:600px)');
    const isTabScreen = useMediaQuery('(max-width:900px)');
    const isLargeScreen = useMediaQuery('(max-width:1800px)');

    const testimonialsArray1 = [
        {
            name: 'Alice Johnson',
            username: '@alice_j',
            feedback: 'This app helped me boost my confidence with mock interviews. The instant AI feedback was incredibly insightful!',
        },
        {
            name: 'David Lee',
            username: '@davidlee90',
            feedback: 'The best prep tool I’ve used! I nailed my job interview after practicing with the tailored questions.',
        },
        {
            name: 'Sophia Martinez',
            username: '@soph_martinez',
            feedback: 'I love how personalized the experience was. It really helped me understand where I needed to improve.',
        },
        {
            name: 'James Wilson',
            username: '@jameswilson',
            feedback: 'Great practice sessions! I went into my interview feeling more confident than ever before.',
        },
        {
            name: 'Olivia Brown',
            username: '@olivia_brown',
            feedback: 'The AI insights were spot-on! It’s like having a real interview coach with you.',
        }
    ];


    const testimonialsArray2 = [
        {
            name: 'Ethan Clarke',
            username: '@ethan_cl',
            feedback: 'I loved the instant feedback! It helped me fine-tune my responses quickly and effectively.',
        },
        {
            name: 'Emma Davis',
            username: '@emma_davis',
            feedback: 'A fantastic app that got me interview-ready in no time. Highly recommend!',
        },
        {
            name: 'Lucas Miller',
            username: '@lucas_m',
            feedback: 'I was blown away by how real the mock interviews felt. This app made all the difference in my preparation.',
        },
        {
            name: 'Mia Garcia',
            username: '@miagarcia',
            feedback: 'The questions covered a wide range of topics. I felt ready for anything after using this app.',
        },
        {
            name: 'Liam Harris',
            username: '@liamharris',
            feedback: 'An absolute must-have for interview prep! The feedback was precise and helpful.',
        }
    ];




    return (
        <Box sx={{ backgroundColor: '#000', paddingTop: '50px', paddingBottom: '120px' }}>
            <Box sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 'auto'
            }}
            >
                <Box sx={{ width: isMobileScreen ? '100%' : isTabScreen ? '95%' : '65%' }}>
                    <Typography
                        color="#fff"
                        sx={{
                            padding: '20px 0px',
                            fontWeight: 'bold',
                            fontSize: isMobileScreen ? '28px' : '40px',
                            // lineHeight: isMobileScreen ? '50px' : '65px'
                        }}
                    >
                        All the resources you need to ace your next interview.
                    </Typography>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <Card sx={{
                        width: isMobileScreen ? '90%' : isTabScreen ? '55%' : '35%',
                        padiing: '15px 25px',
                        background: 'linear-gradient(180deg, #0f1422, #1e2837)',
                        borderRadius: '20px',
                        height: isMobileScreen ? '320px': isTabScreen ? '300px':isLargeScreen ?'300px' :'250px',
                        overflow: 'hidden',
                    }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ backgroundColor: '#2663eb' }}>OP</Avatar>
                                <Box>
                                    <Typography sx={{ color: '#fff', fontSize: '25px' }}>
                                        John Doe
                                    </Typography>
                                    <Typography sx={{ color: '#bbb', fontSize: '16px' }}>
                                        @john_doe123
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ marginTop: '10px' }}>
                                <Typography gutterBottom sx={{ color: '#fff', fontSize: '20px', textAlign: 'left' }}>
                                    This AI interview platform was a game-changer! The tailored questions and instant feedback helped me improve quickly. I felt more confident and prepared for my actual interview, which I aced thanks to this app!
                                </Typography>
                            </Box>
                        </CardContent>


                    </Card>
                </Box>

            </Box>
        </Box>
    )
}

export default Landingpage3