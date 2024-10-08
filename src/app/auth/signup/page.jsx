"use client"
// import { headers } from "next/headers";
import { useSession } from "next-auth/react";
import SignupComponent from "./SignupComponent";
import { Box } from "@mui/material";

const Page = () => {
  // const session = await getServerSession(authOptions);
  const { data: session, status } = useSession()

  // console.log("Session",session);

  return (
    <Box sx={{backgroundColor:'#000'}}>
      <SignupComponent session={session}/>
    </Box>
  );
};

export default Page;