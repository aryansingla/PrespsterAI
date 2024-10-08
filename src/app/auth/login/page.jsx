"use client"
import LoginComponent from "./LoginComponent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";

// This function needs to be async since getServerSession is asynchronous
const Page = () => {
  // const session = await getServerSession(authOptions);
  const { data: session, status } = useSession()

  // console.log("Session",session);

  return (
    <>
      <LoginComponent session={session} />
    </>
  );
};

export default Page;

// export async function getServerSideProps(context) {
//   const session = await getServerSession(context.req, context.res, authOptions)
//   if (!session) {
//     return {
//         redirect: {
//             destination: '/',
//             permanent: false,
//         }
//     }
//   }

//   return {
//     props: {
//         session,
//     }
//   }
// }
