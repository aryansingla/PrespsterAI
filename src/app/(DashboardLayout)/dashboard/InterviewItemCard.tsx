"use client"

import { Button, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

const InterviewItemCard = ({ interview }) => {
    const router = useRouter();

    const onStart = () => {
        router.push(`/dashboard/interview/${interview?.mockId}`);
    };

    const onFeedback = () => {
        router.push(`/dashboard/interview/${interview?.mockId}/feedback`);
    };

    return (
        <Box 
            sx={{
                backgroundColor: 'black',  // main background black
                color: 'white',  // text color white
                border: '1px solid #444',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px'
            }}
        >
            {/* Job Position */}
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}> {/* Primary color */}
                {interview?.jobPosition}
            </Typography>

            {/* Job Experience */}
            <Typography variant="body2" sx={{ color: '#ccc' }}>
                {interview?.jobExperience} Years of Experience
            </Typography>

            {/* Created At */}
            <Typography variant="body2" sx={{ color: '#999' }}>
                Created At: {interview?.createdAt}
            </Typography>

            {/* Buttons */}
            <Box display="flex" justifyContent="space-between" mt={2} gap={2}>
                <Button 
                    variant="outlined" 
                    color="primary" 
                    fullWidth 
                    onClick={onFeedback}
                >
                    Feedback
                </Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    onClick={onStart}
                >
                    Start
                </Button>
            </Box>
        </Box>
    );
};

export default InterviewItemCard;
