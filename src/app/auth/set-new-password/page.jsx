"use client"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";
import { Box } from "@mui/material";
import NewPasswordComponent from "./NewPasswordComponent";

// This function needs to be async since getServerSession is asynchronous
const Page = () => {
  // const session = await getServerSession(authOptions);
  const { data: session, status } = useSession()

  // console.log("Session",session);

  return (
    <Box sx={{backgroundColor:'#000'}}>
      <NewPasswordComponent session={session} />
    </Box>
  );
};

export default Page;

