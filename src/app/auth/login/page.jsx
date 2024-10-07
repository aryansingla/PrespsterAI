import {
    Box,
    Typography,
  } from "@mui/material";
  import { redirect } from "next/navigation";
  import { getServerSession } from "next-auth";
  import Login from "@/components/Auth/Login";
  import { authOptions } from "@/app/api/auth/[...nextauth]/route";
  
//   export default async function Login2() {
    
//     const data = await getServerSession(authOptions);
  
//     if (data?.user) {
//       redirect("/dashboard");
//     }
    
//     return (
//       // <Box
//       //   sx={{
//       //     position: "relative",
//       //     "&:before": {
//       //       content: '""',
//       //       background: "black",
//       //       backgroundSize: "400% 400%",
//       //       animation: "gradient 15s ease infinite",
//       //       position: "absolute",
//       //       height: "100%",
//       //       width: "100%",
//       //       opacity: "0.3",
//       //     },
//       //   }}
//       // >
//       //   <Login/>
//       // </Box>
//       <>
//       <Typography sx={{color:'#fff'}}>login page</Typography>
      
//       </>
//     );
//   }
  
  
import React from 'react'

const page = () => {
  return (
    <>
    <div style={{color:'#000'}}>Login</div>
    <div style={{color:'#fff'}}>Login</div>
    </>

  )
}

export default page