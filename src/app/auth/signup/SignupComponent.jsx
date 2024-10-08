"use client"
import React from 'react'
import { Box, Card } from "@mui/material";
import Grid from '@mui/material/Grid2';

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect, useRouter } from "next/navigation";
import Register from "@/components/Auth/Register";
import { useSession } from "next-auth/react";

const SignupComponent = ({session}) => {
    const router = useRouter();
    if (session?.user) {
        router.push("/dashboard");
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
    <Grid
      container
      spacing={0}
      justifyContent="center"
      sx={{ height: "100vh" }}
    >
      <Grid
        size={{ xs: 11, sm:11, lg:6, xl:6 }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Card
          elevation={9}
          sx={{ p: 3, zIndex: 1, width: "100%", maxWidth: "100%" }}
        >
          <Register />
        </Card>
      </Grid>
    </Grid>
  </Box>
  )
}

export default SignupComponent