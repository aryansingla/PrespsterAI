"use client"
import React from 'react'
import {
    Box,
} from "@mui/material";
import Login from "@/components/Auth/Login";

const LoginComponent = ({session}) => {
    if (session?.user) {
        redirect("/dashboard");
      }
    return (
        <Box
          sx={{
            position: "relative",
            "&:before": {
              content: '""',
              background: "black",
              backgroundSize: "400% 400%",
              animation: "gradient 15s ease infinite",
              position: "absolute",
              height: "100%",
              width: "100%",
              opacity: "0.3",
            },
          }}
        >
          <Login />
        </Box>
    )
}

export default LoginComponent;
