"use client";
import { useEffect } from "react";
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Checkbox,
    CircularProgress,
    Stack,
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


interface CountryList {
    id: string;
    name: string;
    phonecode: string;
}
interface Department {
    id: string;
    name: string;
}

const regex = /^[A-Za-z0-9]*$/;
function AuthRegister() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [currentError, setCurrentError] = useState([]);


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

    const handleFormSubmit = (val: any, setLoading: any, setErrors) => {
        setLoading(true);
        const requestOptions = {
            method: "POST",
            url: `http://localhost:5000/api/auth/register`,
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
                    handleFormSubmit(values, setSubmitting, setErrors)
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
                                <Grid size={{ xs: 12, md: 6 }} sx={{marginTop:'10px'}}>
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
                                <Grid size={{ xs: 12, md: 6 }} sx={{marginTop:'10px'}}>
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
                                    color="primary"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    type="submit"
                                    disabled={isSubmitting}
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
                    Already have an Account?
                </Typography>
                <Typography
                    component={Link}
                    href="/auth/login"
                    fontWeight="500"
                    sx={{
                        textDecoration: "none",
                        color: "primary.main",
                    }}
                >
                    Log In
                </Typography>
            </Stack>
        </Box>
    );
}

export default AuthRegister;