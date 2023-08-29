import { Facebook, Google } from '@mui/icons-material';
import { Backdrop, Box, Button, CircularProgress, TextField, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
;



   const initialValues  = {
      phone:"",
      name:"",
      email:"",
      password:"",
      date:"",
      sex:"",
   };
const Signup = () => {

  // const [initialDate,setInitialDate] = useState(new moment().toDate());

const navigate = useNavigate();
//   const user = useSelector((state) => state.user)
//   const dispatch= useDispatch();
 const[backdrop,setBackdrop] = useState(false);

 const {values , errors , handleBlur,handleChange,handleSubmit,touched} = useFormik({

    initialValues: initialValues,
    // validationSchema: signupSchema,

    onSubmit : async (values,action) =>{
    //   const {firstName, lastName, email, phone, password, sex, date} = values;
    //   let data = {firstName, lastName, email, phone, password, sex, date}

     
      action.resetForm();
       
       

    }
    
    
  });

//   const handleFirstPage = async () => {
//     setBackdrop(true)
//     window.open(`${process.env.NEXT_PUBLIC_HOST}/auth/google`,"_self");
//     if(window.open()){
//       setBackdrop(false)
//     }
//    };
  
  // console.log(errors)
  return (
    <>
      <Box sx={{width:'100%',display:'flex',justifyContent:'center',padding:{xs:'20px 0px',sm:'50px 0px',md:'50px 0px'}}}>
        <Box sx={{width:{xs:'95%',sm:'90%',md:'30%'},height:'auto',border:'1px solid rgba(0,0,0,0.3)',display:'flex',borderRadius:'10px',boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'}}>
         
          
           <Box  sx={{margin:{xs:'10px',sm:'30px',md:'40px'},display:'flex',justifyContent:'center',alignItems:'center',width:{xs:'95%',sm:'100%',md:'100%'},flexDirection:'column',gap:'15px'}} >

            
                <Typography sx={{fontWeight:'700'}}>SIGN UP</Typography>

                <Box sx={{display:'flex',gap:'20px'}}>
                    <Button variant='outlined' sx={{borderRadius:'5px',display:'flex',gap:'5px'}}><Facebook/>Facebook</Button>
                    <Box>
                    <Button variant='outlined' sx={{borderRadius:'5px',display:'flex',gap:'5px'}}><Google sx={{color:'green'}}/>Google</Button>
                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={backdrop}>
                       <CircularProgress color="inherit" />
                   </Backdrop>
                    </Box>
                </Box>

                <Typography>OR</Typography>

             

            <form onSubmit={handleSubmit} autoComplete="off" style={{width:'100%',display:'flex',flexDirection:'column',gap:'15px'}}>
                <Box  sx={{display:'flex',gap:'20px',width:'100%'}}>

                  <Box sx={{width:'100%'}}>
                <TextField variant='outlined' label='Name' type='text' name='name' size='small' value={values.name} onChange={handleChange} onBlur={handleBlur} sx={{width:'100%',"& fieldset": {borderRadius:'3px'}}}></TextField>
                {errors.firstName && touched.firstName ?(
                <Typography sx={{fontSize:'12px',color:'red'}}>{errors.firstName}</Typography>):null}
                  </Box>

              
                </Box>
                 
                 <Box sx={{width:'100%'}}>
                <TextField variant='outlined' label='E-Mail Id' type='email' name='email' value={values.email} size='small' onChange={handleChange} onBlur={handleBlur} autoFocus='false' sx={{width:'100%',"& fieldset": {borderRadius:'3px'}}}></TextField>
                {errors.email && touched.email ?(
                <Typography sx={{fontSize:'12px',color:'red'}}>{errors.email}</Typography>):null}
                 </Box>

                 <Box sx={{width:'100%'}}>
                <TextField variant='outlined' label='Pasword' type='password' name='password' size='small' value={values.password} onChange={handleChange} onBlur={handleBlur} sx={{width:'100%',"& fieldset": {borderRadius:'3px'}}}></TextField>
                {errors.password && touched.password ?(
                <Typography sx={{fontSize:'12px',color:'red'}}>{errors.password}</Typography>):null}
                 </Box>

                 <Box sx={{width:'100%'}}>
                <TextField variant='outlined' label='Mobile phone' type='number' name='phone' size='small' value={values.phone} onChange={handleChange} onBlur={handleBlur} sx={{width:'100%',"& fieldset": {borderRadius:'3px'}}}></TextField>
                {errors.phone && touched.phone ?(
                <Typography sx={{fontSize:'12px',color:'red'}}>{errors.phone}</Typography>):null}
                 </Box>

                <Box sx={{display:'flex',gap:'20px',width:'100%'}}>
                <Box sx={{width:'100%'}}>
                <TextField variant='outlined'  type='date' name='date' value={values.date} size='small' onChange={handleChange} onBlur={handleBlur} sx={{width:'100%',"& fieldset": {borderRadius:'3px'}}}></TextField>
                {errors.sex && touched.sex ?(
                <Typography sx={{fontSize:'12px',color:'red'}}>{errors.sex}</Typography>):null}
                </Box>

                <Box sx={{width:'100%'}}>
                <TextField variant='outlined' label='Sex' type='text' name='sex' size='small' value={values.sex} onChange={handleChange} onBlur={handleBlur} sx={{width:'100%',"& fieldset": {borderRadius:'3px'}}}></TextField>
                {errors.sex && touched.sex ?(
                <Typography sx={{fontSize:'12px',color:'red'}}>{errors.sex}</Typography>):null}
                </Box>
                </Box>

                <Box>
                 <Button variant='contained' type='submit' sx={{width:'100%',borderRadius:'3px',height:'40px'}}>SIGN UP </Button>
                 <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={backdrop}>
                  <CircularProgress color="inherit" />
                  </Backdrop>
               </Box>
                 
                 <Box sx={{display:'flex',justifyContent:'center'}}>
                <Typography onClick={()=>navigate('/')}  sx={{color:'green',cursor:'pointer'}}>Already have an accounr? Login </Typography>
                 </Box>

                </form>
           </Box>
       
        </Box>
      </Box>
    </>
  )
}

export default Signup
