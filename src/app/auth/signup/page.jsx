"use client"
// import { headers } from "next/headers";
import { useSession } from "next-auth/react";
import SignupComponent from "./SignupComponent";

const Page = () => {
  // const session = await getServerSession(authOptions);
  const { data: session, status } = useSession()

  // console.log("Session",session);

  return (
    <>
      <SignupComponent session={session}/>
    </>
  );
};

export default Page;