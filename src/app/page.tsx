import { Box } from '@mui/material'
import React from 'react'
import OuterNavbar from './_components/OuterNavbar'
import Landingpage1 from './_components/Landingpage1'
import Landingpage2 from './_components/Landingpage2'
import Landingpage3 from './_components/LandingPage3'

const Home = () => {
  return (
    <Box>
      <Box><OuterNavbar/></Box>
      <Box><Landingpage1/></Box>
      <Box><Landingpage2/></Box>
      <Box><Landingpage3/></Box>

    </Box>
  )
}

export default Home