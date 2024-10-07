import {
    Box,
  } from "@mui/material";
  import { Metadata } from "next";
  import { headers } from "next/headers";
  import { redirect } from "next/navigation";
  import { getServerSession } from "next-auth";
  import Login from "@/components/Auth/Login";
  import { authOptions } from "@/app/api/auth/[...nextauth]/route";
  
  export default async function Login2() {
    const subDomain = await getData()
    const data = await getServerSession(authOptions);
  
    if (data?.user) {
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
        <Login/>
      </Box>
    );
  }
  
  export async function getData(){
    const headersList = headers();
    const domain = headersList.get('host') || ""
    let subdomain = ''
      if (domain.includes(".")) {
          const list = domain.split(`.`)
          if(list.length > 2){
              subdomain = list[0]
          }
      }
      return subdomain;
  }
  
  export const metadata = {
    title: "Login to SmartCorp HRM",
    description: "Smart Crop HRM",
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    },
  };