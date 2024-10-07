"use client";
import React,{ useEffect } from "react";
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    Stack,
    useMediaQuery
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import * as Yup from "yup";
import { useState, ChangeEvent } from "react";
import { Formik, Form } from "formik";
import FormikTextField from "@/components/common/FormComponents/FormikTextField";

import axios from "axios";

import FormikTextFieldValidationPassword from "@/components/common/FormComponents/FormikTextFieldValidationPassword";
import FormikTextFieldPassword from "@/components/common/FormComponents/FormikTextFieldPassword";
import passCheck from "@/helper/passCheck";
import PasswordHintText from "./PasswordHintText";
import Link from "next/link";
import { toast } from "react-toastify";

// import ErrorHandler from "@/helper/ErrorHandler";


function AuthRegister() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [currentError, setCurrentError] = useState([]);
    const [loading, setLoading] = useState(false);

    const isScreenSmall = useMediaQuery('(max-width:600px)');


    const handleNewPasswordChange = (event: any) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmNewPasswordChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setConfirmNewPassword(event.target.value);
    };

    useEffect(() => {
        const res = passCheck(newPassword);
        setCurrentError(res.errorMsgs);
    }, [newPassword]);

    const handleNameChange = (e: any) => {
        setName(e.target.value);
    };


    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
    };

    const handleFormSubmit = (val: any, setLoading: any) => {
        setLoading(true);
        const requestOptions = {
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
            data: {
                name: val.name,
                email: val.email,
                password: val.password,
            },
        };
        axios(requestOptions)
            .then((data) => {
                setLoading(false);
                toast.success(`${data?.data?.message}`, {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    // transition: Bounce,
                });
                window.location.replace('/auth/login')
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
                // ErrorHandler(
                //   error,
                //   error.response.data.message,
                //   "single",
                //   "error",
                //   setErrors
                // );
            });
    };



    const initialValues = {
        name,
        email,
        password: newPassword,
        confirmNewPassword,
    };
    return (
        <Box>
            <Box sx={{ textAlign: 'center' }}> {/* Changed to 'center' */}
                <Typography variant="h5" sx={{ fontWeight: '600' }}>PREPSTER AI</Typography>
                <Typography variant="h5" sx={{ marginTop: '15px', textAlign: 'left' }}>Signup</Typography> {/* Keeping the 'Login' text left-aligned */}
                <Typography variant={isScreenSmall ? "subtitle2" : "subtitle1"} sx={{ fontWeight: '200', textAlign: 'left', fontSize: isScreenSmall ? '15px' : 'inherit' }}>Join Us Today – Create an Account to Get Started</Typography>
            </Box>
            <Box sx={{ marginTop: '15px' }}>
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().required("Required"),
                        email: Yup.string().email().required("Required"),
                        password: Yup.string()
                            .test("pass-check", "", (value) => {
                                const res = passCheck(value);
                                return !res.error;
                            })
                            .required("Required"),
                        confirmNewPassword: Yup.string()
                            .oneOf([Yup.ref("password"), null], "Password must match")
                            .required("Required"),
                    })}
                    onSubmit={(values: object, { setSubmitting, setErrors }) =>
                        handleFormSubmit(values, setSubmitting)
                    }
                >
                    {({ handleSubmit, errors, isSubmitting }) => {
                        return (
                            <Form onSubmit={handleSubmit}>
                                <Grid
                                    container
                                    spacing={2}
                                    sx={{
                                        overflowY: "auto",
                                        maxHeight: "80vh",
                                        overflowX: "hidden",
                                        paddingRight: "16px",
                                    }}
                                >
                                    <Grid size={{ xs: 12, md: 6 }} sx={{ marginTop: '10px' }}>
                                        <FormikTextField
                                            fullWidth
                                            size="small"
                                            name="name"
                                            value={name}
                                            mandatory={true}
                                            label="Name"
                                            autoComplete="off"
                                            handleChange={handleNameChange}
                                            inputProps={{ maxLength: 30 }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }} sx={{ marginTop: '10px' }}>
                                        <FormikTextField
                                            fullWidth
                                            size="small"
                                            name="email"
                                            value={email}
                                            mandatory={true}
                                            label="Email"
                                            autoComplete="off"
                                            handleChange={handleEmailChange}
                                            inputProps={{ maxLength: 60 }}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <FormikTextFieldValidationPassword
                                            fullWidth
                                            size="small"
                                            name="password"
                                            value={newPassword}
                                            mandatory={true}
                                            label="Enter Password"
                                            autoComplete="off"
                                            handleChange={handleNewPasswordChange}
                                            inputProps={{ maxLength: 20 }}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <FormikTextFieldPassword
                                            fullWidth
                                            size="small"
                                            name="confirmNewPassword"
                                            value={confirmNewPassword}
                                            mandatory={true}
                                            label="Confirm Password"
                                            autoComplete="off"
                                            handleChange={handleConfirmNewPasswordChange}
                                            inputProps={{ maxLength: 20 }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }} sx={{ marginTop: "-30px" }}>

                                        <PasswordHintText currentError={currentError} />
                                    </Grid>
                                    {/* Additional space for the helper text placeholder */}
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Typography
                                            variant="caption"
                                            color="transparent" // Set the text color as transparent
                                            style={{ height: "20px" }} // Adjust the height as needed
                                        >
                                            {" "}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Box>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        type="submit"
                                        disabled={isSubmitting || loading}
                                        sx={{
                                            backgroundColor: '#2663eb',
                                            color: '#fff',
                                            marginTop:'10px'
                                        }}
                                    >
                                        {isSubmitting ? (
                                            <CircularProgress sx={{ color: "#fff" }} size={20} />
                                        ) : (
                                            "Signup"
                                        )}
                                    </Button>
                                </Box>
                            </Form>
                        );
                    }}
                </Formik>
            </Box>
            {/* <Divider sx={{ marginY: 3 }}>OR</Divider> */}
            {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button
                    variant="outlined"
                    disabled={loading}
                    startIcon={
                        <Image
                            src="/google-logo-2.png"
                            alt="Google logo"
                            width={40}
                            height={20}
                        />
                    }
                    sx={{
                        textTransform: "none",
                        borderRadius: "25px", // Rounded border
                        color: "text.primary",
                        borderColor: "text.primary",
                        "&:hover": {
                            borderColor: "text.primary",
                        }
                    }}
                >
                    Sign In with Google
                </Button>
            </Box> */}
            <Stack
                direction={isScreenSmall ? "column" : "row"}
                spacing={1}
                sx={{ marginTop: "40px", justifyContent: "center", alignItems: "center", textAlign: "center" }} // Aligning both vertically and horizontally
            >
                <Typography
                    color="textSecondary"
                    variant={isScreenSmall ? "subtitle1" : "h6"}
                    fontWeight="500"
                >
                    Already have an account ?
                </Typography>
                <Typography
                    component={Link}
                    href="/auth/login"
                    fontWeight="500"
                    sx={{
                        textDecoration: "none",
                        color: "#2663eb",
                    }}
                >
                    Login
                </Typography>
            </Stack>
            <Box sx={{textAlign:'center'}}>
            <Typography
                    component={Link}
                    href="/"
                    fontWeight="500"
                    sx={{
                        textDecoration: "none",
                        color: "#2663eb",
                    }}
                >
                    Go back to Welcome Page
                </Typography>
                </Box>
        </Box>
    );
}

export default AuthRegister;