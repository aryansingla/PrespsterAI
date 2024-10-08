'use client'
import { Box, Card, CardContent, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import OuterNavbar from './OuterNavbar'
import { signOut, useSession } from "next-auth/react";
import Navbar from './Navbar.jsx';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';



const PricingComponent = () => {
    const { data: session, status } = useSession();
    const isMobileScreen = useMediaQuery('(max-width:600px)');
    const isTabScreen = useMediaQuery('(max-width:900px)');
    const isLargeScreen = useMediaQuery('(max-width:1800px)');

  return (
    <Box>
        {
            status === 'authenticated' 
            ?
            (
                <Box>
                    <Navbar/>
                </Box>
            )
            :
            (
                <Box><OuterNavbar /></Box>
            )
        }

            <Box sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 'auto',
                paddingBottom:'30px'
            }}
            >
                <Box sx={{marginTop:'20px'}}>
                    <Typography sx={{color:'#fff' , fontSize:'30px'}}>Right now this platform is free to use , but upcoming prices are shown below</Typography>
                </Box>
                <Box sx={{ 
                    width: '90%', 
                    marginTop: '40px', 
                    display:'flex', 
                    flexWrap:'wrap',
                    gap:4, 
                    justifyContent:'center'
                }}
            >
                    <Box>
                    <Card sx={{
                        p: '0px 25px',
                        background: 'linear-gradient(180deg, #0f1422, #1e2837)',
                        borderRadius: '20px',
                        height: isMobileScreen ? '450px' : isTabScreen ? '400px' : isLargeScreen ? '400px' : '400px',
                        overflow: 'hidden',
                        width: isMobileScreen ? '20rem' :'30rem',
                        textAlign: 'center', // Add this for the card-level centering
                    }}>
                        <CardContent>
                            {/* Typography for the plan name */}
                            <Typography sx={{ color: '#fff', fontSize: '25px' }}>
                                Basic Plan
                            </Typography>
                            <Typography sx={{ color: '#bbb', fontSize: '45px' }}>
                                 $9.99/month
                            </Typography>

                            {/* Features or other information */}
                            <Box sx={{ marginTop: '20px',textAlign: isMobileScreen ? 'left':'center' }}>
                                <Typography gutterBottom sx={{ color: '#fff', fontSize: '20px' }}>
                                    - 5 mock interviews/month
                                </Typography>
                                <Typography gutterBottom sx={{ color: '#fff', fontSize: '20px' }}>
                                    - AI scoring and feedback
                                </Typography>
                                <Typography gutterBottom sx={{ color: '#fff', fontSize: '20px' }}>
                                    - Basic analytics
                                </Typography>
                                <Typography gutterBottom sx={{ color: '#8dbdeb', fontSize: '20px', marginTop:'20px', display:isMobileScreen?'none':'initial' }}>
                                Ideal for individuals just starting out in their careers, or those wanting to practice for entry-level roles.
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                    </Box>
                    <Box>
                    <Card sx={{
                        p: '0px 25px',
                        background: 'linear-gradient(180deg, #0f1422, #1e2837)',
                        borderRadius: '20px',
                        height: isMobileScreen ? '450' : isTabScreen ? '400px' : isLargeScreen ? '400px' : '400px',
                        overflow: 'hidden',
                        width: isMobileScreen ? '20rem' :'30rem',
                        textAlign: 'center', // Add this for the card-level centering
                    }}>
                        <CardContent>
                            {/* Typography for the plan name */}
                            <Typography sx={{ color: '#fff', fontSize: '25px' }}>
                                Pro Plan
                            </Typography>
                            <Typography sx={{ color: '#bbb', fontSize: '45px' }}>
                                 $24.99/month
                            </Typography>

                            {/* Features or other information */}
                            <Box sx={{ marginTop: '20px',textAlign: isMobileScreen ? 'left':'center' }}>
                                <Typography gutterBottom sx={{ color: '#fff', fontSize: '20px' }}>
                                    - 15 mock interviews/month
                                </Typography>
                                <Typography gutterBottom sx={{ color: '#fff', fontSize: '20px' }}>
                                    - AI scoring and feedback
                                </Typography>
                                <Typography gutterBottom sx={{ color: '#fff', fontSize: '20px' }}>
                                    - Email and live chat support
                                </Typography>
                                <Typography gutterBottom sx={{ color: '#fff', fontSize: '20px' }}>
                                    - Advanced analytics on strengths and weaknesses
                                </Typography>
                                <Typography gutterBottom sx={{ color: '#8dbdeb', fontSize: '20px', marginTop:'20px',display:isMobileScreen?'none':'initial'  }}>
                                Perfect for professionals preparing for mid-level positions or aiming to refine their interviewing skills.
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                    </Box>
                    <Box>
                    <Card sx={{
                        p: '0px 25px',
                        background: 'linear-gradient(180deg, #0f1422, #1e2837)',
                        borderRadius: '20px',
                        height: isMobileScreen ? '600px' : isTabScreen ? '550px' : isLargeScreen ? '550px' : '550px',
                        overflow: 'hidden',
                        width: isMobileScreen ? '20rem' :'30rem',
                        textAlign: 'center', // Add this for the card-level centering
                    }}>
                        <CardContent>
                            {/* Typography for the plan name */}
                            <Typography sx={{ color: '#fff', fontSize: '25px' }}>
                                Premium Plan
                            </Typography>
                            <Typography sx={{ color: '#bbb', fontSize: '45px' }}>
                                 $49.99/month
                            </Typography>

                            {/* Features or other information */}
                            <Box sx={{ marginTop: '20px' , textAlign: isMobileScreen ? 'left':'center' }}>
                                <Typography gutterBottom sx={{ color: '#fff', fontSize: '20px' }}>
                                    - 15 mock interviews/month
                                </Typography>
                                <Typography gutterBottom sx={{ color: '#fff', fontSize: '20px' }}>
                                    - AI scoring and feedback
                                </Typography>
                                <Typography gutterBottom sx={{ color: '#fff', fontSize: '20px' }}>
                                    - Priority customer support (email, live chat, phone)
                                </Typography>
                                <Typography gutterBottom sx={{ color: '#fff', fontSize: '20px' }}>
                                    - Personalized coaching recommendations based on performance
                                </Typography>
                                <Typography gutterBottom sx={{ color: '#fff', fontSize: '20px' }}>
                                    - Advanced analytics on strengths and weaknesses
                                </Typography>
                                <Typography gutterBottom sx={{ color: '#fff', fontSize: '20px' }}>
                                    - Downloadable performance reports
                                </Typography>
                                <Typography gutterBottom sx={{ color: '#8dbdeb', fontSize: '20px', marginTop:'20px',display:isMobileScreen?'none':'initial'  }}>
                                Tailored for professionals preparing for senior-level roles or individuals looking to perfect their interviewing technique across multiple industries.
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                    </Box>
                </Box>


            </Box>
     
        
    </Box>
  )
}

export default PricingComponent