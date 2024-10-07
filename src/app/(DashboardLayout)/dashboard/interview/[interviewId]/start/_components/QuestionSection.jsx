import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { IconBorderRadius } from '@tabler/icons-react';
import React from 'react'
import Grid from '@mui/material/Grid2';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import Image from 'next/image';

const blinkBorderAnimation = {
  '@keyframes blinkBorder': {
    '0%': { opacity:1,border: '1px solid #fff' },
    '50%': { opacity:0.5,border: '1px solid #2663eb' },
    '100%': { opacity:1,border: '1px solid #fff' },
  },
  animation: 'blinkBorder linear 1.5s infinite',
};

const QuestionSection = ({ mockInterviewQuestion, activeQuestionIndex, setActiveQuestionIndex }) => {
  const isSecondMediumScreen = useMediaQuery('(max-width:900px)');
  const isSmallScreen = useMediaQuery('(max-width:1130px)');
  const isMobileSmallScreen = useMediaQuery('(max-width:600px)');


  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);

    }
    else {
      alert('Sorry, Your browser does not support text to speech.')
    }
  }


  return (
    <>
      {mockInterviewQuestion && (
        <>
          <Box style={{ padding: isMobileSmallScreen ? '2px':'20px', border: '1px', marginTop: isMobileSmallScreen ? '0px': '10px', borderRadius: '10px', backgroundColor: 'black' }}>
            <Grid container spacing={2}>
              {
                isMobileSmallScreen ?
                mockInterviewQuestion.map((question, index) => (
                  <Grid size={{ xs: 2.5}} key={index}>
                    <Typography
                      onClick={() => setActiveQuestionIndex(index)}
                      variant="body1"
                      style={{ 
                        color: '#fff', 
                        padding: '10px', 
                        backgroundColor: activeQuestionIndex === index ? '#6a91e6' : '#000', 
                        cursor: 'pointer', 
                        border: activeQuestionIndex !== index ? '1px solid white' : '0px solid white' }}
                        borderRadius="30px"
                    >
                      Q {index + 1}.
                    </Typography>
                  </Grid>
                ))

                : 
                mockInterviewQuestion.map((question, index) => (
                  <Grid size={{ xs: 6, sm: 4 }} key={index}>
                    <Typography
                      onClick={() => setActiveQuestionIndex(index)}
                      variant="body1"
                      style={{ color: '#fff', padding: '10px', backgroundColor: activeQuestionIndex === index ? '#6a91e6' : '#000', cursor: 'pointer', border: activeQuestionIndex !== index ? '1px solid white' : '0px solid white' }}
                    >
                      Question# {index + 1}
                    </Typography>
                  </Grid>
                ))

              }
             
              <Grid size={{ xs: 6, sm: 4 }}>
              <Button
                    onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}
                    style={{
                        // position: 'absolute',
                        width: isMobileSmallScreen ? '50px' : '50px', // Set equal width and height
                        height: isMobileSmallScreen ? '50px' : '50px', 
                        color: 'white',
                        backgroundColor: '#2663eb',
                        zIndex: 20,
                        borderRadius:'20%',
                        // border:'2px solid #fff',
                        ...blinkBorderAnimation
                    }}
                >
              <VolumeUpIcon  style={{ cursor: 'pointer', color: '#fff' }} />
              </Button>
              </Grid>
            </Grid>
            <Typography style={{ color: '#fff', marginTop: '20px' }} variant='subtitle1'>{mockInterviewQuestion[activeQuestionIndex]?.question}</Typography>

            <div style={{ 
              border: '1px solid #000', 
              backgroundColor: '#252626', 
              borderRadius: '0.5rem', 
              flex: '0.5', 
              display: isSecondMediumScreen ? "none" : "block" ,
              marginTop:'40px'
              }}>

              <h2 style={{ display: 'flex', alignItems: 'center', color: '#2663eb' }}>
                <Image
                  src="/information.png"
                  alt="Information..."
                  width={50}
                  height={50}
                  style={{ margin: '0px 10px' }}  // Adjust margin if needed
                /><strong>Note</strong></h2>

              <Typography variant='body1'
                style={{ color: '#fff', padding: '0px 20px 20px 20px' }}
              >
                Click on Record Answer when you want to answer the question. At the end of the interview, we will give you the feedback along with the correct answer for each question and your answer to compare with it.
              </Typography>


            </div>
          </Box>
        </>
      )}
    </>
  )
}

export default QuestionSection