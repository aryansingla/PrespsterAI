import { Box } from '@mui/material'
import React from 'react'
import OuterNavbar from './_components/OuterNavbar'
import Landingpage1 from './_components/Landingpage1'
import Landingpage2 from './_components/Landingpage2'
import Landingpage3 from './_components/LandingPage3'
import Landingpage4 from './_components/LandingPage4'
import OuterFooter from './_components/OuterFooter'

const Home = () => {
  return (
    <Box sx={{overflow:'hidden',backgroundColor:'#000'}}>
      <Box sx={{
        position: 'fixed', 
        width: '100%', 
        zIndex: 99, 
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)'
      }}><OuterNavbar /></Box>
      <Box sx={{paddingTop:'80px'}}><Landingpage1 /></Box>
      <Box><Landingpage2 /></Box>
      <Box><Landingpage3 /></Box>
      <Box><Landingpage4 /></Box>
      <Box><OuterFooter /></Box>



    </Box>
  )
}

export default Home