import LoginComponent from "./LoginComponent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

// This is now a server-side component
const Page = async () => {
  // Fetch session data on the server
  const session = await getServerSession(authOptions);

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
