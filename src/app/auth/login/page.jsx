import LoginComponent from "./LoginComponent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

// This function needs to be async since getServerSession is asynchronous
const Page = async () => {
  let session;

  try {
    // Try to fetch session data on the server side
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error("Error fetching session", error);
    // Handle error in case fetching session fails
    return <div>Error fetching session.</div>;
  }

  // If the user is logged in, redirect them to the dashboard
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <>
      <LoginComponent />
    </>
  );
};

export default Page;
