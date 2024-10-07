"use client"
import { Button, Container, Typography, useMediaQuery } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useSession } from "next-auth/react";
import Grid from '@mui/material/Grid2';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Form, Formik } from 'formik';
import * as Yup from "yup";
import { chatSession } from '@/utils/GeminiAIModel';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import FormikTextFieldInternal from '@/components/common/FormComponents/FormikTextFieldInternal';
import FormikDescriptionField from '@/components/common/FormComponents/FormikDescriptionField';
import Image from 'next/image';


const DashboardUpperPage = () => {
    const isScreenSmall = useMediaQuery('(max-width:1080px)');
    const isMobileScreen = useMediaQuery('(max-width:600px)');
    // const isMoreLowerScreen = useMediaQuery('(max-width:380px)');


    const router = useRouter();
    const session1 = useSession();
    const userDetails = session1?.data?.user;
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [jobPosition, setJobPosition] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [jobExperience, setJobExperience] = useState("");
    const [jsonResponse, setJsonResponse] = useState([]);


    const handleJobPositionChange = (e) => {
        setJobPosition(e.target.value);
    }

    const handleJobDescriptionChange = (e) => {
        setJobDescription(e.target.value);
    }

    const handleJobExperienceChange = (e) => {
        setJobExperience(e.target.value);
    }

    const handleClose = () => {
        setOpenDialog(false);
        setJobPosition("");
        setJobDescription("");
        setJobExperience("");
    };

    const initialValues = {
        jobPosition,
        jobDescription,
        jobExperience
    };

    const handleSubmit = async (event) => {
        setLoading(true);
        console.log(jobPosition, jobDescription, jobExperience);

        const inputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDescription}, Job Experience: ${jobExperience} , based on given information above give ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions of advanced techincal level and  give both question and their answers in JSON format, Give us question and answer field on JSON`;

        const result = await chatSession.sendMessage(inputPrompt);
        const responseText = await result.response.text();
        const MockJsonResponse = responseText.replace(/```json/g, '')
            .replace(/```/g, '')
            .replace(/[\n\r\t]/g, '');

        const parsedResponse = JSON.parse(MockJsonResponse);
        console.log('parsedResponse', parsedResponse);
        setJsonResponse(MockJsonResponse);

        const requestOptions = {
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create-interview`,
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
                setLoading(false);
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
            <div style={{ padding: isMobileScreen ? '0px' : '0px 50px' }}>
                <Grid container spacing={2}>
                    {/* Dashboard Heading */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <div style={{ color: '#fff' }}>
                            <Typography variant="h4" sx={{ color: '#6a91e6', fontWeight: 600 }}>
                                Dashboard
                            </Typography>
                            <div style={{ color: '#fff', marginTop: '10px' }}>
                                <Typography variant={isScreenSmall ? "body1" : "h6"} sx={{ color: '#fff', fontWeight: 300 }}>
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
                    maxWidth='lg'
                >
                    <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#302f2f' }} id="customized-dialog-title">
                        <Typography sx={{ fontSize: isMobileScreen ? "20px" :  "22px", color: '#fff' }}>Tell us more about your Job Interview</Typography>
                        {!isMobileScreen && (
                            <Typography variant="subtitle2" sx={{ color: '#fff' }}>
                                Add details of Job Position, Job Description and Years of Experience
                            </Typography>
                        )}

                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={(theme) => ({
                            position: 'absolute',
                            display: isMobileScreen ? 'none' : 'absolute',
                            marginLeft:isMobileScreen ? '20px' : "0px",
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers
                        sx={{ backgroundColor: '#242424' }}
                    >
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
                            {({ handleSubmit }) => {
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
                                                    <FormikTextFieldInternal
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
                                                    <FormikDescriptionField
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
                                                    <FormikTextFieldInternal
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

                                            <Grid
                                                container spacing={1}
                                                sx={{
                                                    marginTop: '20px'
                                                }}>
                                                <Grid size={{ xs: 12, sm: 6 }}>
                                                    <Button
                                                        variant="outlined"
                                                        size="large"
                                                        fullWidth
                                                        onClick={handleClose}
                                                        disabled={loading}
                                                        sx={{
                                                            borderRadius: '100px',
                                                            textTransform: 'none',
                                                            '&.Mui-disabled': {
                                                                borderColor: 'white',
                                                                backgroundColor: '#2d2e2e',
                                                                color: '#171717',
                                                            },
                                                        }}
                                                    >
                                                        <Typography>Cancel</Typography>
                                                    </Button>
                                                </Grid>
                                                <Grid size={{ xs: 12, sm: 6 }}>
                                                    <Button
                                                        color="secondary"
                                                        variant="contained"
                                                        size="large"
                                                        fullWidth
                                                        type="submit"
                                                        disabled={loading}
                                                        sx={{
                                                            borderRadius: '100px',
                                                            textTransform: 'none',
                                                            '&.Mui-disabled': {
                                                                borderColor: 'white',
                                                                backgroundColor: '#2d2e2e',
                                                                color: '#fff',
                                                            },
                                                        }}
                                                    >
                                                        {loading ? (
                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                <Image
                                                                    src="/sparkle.gif"
                                                                    alt="Loading..."
                                                                    width={55}
                                                                    height={40}
                                                                    style={{ marginRight: '10px' }}  // Adjust margin if needed
                                                                />
                                                                <Typography>Generating from AI</Typography>
                                                            </div>
                                                        ) : (
                                                            <Typography>Start Interview</Typography>


                                                        )}
                                                    </Button>
                                                </Grid>
                                            </Grid>
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
