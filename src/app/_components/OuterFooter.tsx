'use client'
import { Box, Button, Container, Typography, useMediaQuery } from '@mui/material'
import Grid from '@mui/material/Grid2';
import React from 'react'
import GppGoodIcon from '@mui/icons-material/GppGood';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Link from 'next/link';
import MailIcon from '@mui/icons-material/Mail';
import XIcon from '@mui/icons-material/X';

const OuterFooter = () => {
    const isMobileScreen = useMediaQuery('(max-width:600px)');
    const isTabScreen = useMediaQuery('(max-width:900px)');
    const isMediumScreen = useMediaQuery('(max-width:1500px)');
    const isLargeScreen = useMediaQuery('(max-width:1800px)');




    return (
        <Box sx={{ backgroundColor: '#000', paddingTop: '50px', paddingBottom: '120px' }}>
            <Box sx={{ width: '60%', margin: 'auto' }}>
                <Grid container>
                    <Grid size={{ xs: 12, lg: 5 }}>
                        <Box>
                            <Typography sx={{ color: '#2663eb' }}>
                                Prepster AI
                            </Typography>


                            <Typography sx={{ color: '#fff', marginTop: '20px' }}>
                                Unleash Your Interview Potential: Boost Your Career with AI-Driven Mock Interviews and Professional Guidance
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                                <MailIcon sx={{ color: '#fff', marginRight: '8px' }} /> {/* Add some margin for spacing */}
                                <Typography sx={{ color: '#2663eb' }}>
                                    contactaryansingla@gmail.com
                                </Typography>
                            </Box>
                        </Box>

                    </Grid>
                    <Grid size={{ xs: 6, lg: 3.5 }}>
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography sx={{ color: '#2663eb' }}>
                                Product
                            </Typography>
                            <Typography sx={{
                                color: '#fff',
                                marginTop: '20px',
                                cursor: 'pointer',
                                '&:hover': {
                                    color: '#5e5f61',
                                    transform: 'translateX(5px)',
                                    transition: 'all 0.3s ease',
                                }
                            }}>
                                Pricing
                            </Typography>
                            <Typography sx={{
                                color: '#fff', marginTop: '20px', cursor: 'pointer', '&:hover': {
                                    color: '#5e5f61',
                                    transform: 'translateX(5px)',
                                    transition: 'all 0.3s ease',
                                }
                            }}>
                                Contact Us
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 6, lg: 3.5 }}>
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography sx={{ color: '#2663eb' }}>
                                Legal
                            </Typography>
                            <Typography sx={{
                                color: '#fff', marginTop: '20px', cursor: 'pointer',
                                '&:hover': {
                                    color: '#5e5f61',
                                    transform: 'translateX(5px)',
                                    transition: 'all 0.3s ease',
                                }
                            }}>
                                Terms and Conditions
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container sx={{ marginTop: '120px' }}>
                    <Grid size={{ xs: 12, md: 10 }}>
                        <Typography sx={{ color: '#5e5f61' }}>
                            &copy; 2024 Prepster AI. All rights reseved
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }} sx={{ textAlign: 'right' }}>
                        <XIcon sx={{ color: '#fff', marginRight: '8px',cursor:'pointer' }} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default OuterFooter