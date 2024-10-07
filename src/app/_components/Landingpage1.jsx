'use client'
import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import Grid from '@mui/material/Grid2';
import React from 'react'
import GppGoodIcon from '@mui/icons-material/GppGood';
import Link from 'next/link';

const Landingpage1 = () => {
    const isMobileScreen = useMediaQuery('(max-width:600px)');
    const isTabScreen = useMediaQuery('(max-width:900px)');
    const isLargeScreen = useMediaQuery('(max-width:1800px)');



    return (
        <Box sx={{ background: 'linear-gradient(180deg, #000, #0f1422)'  }}>
            <Box sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 'auto'
            }}
            >
                <Box>
                    <Typography color="#2663eb"
                        sx={{
                            padding: '30px 0px',
                            fontWeight: 'bold',
                            fontSize: '25px'
                        }} >Welcome!!</Typography>
                </Box>
                <Box sx={{ width: isMobileScreen ? '100%' : isTabScreen ? '95%' : '65%' }}>
                    <Typography
                        color="#fff"
                        sx={{
                            padding: '20px 0px',
                            fontWeight: 'bold',
                            fontSize: isMobileScreen ? '40px' : '75px',
                            lineHeight: isMobileScreen ? '50px' : '65px'
                        }}
                    >
                        <span
                            style={{
                                // background: 'linear-gradient(to right, #8bb9e0, #4facfe)',
                                // WebkitBackgroundClip: 'text',
                                // WebkitTextFillColor: 'transparent',
                                color: '#2663eb'
                            }}
                        >
                            AI-Powered
                        </span>{' '}
                        Mock Interviews To Secure Your Dream Job
                    </Typography>
                </Box>
                <Box sx={{ width: isMobileScreen ? '90%' : isTabScreen ? '90%' : '63%', }}>
                    <Typography
                        color="#fff"
                        sx={{
                            padding: '5px 0px',
                            fontWeight: '300',
                            fontSize: isMobileScreen ? '18px' : '25px'
                        }}
                    >
                        Meet Your AI Interview Coach – The quickest path to acing your job interviews. Get comprehensive practice and expert insights from our AI Assistant to achieve interview success.
                    </Typography>
                </Box>
                <Box sx={{ width: isMobileScreen ? '75%' : isTabScreen ? '85%': isLargeScreen?'60%' : '40%',marginTop:'40px'}}>
                    <Grid container spacing={1}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px 0px',
                                }}
                            >
                                <GppGoodIcon sx={{ fontSize: 40, color: '#2663eb', marginRight: '10px' }} />
                                <Typography
                                    color="#fff"
                                    sx={{
                                        fontWeight: '300',
                                        fontSize: isMobileScreen ? '14px' : '20px',
                                    }}
                                >
                                    Fast and Easy Onboarding
                                </Typography>
                            </Box>

                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px 0px',
                                }}
                            >
                                <GppGoodIcon sx={{ fontSize: 40, color: '#2663eb', marginRight: '10px' }} />
                                <Typography
                                    color="#fff"
                                    sx={{
                                        fontWeight: '300',
                                        fontSize: isMobileScreen ? '14px' : '20px',
                                    }}
                                >
                                    Personalized Interview Feedback
                                </Typography>
                            </Box>

                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px 0px',
                                }}
                            >
                                <GppGoodIcon sx={{ fontSize: 40, color: '#2663eb', marginRight: '10px' }} />
                                <Typography
                                    color="#fff"
                                    sx={{
                                        fontWeight: '300',
                                        fontSize: isMobileScreen ? '14px' : '20px',
                                    }}
                                >
                                    Engaging Practice Simulations
                                </Typography>
                            </Box>

                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px 0px',
                                }}
                            >
                                <GppGoodIcon sx={{ fontSize: 40, color: '#2663eb', marginRight: '10px' }} />
                                <Typography
                                    color="#fff"
                                    sx={{
                                        fontWeight: '300',
                                        fontSize: isMobileScreen ? '14px' : '20px',
                                    }}
                                >
                                    Budget-Friendly Pricing
                                </Typography>
                            </Box>

                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ width: isMobileScreen ? '90%' : isTabScreen ? '95%' : '65%',marginTop:'30px' }}>
                <Link href="/auth/login">
                   <Button variant="contained" size="large" sx={{backgroundColor:'#2663eb',padding:'15px 30px'}}>Get Started </Button>
                   </Link>
                </Box>

            </Box>
        </Box>
    )
}

export default Landingpage1