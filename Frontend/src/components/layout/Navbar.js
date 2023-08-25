import { Box, Typography } from '@mui/material'
import React from 'react'

const Navbar = () => {
  return (
    <>
      <Box sx={{width:'100%',height:'80px',background:'black',display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Typography sx={{color:'whitesmoke',fontSize:'36px',fontWeight:'600'}}>Medicing Enterprises</Typography>
      </Box>
    </>
  )
}

export default Navbar
