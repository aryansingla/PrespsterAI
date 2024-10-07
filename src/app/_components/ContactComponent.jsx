'use client'
import { Box, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import OuterNavbar from './OuterNavbar'
import { signOut, useSession } from "next-auth/react";
import Navbar from './Navbar.jsx';


const ContactComponent = () => {
    const { data: session, status } = useSession();
    const isMobileScreen = useMediaQuery('(max-width:600px)');
    const isTabScreen = useMediaQuery('(max-width:900px)');
    const isMediumScreen = useMediaQuery('(max-width:1500px)');
    const isLargeScreen = useMediaQuery('(max-width:1800px)');
    return (
        <Box>
            {
                status === 'authenticated'
                    ?
                    (
                        <Box sx={{
                            position: 'fixed',
                            width: '100%',
                            zIndex: 99,
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <Navbar />
                        </Box>
                    )
                    :
                    (
                        <Box sx={{
                            position: 'fixed',
                            width: '100%',
                            zIndex: 99,
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            backdropFilter: 'blur(10px)'
                        }}><OuterNavbar /></Box>
                    )
            }

            <Box sx={{ backgroundColor: '#000', paddingTop: '50px', paddingBottom: isMobileScreen ? '50px' : '120px' }}>
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
                        width: isMobileScreen ? '95%' : isTabScreen ? '95%' : isMediumScreen ? '80%' : '85%',
                        backgroundColor: '#242424',
                        padding: '20px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        marginTop: '60px'
                    }}>
                        <Box>
                            <Typography
                                color="#fff"
                                sx={{
                                    paddingTop: '20px',
                                    fontWeight: 'bold',
                                    fontSize: '30px',
                                    textAlign: 'left'
                                    // lineHeight: isMobileScreen ? '50px' : '65px'
                                }}
                            >
                                Contact Us
                            </Typography>
                            <Typography
                                color="#fff"
                                sx={{
                                    fontSize: '22px',
                                    textAlign: 'left'
                                    // lineHeight: isMobileScreen ? '50px' : '65px'
                                }}
                            >
                                Please feel free to contact us with your inquiries, comments, or feedback.

                            </Typography>
                            <Typography
                                color="#fff"
                                sx={{
                                    paddingTop: '35px',
                                    fontSize: '22px',
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                }}
                            >
                                Name
                            </Typography>
                            <Typography
                                color="#fff"
                                sx={{
                                    fontSize: '25px',
                                    textAlign: 'left',
                                }}
                            >
                                Prespster AI
                            </Typography>
                            <Typography
                                color="#fff"
                                sx={{
                                    paddingTop: '30px',
                                    fontSize: '22px',
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                }}
                            >
                                Email
                            </Typography>
                            <Typography
                                color="#fff"
                                sx={{
                                    fontSize: '22px',
                                    textAlign: 'left',
                                }}
                            >
                                contactaryansingla@gmail.com
                            </Typography>
                        </Box>

                    </Box>
                </Box>

            </Box>

        </Box>
    )
}

export default ContactComponent