import { Box, Card } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Register from "@/components/Auth/Register";


export default async function Register2() {
  const data = await getServerSession(authOptions)
  if(data?.user){
    redirect('/dashboard')
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
      <Grid
        container
        spacing={0}
        justifyContent="center"
        sx={{ height: "100vh" }}
      >
        <Grid
          size={{ xs: 11, sm:11, lg:6, xl:6 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Card
            elevation={9}
            sx={{ p: 3, zIndex: 1, width: "100%", maxWidth: "100%" }}
          >
            <Register />
          </Card>
        </Grid>
      </Grid>
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


Register2.layout = "Blank";