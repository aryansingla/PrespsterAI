"use client";
import React, { useEffect, useState } from "react";
import axios from 'axios'
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled, useTheme } from "@mui/material/styles";
// import Header from "./layout/vertical/header/Header";
// import Sidebar from "./layout/vertical/sidebar/Sidebar";

import { signOut, useSession } from "next-auth/react";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import Navbar from "../_components/Navbar";


const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
  width: "100%",
  // overflow: "hidden",
}));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  
  const theme = useTheme();
  const router = useRouter();

  const [loading, setLoading] = useState(true)
  const { data: session, status } = useSession();

  const mode = theme.palette.mode

  const session1 = useSession();
//   console.log('session1',session1);

  useEffect(()=> {
    if (status === "loading") {
      setLoading(true)
    }
  
    if (status === "unauthenticated") {
      setLoading(false)
     window.location.replace(`/auth/login`);
    }   

    if(status === 'authenticated'){
        setLoading(false)
  
    }

  },[status])



  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {
        loading
        ?
        <Box
          sx={{
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'center',
            height : '100vh',
            width : '100vw',
            backgroundColor:'#000'
          }}
        >
          <CircularProgress />
        </Box>
        :
        status === 'authenticated' && (
        <>
          <Box sx={{width:'100%'}}>
           <Navbar/>
            <Box
              sx={{
                height: "75px",
              }}
            />
            <Container
              sx={{
                maxWidth: '100% !important',
                margin : '0px'
              }}
            >
              <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
                {children}
                </Box>
            </Container>
          </Box>
        </>
        )
      }
    </Box>
  );
}
