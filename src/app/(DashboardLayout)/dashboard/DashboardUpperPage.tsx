"use client"
import { Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { signOut, useSession } from "next-auth/react";
import Grid from '@mui/material/Grid2';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Form, Formik } from 'formik';
import * as Yup from "yup";
import FormikTextField from '@/components/common/FormComponents/FormikTextField';
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import { chatSession } from '@/utils/GeminiAIModel';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


const DashboardUpperPage = () => {
    const router = useRouter();
    const session1 = useSession();
    const userDetails = session1?.data?.user;
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [jobPosition, setJobPosition] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [jobExperience, setJobExperience] = useState("");
    const [jsonResponse, setJsonResponse] = useState([]);


    const handleJobPositionChange = (e: any) => {
        setJobPosition(e.target.value);
    }

    const handleJobDescriptionChange = (e: any) => {
        setJobDescription(e.target.value);
    }

    const handleJobExperienceChange = (e: any) => {
        setJobExperience(e.target.value);
    }

    const handleClose = () => {
        setOpenDialog(false);
        setJobPosition("");
    };

    const initialValues = {
        jobPosition,
        jobDescription,
        jobExperience
    };

    const handleSubmit = async (event: any) => {
        setLoading(true);
        console.log(jobPosition, jobDescription, jobExperience);

        const inputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDescription}, Job Experience: ${jobExperience} , based on given information above give ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions of advanced techincal level and  give both question and their answers in JSON format, Give us question and answer field on JSON`;

        const result = await chatSession.sendMessage(inputPrompt);
        const responseText = await result.response.text();
        let MockJsonResponse = responseText.replace(/```json/g, '')
            .replace(/```/g, '')
            .replace(/[\n\r\t]/g, '');

        const parsedResponse = JSON.parse(MockJsonResponse);
        console.log('parsedResponse',parsedResponse);
        setJsonResponse(MockJsonResponse);

        const requestOptions = {
            method: "POST",
            url: `http://localhost:5000/api/create-interview`,
            data: {
                jobPosition: jobPosition,
                jobDescription: jobDescription,
                jobExperience: jobExperience,
                jsonMockResponse: MockJsonResponse,
                createdBy: userDetails?.email || 'unknown'
            },
        };
        axios(requestOptions)
            .then((data) => {
                setLoading(false);
                setOpenDialog(false);
                toast.success(`${data?.data?.message}`, {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                router.push(`/dashboard/interview/${data?.data?.mockId}`);
            })
            .catch((error) => {
                setLoading(false);
                toast.error(`${error?.response?.data?.message}`, {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });

        setLoading(false);
    }


    return (
        <>
            <div style={{ padding: '0px 50px' }}>
                <Grid container spacing={2}>
                    {/* Dashboard Heading */}
                    <Grid size={{ xs: 12, md: 6 }}>
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
                    <Grid size={{ xs: 12, md: 6 }}>
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

            <div>
                <Dialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={openDialog}
                    maxWidth='md'
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        <Typography variant="h5">Tell us more about your Job Interview</Typography>
                        <Typography variant="body1">Add details of Job Position, Job Description and Years of Experience
                        </Typography>

                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={(theme) => ({
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        <Formik
                            enableReinitialize
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                            validationSchema={Yup.object({
                                jobPosition: Yup.string().required("Required"),
                                jobDescription: Yup.string().required("Required"),
                                jobExperience: Yup.string().required("Required"),
                            })}
                        >
                            {({ handleSubmit, errors }) => {
                                return (
                                    <Container>
                                        <Form onSubmit={handleSubmit} autoComplete="off">
                                            <div style={{ display: "none" }}>
                                                <input
                                                    type="text"
                                                    id="subdomain-name"
                                                    readOnly
                                                    tabIndex={-1}
                                                />
                                                <input
                                                    type="password"
                                                    id="subdomain-password"
                                                    readOnly
                                                    tabIndex={-1}
                                                />
                                            </div>
                                            <Grid container spacing={1}>
                                                <Grid size={{ xs: 12 }}>
                                                    <FormikTextField
                                                        fullWidth
                                                        size="medium"
                                                        name="jobPosition"
                                                        value={jobPosition}
                                                        mandatory={true}
                                                        label="Job Role / Job Position"
                                                        autoComplete="off"
                                                        disabled={loading}
                                                        handleChange={handleJobPositionChange}
                                                    />
                                                </Grid>

                                                <Grid size={{ xs: 12 }}>
                                                    <FormikTextField
                                                        fullWidth
                                                        size="medium"
                                                        name="jobDescription"
                                                        value={jobDescription}
                                                        mandatory={true}
                                                        label="Job Description"
                                                        autoComplete="off"
                                                        disabled={loading}
                                                        handleChange={handleJobDescriptionChange}
                                                    />
                                                </Grid>

                                                <Grid size={{ xs: 12 }}>
                                                    <FormikTextField
                                                        fullWidth
                                                        size="medium"
                                                        name="jobExperience"
                                                        value={jobExperience}
                                                        mandatory={true}
                                                        label="Years of Experience"
                                                        autoComplete="off"
                                                        disabled={loading}
                                                        handleChange={handleJobExperienceChange}
                                                    />
                                                </Grid>

                                            </Grid>

                                            <Box sx={{
                                                display: 'flex',
                                                gap: 2,        // Gap between buttons
                                            }}>
                                                <Button
                                                    variant="outlined"
                                                    size="large"
                                                    fullWidth
                                                    type="submit"
                                                    disabled={loading}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    color="secondary"
                                                    variant="contained"
                                                    size="large"
                                                    fullWidth
                                                    type="submit"
                                                    disabled={loading}
                                                >
                                                    {loading ? (
                                                        <CircularProgress size={20} />
                                                    ) : (
                                                        "Login"
                                                    )}
                                                </Button>
                                            </Box>
                                        </Form>
                                    </Container>
                                );
                            }}
                        </Formik>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}

export default DashboardUpperPage;
