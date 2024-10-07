'use client'
import { Box, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import OuterNavbar from './OuterNavbar'
import { signOut, useSession } from "next-auth/react";
import Navbar from './Navbar.jsx'


const TermsConditions = () => {
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

            <Box sx={{ backgroundColor: '#000', paddingTop: '50px', paddingBottom: isMobileScreen ? '50px' : '120px'}}>
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
                        marginTop:'60px'
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
                                Terms and Conditions
                            </Typography>
                            <Typography
                                color="#fff"
                                sx={{
                                    fontSize: '22px',
                                    textAlign: 'left'
                                    // lineHeight: isMobileScreen ? '50px' : '65px'
                                }}
                            >
                                These Terms and Conditions govern your use of our website and services. Please read them carefully.
                            </Typography>
                            <Typography
                                color="#fff"
                                sx={{
                                    paddingTop: '35px',
                                    fontSize: '25px',
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                }}
                            >
                                1. Acceptance of Terms
                            </Typography>
                            <Typography
                                color="#fff"
                                sx={{
                                    fontSize: '22px',
                                    textAlign: 'left',
                                }}
                            >
                                By using our website and services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you may not use our services.
                            </Typography>
                            <Typography
                                color="#fff"
                                sx={{
                                    paddingTop: '30px',
                                    fontSize: '25px',
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                }}
                            >
                                2. Use of Services
                            </Typography>
                            <Typography
                                color="#fff"
                                sx={{
                                    fontSize: '22px',
                                    textAlign: 'left',
                                }}
                            >
                                You agree to use our services for lawful purposes only. You must not use our services to violate any applicable laws or regulations.

                            </Typography>
                        </Box>

                    </Box>

                    <Box sx={{
                        width: isMobileScreen ? '95%' : isTabScreen ? '95%' : isMediumScreen ? '80%' : '85%',
                        backgroundColor: '#242424',
                        padding: '20px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        marginTop: '30px',
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
                                Refund Policy
                            </Typography>
                            <Typography
                                color="#fff"
                                sx={{
                                    fontSize: '22px',
                                    textAlign: 'left'
                                    // lineHeight: isMobileScreen ? '50px' : '65px'
                                }}
                            >
                                We offer a 7-day refund policy. If you are not satisfied with your purchase, you may request a refund within 7 days from the date of purchase.                            </Typography>
                            <Typography
                                color="#fff"
                                sx={{
                                    paddingTop: '35px',
                                    fontSize: '25px',
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                }}
                            >
                                Refund Eligibility
                            </Typography>
                            <Typography
                                color="#fff"
                                sx={{
                                    fontSize: '22px',
                                    textAlign: 'left',
                                }}
                            >
                                To be eligible for a refund, your request must meet the following conditions:
                            </Typography>
                            <Box component="ul" sx={{ color: '#fff', fontSize: '18px', paddingLeft: '20px', marginTop: '10px', textAlign: 'left' }}>
                                <li>Your request must be made within 7 days from the date of purchase.</li>
                                <li>Your request must be made in writing via email to our customer support team.</li>
                            </Box>
                            <Typography
                                color="#fff"
                                sx={{
                                    paddingTop: '30px',
                                    fontSize: '25px',
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                }}
                            >
                                Refund Process
                            </Typography>
                            <Typography
                                color="#fff"
                                sx={{
                                    fontSize: '22px',
                                    textAlign: 'left',
                                }}
                            >
                                To request a refund, please follow these steps:

                            </Typography>
                            <Box component="ol" sx={{ color: '#fff', fontSize: '18px', paddingLeft: '20px', marginTop: '10px', listStyleType: 'decimal', textAlign: 'left' }}>
                                <li>Send an email to our customer support team at contactaryansingla@gmail.com within 7 days of purchase.</li>
                                <li>Provide your name, order number, and the reason for the refund request.</li>
                                <li>We will review your request and notify you of the approval or rejection of your refund.</li>
                                <li>If your refund is approved, it will be processed, and a credit will be applied to your original method of payment within a certain number of days.</li>
                            </Box>

                            <Typography
                                color="#fff"
                                sx={{
                                    fontSize: '22px',
                                    textAlign: 'left',
                                }}
                            >
                                If you have any questions or need further assistance regarding our terms, conditions, or refund policy, please contact our customer support team.
                            </Typography>
                        </Box>

                    </Box>
                </Box>

            </Box>

        </Box>
    )
}

export default TermsConditions