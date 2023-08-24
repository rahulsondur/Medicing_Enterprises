import { Facebook, Google } from '@mui/icons-material';
import { Backdrop, Box, Button, CircularProgress, Dialog, Popover, TextField, Typography, styled } from '@mui/material'
import { useFormik } from 'formik';

// import { useDispatch, useSelector } from 'react-redux';

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';





const Box1= styled(Box)(({ theme }) => ({
    height:'500px',
    width:'40%',
    backgroundImage: `url(${"https://usplworld-static.s3.ap-south-1.amazonaws.com/static/img/wrogn/products/product_list/WITS1770.jpeg"})`,
    backgroundSize:'cover',
     
     [theme.breakpoints.down('sm')]: {
      height:'200px',
      width:'auto',
      margin:'0px 10px',
      display:'none',
    },
     }
  
   ));

   const initialValues  = {
   
    username:"",
    password:"",
  
 };
const Login = () => {
 const navigate = useNavigate();
//  const dispatch = useDispatch();
//  const user = useSelector((state) => state.user)
 const [open,setOpen]=useState(false);
 const[backdrop,setBackdrop] = useState(false);
  const {values , errors , handleBlur,handleChange,handleSubmit,touched} = useFormik({

    initialValues: initialValues,
    // validationSchema: signupSchema,

    onSubmit : async (values,action) =>{
      setBackdrop(true)
      const { username,  password} = values;
   
      
     
       
      action.resetForm();
   }

    
    
    
  });


  
  
  
  const handleOpen = ()=>{
    setOpen(true);
  };

  const handleClose = ()=>{
    setOpen(false);
  };
  
//   const handleFirstPage = async () => {
//     setBackdrop(true)
//     window.open(`${process.env.NEXT_PUBLIC_HOST}/auth/google`,"_self");
//     if(window.open()){
//       setBackdrop(false)
//     }
//    };

  return (
    <>
      <Box sx={{width:'100%',display:'flex',justifyContent:'center',paddingTop:{xs:'20px',sm:'50px',md:'50px'}}}>
        <Box sx={{width:{xs:'95%',sm:'90%',md:'30%'},height:'500px',border:'1px solid rgba(0,0,0,0.3)',display:'flex',borderRadius:'10px',boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'}}>
          
           <Box sx={{margin:{xs:'10px',sm:'30px',md:'40px'},display:'flex',justifyContent:'center',alignItems:'center',width:{xs:'95%',sm:'100%',md:'100%'},flexDirection:'column',gap:'15px'}}>
                <Typography sx={{fontWeight:'700'}}>LOGIN</Typography>

                <Box sx={{display:'flex',gap:'20px'}}>
                    <Button variant='outlined' sx={{borderRadius:'5px',display:'flex',gap:'5px'}}><Facebook/>Facebook</Button>

                    <Box>
                    <Button  variant='outlined' sx={{borderRadius:'5px',display:'flex',gap:'5px'}}><Google sx={{color:'green'}}/>Google</Button>
                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={backdrop}>
                       <CircularProgress color="inherit" />
                   </Backdrop>
                    </Box>
                </Box>

                <Typography>OR</Typography>


              

                <form onSubmit={handleSubmit} autoComplete="off" style={{width:'100%',display:'flex',flexDirection:'column',gap:'15px'}}>
               

                <Box sx={{width:'100%'}}>
                <TextField variant='outlined' label='E-Mail Id' type='email' name='username' size='small' value={values.username} onChange={handleChange} onBlur={handleBlur} autoFocus='false' sx={{width:'100%',"& fieldset": {borderRadius:'3px'}}}></TextField>
                {errors.username && touched.username ?(
                <Typography sx={{fontSize:'12px',color:'red'}}>{errors.username}</Typography>):null}
                 </Box>

                 <Box sx={{width:'100%'}}>
                <TextField variant='outlined' label='Pasword' type='password' name='password' size='small' value={values.password} onChange={handleChange} onBlur={handleBlur} sx={{width:'100%',"& fieldset": {borderRadius:'3px'}}}></TextField>
                {errors.password && touched.password ?(
                <Typography sx={{fontSize:'12px',color:'red'}}>{errors.password}</Typography>):null}
                 </Box>
               <Box>
                 <Button variant='contained' type='submit' sx={{width:'100%',borderRadius:'3px',}}>SIGN IN </Button>
                 <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={backdrop}>
                  <CircularProgress color="inherit" />
                  </Backdrop>
               </Box>

                 <Box sx={{display:'flex'}}>
                <Typography onClick={()=>navigate('/signup')}  sx={{color:'green',cursor:'pointer'}}>Don't have an account?Register | </Typography>
                <Box>
                <Typography onClick={handleOpen} sx={{color:'green',cursor:'pointer'}}> Forgot Password</Typography>
                <Dialog open={open} onClose={handleClose} 

        
                              >
  
    
   </Dialog>
                </Box>
                 
                 </Box>
              
                </form>
           </Box>
        </Box>
      </Box>
    </>
  )
}

export default Login
