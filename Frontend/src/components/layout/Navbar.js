import { Box, Typography, Avatar, Button } from '@mui/material'
import React from 'react'

const Navbar = ({user,platformToken}) => {
   const handleLogout = async () =>{
      localStorage.removeItem(platformToken)
      window.location.reload("/");
   }
  return (
    <>
     <Box sx={{width:'100%',height:'60px',background:'black',display:'flex',justifyContent:'space-between',alignItems:'center',padding:"0 20px"}}>
          <Typography sx={{color:'whitesmoke',fontSize:'22px',fontWeight:'600'}}>Medicing Enterprises</Typography>
          <Box sx={{display:"flex",alignItems:"center",gap:"20px"}}>
            
            <Button onClick={handleLogout} variant="contained" sx={{fontSize:'12px'}} >
             Logout
          </Button>
          <Avatar sx={{color:"black",fontSize:"27px"}} > {user?.name?.slice(0,1)} </Avatar>
          </Box>

      </Box>
    
    </>
  )
}

export default Navbar
