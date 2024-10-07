import React from 'react'
import {
    Box,
    Typography,
  } from "@mui/material";
  import { redirect } from "next/navigation";
  import { getServerSession } from "next-auth";
  import Login from "@/components/Auth/Login";
  import { authOptions } from "@/app/api/auth/[...nextauth]/route";
  
//   export default async function Login2() {
    
//     
    
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
  
  


const page = async () => {
  const data = await getServerSession(authOptions);
  
    if (data?.user) {
      redirect("/dashboard");
    }
  return (
    <>
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
        <Login/>
      </Box>
    </>

  )
}

export default page