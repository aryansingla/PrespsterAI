import { useState } from "react";
import { Button, Stack, TextField, Box, CircularProgress, Typography, useMediaQuery } from "@mui/material";
import Grid from '@mui/material/Grid2';
import FormikTextField from '../../common/FormComponents/FormikTextField'
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";


export default function AuthForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const isScreenSmall = useMediaQuery('(max-width:1080px)');


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handleSubmit = (val, setLoading) => {
        // console.log("val", val);
        setLoading(false);
    };
    const initialValues = {
        email,
    };
    const handleSave = () => {
        setLoading(true);
        const requestOptions = {
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/accounts/forget-password`,
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                email: email,
            },
        };
        axios(requestOptions)
            .then((data) => {
                setLoading(false);
                localStorage.setItem('email', email);
                window.location.replace('/auth/verify-otp')

            })
            .catch((data) => {
                setLoading(false);
            });
    };
    return (
        <>
        <Box sx={{ textAlign: 'center' }}> {/* Changed to 'center' */}
                <Typography variant="h5" sx={{ fontWeight: '600' }}>PREPSTER AI</Typography>
                <Typography variant={isScreenSmall ? "subtitle2" : "subtitle1"} sx={{ fontWeight: '200', textAlign: 'left', fontSize: isScreenSmall? '15px' : 'inherit' }}>              Please enter the email address associated with your account and We will email you an OTP to proceed with your New Password Setting.
                </Typography>
            </Box>
            <Box sx={{ marginTop: '15px' }}>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={Yup.object({
                    email: Yup.string().email().required('Email Required'),
                })}
                onSubmit={() => handleSave()}
            >
                {({ handleSubmit, errors }) => {
                    const isEmailValid = !errors.email;
                    return (
                        <Form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12 }} sx={{ marginTop: '10px' }}>
                                    <FormikTextField
                                        fullWidth
                                        size="medium"
                                        name="email"
                                        value={email}
                                        mandatory={true}
                                        label="Email"
                                        autoComplete="off"
                                        handleChange={handleEmailChange}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                color="primary"
                                variant="contained"
                                size="large"
                                fullWidth
                                onSubmit={handleSave}
                                type="submit"
                                disabled={!isEmailValid || !email}
                                sx={{
                                    backgroundColor: '#2663eb',
                                    color: '#fff',
                                }}
                            >
                                {loading ? (
                                    <CircularProgress sx={{ color: "#fff" }} size={20} />
                                ) : (
                                    "Forgot Password"
                                )}
                            </Button>
                            <Button
                                color="primary"
                                size="large"
                                fullWidth
                                component={Link}
                                href="/auth/login"
                                variant="contained"
                                sx={{
                                    backgroundColor: '#2663eb',
                                    color: '#fff',
                                    marginTop: '10px'
                                }}

                            >
                                Back to Login
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
            </Box>
        </>
    );
}