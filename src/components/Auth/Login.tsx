"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Box, Card, IconButton, Stack, Typography } from "@mui/material";
import AuthLogin from "./AuthForms/AuthLogin";

import { redirect } from "next/navigation";
import Grid from '@mui/material/Grid2';


function Login({ user }) {

  if (user?.user) {
    redirect("/dashboard");
  }

  return (
    <Grid
      container
      spacing={0}
      justifyContent="center"
      sx={{ height: "100vh" }}
    >
      <Grid
        size={{ xs: 11, sm: 11, lg: 4, xl: 4 }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
          }}
        >
          <Card
            elevation={9}
            sx={{ p: 3, zIndex: 1, width: "100%", maxWidth: "100%" }}
          >
            <AuthLogin/>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;