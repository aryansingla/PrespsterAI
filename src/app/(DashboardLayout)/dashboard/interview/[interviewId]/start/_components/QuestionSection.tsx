import { Box, Typography } from '@mui/material';
import { IconBorderRadius } from '@tabler/icons-react';
import React from 'react'
import Grid from '@mui/material/Grid2';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const QuestionSection = ({ mockInterviewQuestion, activeQuestionIndex, setActiveQuestionIcdex }) => {
  
  const textToSpeech = (text) =>{
    if('speechSynthesis' in window){
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
      <Box style={{padding:'20px', border:'1px', marginTop:'10px',borderRadius:'10px',backgroundColor:'black'}}>
        <Grid container spacing={2}>
        {
          mockInterviewQuestion.map((question: any,index: any)=> (
            <Grid size={{xs:6, sm:4}} key={index}>
            <Typography
             onClick={()=> setActiveQuestionIcdex(index)}
             variant="body1"
             style={{color:'#fff',padding:'10px',backgroundColor: activeQuestionIndex === index ? '#6a91e6': '#000',cursor:'pointer', border: activeQuestionIndex !== index ? '1px solid white' : '0px solid white'}}
             >
              Question# {index+1}
            </Typography>
            </Grid>
          ))
        }
        </Grid>
        <Typography style={{color:'#fff',marginTop:'20px'}} variant='subtitle1'>{mockInterviewQuestion[activeQuestionIndex]?.question}</Typography>
        <VolumeUpIcon onClick={()=> textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)} style={{cursor:'pointer',color:'#fff'}}/>
        <Box
  sx={{
    border: '1px solid',
    borderRadius: '8px', // equivalent to rounded-lg
    padding: '20px', // equivalent to p-5
    backgroundColor: 'rgba(187, 222, 251, 1)', // bg-blue-100
    marginTop: '80px', // equivalent to mt-20 (5 * 16px)
  }}
>
  <Typography
    component="h2"
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px', // equivalent to gap-2
      color: 'primary.main',
    }}
  >
    <LightbulbIcon />
    <strong>Note:</strong>
  </Typography>
  <Typography
    component="h2"
    sx={{
      fontSize: '0.875rem', // equivalent to text-sm
      color: 'primary.main',
      marginY: '8px', // equivalent to my-2
    }}
  >
    Click on Record Answer when you want to answer the question. At the end of the interview, we will give you the feedback along with the correct answer for each question and your answer to compare with it.
  </Typography>
</Box>
      </Box>
      </>
    )}
    </>
  )
}

export default QuestionSection