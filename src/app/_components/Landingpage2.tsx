'use client'
import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import Grid from '@mui/material/Grid2';
import React from 'react'
import GppGoodIcon from '@mui/icons-material/GppGood';

const Landingpage2 = () => {
    const isMobileScreen = useMediaQuery('(max-width:600px)');
    const isTabScreen = useMediaQuery('(max-width:900px)');
    const isLargeScreen = useMediaQuery('(max-width:1800px)');



    return (
        <Box sx={{ background: 'linear-gradient(180deg, #0f1422, #1e2837)', paddingTop:'50px'  }}>
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
                <Box sx={{ width: isMobileScreen ? '90%' : isTabScreen ? '90%' : '63%', }}>
                    <Typography
                        color="#fff"
                        sx={{
                            padding: '5px 0px',
                            fontWeight: '300',
                            fontSize: isMobileScreen ? '18px' : '25px'
                        }}
                    >
                       Our AI Assistant provides thorough and immersive interview practice sessions, helping you master interviews and boost your confidence for any interview situation.
                    </Typography>
                </Box>
                {/* <Box sx={{ width: isMobileScreen ? '75%' : isTabScreen ? '85%': isLargeScreen?'60%' : '40%',marginTop:'40px'}}>
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
                </Box> */}


            </Box>
        </Box>
    )
}

export default Landingpage2