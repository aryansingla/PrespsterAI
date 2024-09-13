"use client";
import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import AuthRegister from "./AuthForms/AuthRegister";
// import OTPInput from "react-otp-input";

function Register() {
    return (
        <Box>
            <AuthRegister/>
        </Box>
    );
}

export default Register;