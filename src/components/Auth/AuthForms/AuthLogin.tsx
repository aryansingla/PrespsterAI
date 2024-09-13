"use client";
import { useState, ChangeEvent, useEffect } from "react";
import {
    Box,
    Typography,
    Button,
    Stack,
    Container,
    CircularProgress,
    Dialog,
    DialogContent,
    CardContent,
} from "@mui/material";
import Grid from '@mui/material/Grid2';

import axios from "axios";
import * as Yup from "yup";
import Link from "next/link";
import { Formik, Form } from "formik";
import { signIn } from "next-auth/react";
// import ErrorHandler from "@/helper/ErrorHandler";
// import MessageHandler from "@/helper/messageHandler";
// import { getApiUrl } from "@/helper/apiUrlCheck";
// import { loginType } from "@/app/(DashboardLayout)/types/auth/auth";
import FormikTextField from "@/components/common/FormComponents/FormikTextField";
import FormikTextFieldPassword from "@/components/common/FormComponents/FormikTextFieldPassword";
// import passCheck from "@/helper/passCheck";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function AuthLogin() {
    //   const API_URL = getApiUrl();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [forgotPasswordUrl, setForgotPasswordUrl] = useState("");

    //   useEffect(() => {
    //     const res = passCheck(newPassword);
    //     setCurrentError(res.errorMsgs);
    //   }, [newPassword]);

    const signInWithToken = async (
        token: String,
        email: String,
        name: String,
    ) => {
        await signIn("credentials", {
            token: token,
            email: email,
            name: name,
        });
    };

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    };
    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
    };


    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/login`, {
                email,
                password,
            });

            // console.log('response', response);

            const result = await signIn("credentials", {
                redirect: false, // prevent NextAuth from automatically redirecting
                token: response.data.token,
                email: response.data.email,
                name: response.data.name,
            });

            // console.log('result', result);

            if (result?.ok) {
                toast.success(`${response?.data?.message}`, {
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
                // Redirect manually after successful login
                router.push("/dashboard");
            } else {
                console.log(result?.error); // handle error here if needed
            }
        } catch (error) {
            console.log('error', error);
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
            // Handle the error (e.g., show error message)
        } finally {
            setLoading(false);
        }
    };



    const initialValues = {
        email,
        password,
    };

    useEffect(() => {
        const currentUrl = window.location.href;
        const splitUrl = currentUrl.split("/auth/");
        const forgotUrl = `${splitUrl[0]}/auth/forgot-password`;
        setForgotPasswordUrl(forgotUrl);
    }, []);


    return (
        <>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={handleLogin}
                validationSchema={Yup.object({
                    email: Yup.string().email().required("Email Required"),
                    password: Yup.string().required("Password Required"),
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
                                            name="email"
                                            value={email}
                                            mandatory={true}
                                            label="Email"
                                            autoComplete="off"
                                            disabled={loading}
                                            handleChange={handleEmailChange}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12 }}>
                                        <FormikTextFieldPassword
                                            fullWidth
                                            size="medium"
                                            name="password"
                                            value={password}
                                            mandatory={true}
                                            label="Password"
                                            disabled={loading}
                                            autoComplete="new-password"
                                            handleChange={handlePasswordChange}
                                        />
                                    </Grid>
                                </Grid>
                                {/* <Stack
                      justifyContent="flex-end"
                      direction="row"
                      alignItems="center"
                      mb={2}
                    >
                      <Typography
                        component={Link}
                        // href={`${SITE_URL}/auth/forgot-password`}
                        href={forgotPasswordUrl}
                        fontWeight="500"
                        sx={{
                          textDecoration: "none",
                          color: "primary.main",
                        }}
                      >
                        Forgot Password ?
                      </Typography>
                    </Stack> */}
                                <Box>
                                    <Button
                                        color="primary"
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
            <Stack
                direction="row"
                spacing={1}
                sx={{ marginTop: "10px" }}
            >
                <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="400"
                >
                    New here ?
                </Typography>
                <Typography
                    component={Link}
                    href="/auth/signup"
                    fontWeight="500"
                    sx={{
                        textDecoration: "none",
                        color: "primary.main",
                    }}
                >
                    Sign Up
                </Typography>
            </Stack>
        </>

    );
}

export default AuthLogin;