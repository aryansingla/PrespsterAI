'use client'
import { Box, Button, Container, Typography, useMediaQuery } from '@mui/material'
import Grid from '@mui/material/Grid2';
import React from 'react'
import GppGoodIcon from '@mui/icons-material/GppGood';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Link from 'next/link';
import MailIcon from '@mui/icons-material/Mail';
import XIcon from '@mui/icons-material/X';
import { useRouter } from 'next/navigation';

const OuterFooter = () => {

    const router = useRouter();
    const isMobileScreen = useMediaQuery('(max-width:600px)');
    const isTabScreen = useMediaQuery('(max-width:900px)');
    const isMdPoint = useMediaQuery('(max-width:1200px)');

    const isMediumScreen = useMediaQuery('(max-width:1500px)');
    const isLargeScreen = useMediaQuery('(max-width:1800px)');


    const handlePricingClick = () => {
        router.push('/pricing');
    }

    const handleContactUsClick = () => {
        router.push('/contact-us');
    }

    const handleTermsClick = () => {
        router.push('/terms-and-conditions');
    }

    return (
        <Box sx={{ backgroundColor: '#000', paddingTop: isMobileScreen ? '0px':'50px', paddingBottom: '120px' }}>
            <Box sx={{ width: isMobileScreen ? '92%' :isMediumScreen ? '75%' : isLargeScreen ? '70%':'60%', margin: 'auto' }}>
                <Grid container>
                    <Grid size={{ xs: 12, lg: 5 }}>
                        <Box>
                            <Typography sx={{ color: '#2663eb',cursor: 'default' }}>
                                Prepster AI
                            </Typography>


                            <Typography sx={{ color: '#fff', marginTop: '20px' ,cursor: 'default'}}>
                                Unleash Your Interview Potential: Boost Your Career with AI-Driven Mock Interviews and Professional Guidance
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                                <MailIcon sx={{ color: '#fff', marginRight: '8px' }} /> {/* Add some margin for spacing */}
                                <Typography sx={{ color: '#2663eb',
                                '&:hover': {
                                    textDecoration: 'underline',
                                    cursor: 'default'
                                } }}>
                                    contactaryansingla@gmail.com
                                </Typography>
                            </Box>
                        </Box>

                    </Grid>
                    <Grid size={{ xs: 6, lg: 3.5 }} sx={{marginTop:isMdPoint ? '60px':'0px'}}>
                        <Box sx={{ textAlign: isMdPoint ? 'left':'right' }}>
                            <Typography sx={{ color: '#2663eb',cursor: 'default' }}>
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
                            }}
                            onClick = {handlePricingClick}
                            >
                                Pricing
                            </Typography>
                            <Typography sx={{
                                color: '#fff', marginTop: '20px', cursor: 'pointer', '&:hover': {
                                    color: '#5e5f61',
                                    transform: 'translateX(5px)',
                                    transition: 'all 0.3s ease',
                                }
                            }}
                            onClick={handleContactUsClick}
                            >
                                Contact Us
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 6, lg: 3.5 }} sx={{marginTop:isMdPoint ? '60px':'0px'}}>
                        <Box sx={{ textAlign: isMdPoint ? 'left':'right' }}>
                            <Typography sx={{ color: '#2663eb',cursor: 'default' }}>
                                Legal
                            </Typography>
                            <Typography sx={{
                                color: '#fff', marginTop: '20px', cursor: 'pointer',
                                '&:hover': {
                                    color: '#5e5f61',
                                    transform: 'translateX(5px)',
                                    transition: 'all 0.3s ease',
                                }
                            }}
                            onClick ={handleTermsClick}
                            >
                                Terms and Conditions
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container sx={{ marginTop: isMobileScreen ? '60px' :'120px' }}>
                    <Grid size={{ xs: 12, md: 10 }}>
                        <Typography sx={{ color: '#5e5f61',textAlign: isMobileScreen ? 'center':'left',cursor: 'default' }}>
                            &copy; 2024 Prepster AI. All rights reseved
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }} sx={{ textAlign: isMobileScreen ? 'center':'right', marginTop: isMobileScreen ?'10px':'0px' }}>
                        <Link href="https://x.com/singlaaryan11">
                        <XIcon sx={{ color: '#fff', marginRight: '8px',cursor:'pointer' }} />
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default OuterFooter