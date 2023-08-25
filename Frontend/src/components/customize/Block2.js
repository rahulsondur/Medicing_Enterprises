import { Close } from '@mui/icons-material'
import { Box, Button, Typography, styled } from '@mui/material'
import React from 'react'

const Block2 = ({setClose}) => {

    const Input  = styled("input")(({theme})=>({
        width:"320px",
        borderRadius:"5px",
        height:"40px",
        paddingLeft:"10px",
       border:'1px solid black'
        
        }))
        const handleClose = () => {
           
            setClose(false)
          }
  return (
    <>
      <Box sx={{padding:'60px',display:'flex',flexDirection:'column',gap:'20px',alignItems:'center'}}>

      <Box sx={{display:'flex',justifyContent:'right',width:'100%'}}>
            <Close onClick={handleClose} sx={{cursor:'pointer'}}/>
        </Box>
         <Box>
            <Typography>Machine Name</Typography>
            <Input type='text' placeholder='Machine Name' />
         </Box>

         <Box>
            <Typography>Machine Number</Typography>
            <Input type='text' placeholder='Machine Number' />
         </Box>

         <Button variant='outlined' sx={{width:'100px'}}> Submit</Button>

      </Box>
    </>
  )
}

export default Block2
