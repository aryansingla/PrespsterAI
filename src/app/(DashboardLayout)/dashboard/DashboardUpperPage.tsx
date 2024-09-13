"use client"
import { Button, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { signOut, useSession } from "next-auth/react";
import Grid from '@mui/material/Grid2';


const DashboardUpperPage = () => {
    const session1 = useSession();
    const userDetails = session1?.data?.user;
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <>
            <div style={{ padding: '0px 50px' }}>
                <Grid container spacing={2}>
                    {/* Dashboard Heading */}
                    <Grid size={{xs:12, md:6}}>
                        <div style={{ color: '#fff' }}>
                            <Typography variant="h4" sx={{ color: '#6a91e6', fontWeight: 600 }}>
                                Dashboard
                            </Typography>
                            <div style={{ color: '#fff', marginTop: '10px' }}>
                                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 300 }}>
                                    Create and Start your AI Mock Interview.
                                </Typography>
                            </div>
                        </div>
                    </Grid>

                    {/* Add New Box */}
                    <Grid size={{xs:12, md:6}}>
                        <div
                            style={{
                                width: '100%', // Full width inside the grid
                                padding: '2.5rem', // Equivalent to 'p-10'
                                border: '1px solid #ccc', // Equivalent to 'border'
                                borderRadius: '0.5rem', // Equivalent to 'rounded-lg'
                                backgroundColor: '#6c757d', // Equivalent to 'bg-secondary'
                                cursor: 'pointer', // Equivalent to 'cursor-pointer'
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Equivalent to 'transition-all'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)'; // Equivalent to 'hover:scale-105'
                                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; // Equivalent to 'hover:shadow-md'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                            onClick={() => setOpenDialog(true)}
                        >
                            <h2
                                style={{
                                    fontWeight: 'bold', // Equivalent to 'font-bold'
                                    fontSize: '1.125rem', // Equivalent to 'text-lg'
                                    textAlign: 'center', // Equivalent to 'text-center'
                                    color: '#fff' // Assuming white text color
                                }}
                            >
                                + Add New
                            </h2>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default DashboardUpperPage;
