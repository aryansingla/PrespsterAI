"use client"
import { useSession } from "next-auth/react";
import { Box } from "@mui/material";
import VerifyOtpComponent from "./VerifyOtpComponent";

// This function needs to be async since getServerSession is asynchronous
const Page = () => {
  // const session = await getServerSession(authOptions);
  const { data: session, status } = useSession()

  // console.log("Session",session);

  return (
    <Box sx={{backgroundColor:'#000'}}>
      <VerifyOtpComponent session={session} />
    </Box>
  );
};

export default Page;

