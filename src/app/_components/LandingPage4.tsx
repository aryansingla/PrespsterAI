'use client'
import { Box, Button, Container, Typography, useMediaQuery } from '@mui/material'
import Grid from '@mui/material/Grid2';
import React from 'react'
import GppGoodIcon from '@mui/icons-material/GppGood';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Link from 'next/link';

const Landingpage4 = () => {
    const isMobileScreen = useMediaQuery('(max-width:600px)');
    const isTabScreen = useMediaQuery('(max-width:900px)');
    const isMediumScreen = useMediaQuery('(max-width:1500px)');
    const isLargeScreen = useMediaQuery('(max-width:1800px)');




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
                <Box sx={{
                    width: isMobileScreen ? '95%' : isTabScreen ? '95%' : isMediumScreen ? '80%' : '65%',
                    backgroundColor: '#2663eb',
                    padding: '20px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                }}>
                      <Box sx={{
                    width: isMobileScreen ? '99%' : isLargeScreen ? '90%':'80%',
                    margin:'auto'
                }}>
                    <Typography
                        color="#fff"
                        sx={{
                            padding: '20px 0px',
                            fontWeight: 'bold',
                            fontSize: isMobileScreen ? '28px':isTabScreen ? '55px' : '75px',
                            // lineHeight: isMobileScreen ? '50px' : '65px'
                        }}
                    >
                        Ready to take PrespsterAI for a spin?
                    </Typography>
                    </Box>


                    <Box sx={{width:'80%',margin:'auto'}}>
                        <Typography
                            color="#fff"
                            sx={{
                                padding: '5px 0px',
                                fontWeight: '300',
                                fontSize: isMobileScreen ? '18px' : '25px',
                                
                            }}
                        >
                            Unleash Your Interview Potential: Boost Your Career with AI-Driven Mock Interviews and Professional Guidance                    </Typography>
                    </Box>
                    <Link href="/auth/login">
                    <Button sx={{
                        backgroundColor:'#fff',
                        color:'#2663eb',
                        padding:'25px',
                        borderRadius:'20px',
                        marginTop:'20px',
                        cursor:'pointer',
                        fontSize: isMobileScreen? '18px' : '20px',
                        fontWeight: 'bold',
                        marginBottom:'30px'
                        }}>Get Started</Button>
                        </Link>

                        <Box sx={{ width: isMobileScreen ? '100%' : isTabScreen ? '85%' : isLargeScreen ? '80%' : '60%', 
                            display:'flex', 
                            flexWrap:'wrap',gap:4, 
                            justifyContent:'center',
                            margin:'auto'
                         }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '2px 15px',
                            color: '#fff',
                            borderRadius:'10px',
                        }}
                    >
                        <GppGoodIcon sx={{ fontSize: 40, color: '#fff', marginRight: '10px' }} />
                        <Typography
                            color="#fff"
                            sx={{
                                fontWeight: '600',
                                fontSize: isMobileScreen ? '14px' : '20px',
                            }}
                        >
                            Friendly pricing as you scale
                        </Typography>
                    </Box>
                        <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '2px 15px',
                            color: '#fff',
                            borderRadius:'10px',
                        }}
                    >
                        <GppGoodIcon sx={{ fontSize: 40, color: '#fff', marginRight: '10px' }} />
                        <Typography
                            color="#fff"
                            sx={{
                                fontWeight: '600',
                                fontSize: isMobileScreen ? '14px' : '20px',
                            }}
                        >
                           Multiple language support coming soon
                        </Typography>
                    </Box>

                     
                </Box>
                </Box>

                


            </Box>
        
        </Box>
    )
}

export default Landingpage4