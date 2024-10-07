"use client"

import { Button, Box, Typography } from '@mui/material';
import moment from 'moment';
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

   
    const getTimeAgo = (dateString) => {
        // Convert the custom date string to a moment object
        const createdAt = moment(dateString, "DD-MM-YYYY HH:mm:ss");
        
        // Get the current time
        const now = moment();
        
        // Calculate the difference
        const diff = moment.duration(now.diff(createdAt));
        const diffDays = Math.floor(diff.asDays());
        const diffHours = Math.floor(diff.asHours()) % 24; // Remaining hours after full days
        const diffMinutes = Math.floor(diff.asMinutes()) % 60; // Remaining minutes after full hours

        // Generate the output based on the difference
        if (diffDays > 0) {
            return `${diffDays} days ago`;
        } else if (diffHours > 0) {
            return `${diffHours} hours ago`;
        } else {
            return `${diffMinutes} minutes ago`;
        }
    };

    const timeAgo = interview?.createdAt ? getTimeAgo(interview.createdAt) : 'Just now';

    console.log('interview.createdAt',interview.createdAt);

    return (
        <Box 
            sx={{
                backgroundColor: '#171717',  // main background black
                color: 'white',  // text color white
                border: '1px solid #444',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px'
            }}
        >
            {/* Job Position */}
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#708ecf' }}> {/* Primary color */}
                {interview?.jobPosition}
            </Typography>

            {/* Job Experience */}
            <Typography variant="body2" sx={{ color: '#ccc' }}>
                {interview?.jobExperience} Years of Experience
            </Typography>

            {/* Created At */}
            <Typography variant="body2" sx={{ color: '#999', marginTop: '40px' }}>
            Created At: {interview?.createdAt} ({timeAgo})
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
