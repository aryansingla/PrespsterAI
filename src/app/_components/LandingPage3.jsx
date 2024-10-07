'use client'
import { Avatar, Box, Button, Card, CardContent, Stack, Typography, useMediaQuery } from '@mui/material'
import Grid from '@mui/material/Grid2';
import React from 'react'
import GppGoodIcon from '@mui/icons-material/GppGood';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Slider from "react-slick";
import { styled } from '@mui/material/styles';



const Landingpage3 = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };

    const isMobileScreen = useMediaQuery('(max-width:600px)');
    const isTabScreen = useMediaQuery('(max-width:900px)');
    const isSomeLargeScreen = useMediaQuery('(max-width:1500px)');
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



    const allTestimonials = [...testimonialsArray1, ...testimonialsArray1];

    const SliderBox = styled(Box)(() => ({
        display: 'flex',
        animation: `scroll 25s linear infinite`,
        "@keyframes scroll": {
            "0%": {
                transform: "translateX(0)",
            },
            "100%": {
                transform: `translateX(-${(allTestimonials.length / 2) * 100}%)`,
            },
        },
    }));


    return (
        <Box sx={{ backgroundColor: '#000', paddingTop: '50px', paddingBottom: '120px' }}>
        <Box sx={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 'auto'
        }}>
            <Box>
                    <Typography color="#2663eb"
                        sx={{
                            padding: '30px 0px 0px 0px',
                            fontWeight: 'bold',
                            fontSize: '25px'
                        }} >Wall of Love!!</Typography>
                </Box>
            <Box sx={{ width: isMobileScreen ? '100%' : isTabScreen ? '95%' : isSomeLargeScreen ? '75%': isLargeScreen ? '45%' :'45%' }}>
                <Typography
                    color="#fff"
                    sx={{
                        padding: '20px 0px',
                        fontWeight: 'bold',
                        fontSize: isMobileScreen ? '28px' : '60px',
                    }}
                >
                    Let the results shine for themselves.
                </Typography>
            </Box>

            <Box sx={{ width: '100%' }}>
                <Box  sx={{ display:'flex',flexDirection:'row', gap: '15px', overflow: 'hidden' }}>
                   
                    {
                        allTestimonials?.map((item,index)=>(
                            <SliderBox style={{width:'90%'}}>
                            <Card sx={{
                                p: '15px 25px',
                                background: 'linear-gradient(180deg, #0f1422, #1e2837)',
                                borderRadius: '20px',
                                height: isMobileScreen ? '320px' : isTabScreen ? '300px' : isLargeScreen ? '300px' : '250px',
                                overflow: 'hidden',
                                width:'30rem',
                            }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar sx={{ backgroundColor: '#2663eb' }}>OP</Avatar>
                                        <Box>
                                            <Typography sx={{ color: '#fff', fontSize: '25px' }}>
                                                {item?.name}
                                            </Typography>
                                            <Typography sx={{ color: '#bbb', fontSize: '16px',textAlign:'left' }}>
                                            {item?.username}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ marginTop: '10px' }}>
                                        <Typography gutterBottom sx={{ color: '#fff', fontSize: '20px', textAlign: 'left' }}>
                                        {item?.feedback}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </SliderBox>
                        ))
                    }
                   
                </Box>
            </Box>
        </Box>
    </Box>
    )
}

export default Landingpage3