import * as Yup from 'yup';

import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';

import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Checkbox,
  Typography,
  Zoom,
  Card,
  FormControlLabel,
  CircularProgress
} from '@mui/material';

import {authApi} from "../../../mocks/user/auth"

export default function Login(props) {

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();


  const formik = useFormik({
    initialValues: {
      name:'',
      email:'',
      phone:null,
      password: '',
      terms: true,
      submit: null
    },
    validationSchema: Yup.object({
    
      terms: Yup.boolean().oneOf(
        [true],
        'You must agree to our terms and conditions'
      )
    }),
    onSubmit: async (values, helpers) => {
      try {
        const {name,email,phone,password}  = values;
        const data = {name,email,phone,password}
       const result = await authApi.register(data);
        if (result.status==='SUCCESS') {
          navigate("/userapp/auth/login");
        }
        if (result.status!=='SUCCESS') {
        enqueueSnackbar(`${result.message} `, {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          },
          TransitionComponent: Zoom
        });
      }
      } catch (err) {
        console.error(err);
      
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        
      }
    }
  });

  return (
    <Box sx={{ height:"70vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <Card sx={{width:{md:"30vw",xs:"90vw"}, padding:"40px 20px"}}>
    <form   noValidate onSubmit={formik.handleSubmit} {...props}>
      <TextField
        error={Boolean(formik.touched.name && formik.errors.name)}
        fullWidth
        margin="normal"
        autoFocus
        helperText={formik.touched.name && formik.errors.name}
        label='Name'
        name="name"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.name}
        variant="outlined"
      />
       <TextField
        error={Boolean(formik.touched.email && formik.errors.email)}
        fullWidth
        margin="normal"
        autoFocus
        helperText={formik.touched.email && formik.errors.email}
        label='Email'
        name="email"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.email}
        variant="outlined"
      />
       <TextField
        error={Boolean(formik.touched.phone && formik.errors.phone)}
        fullWidth
        margin="normal"
        autoFocus
        helperText={formik.touched.phone && formik.errors.phone}
        label='phone'
        name="phone"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.phone}
        type='number'
        variant="outlined"
      />
      
      <TextField
        error={Boolean(formik.touched.password && formik.errors.password)}
        fullWidth
        margin="normal"
        helperText={formik.touched.password && formik.errors.password}
        label='Password'
        name="password"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="password"
        value={formik.values.password}
        variant="outlined"
      />
      <Box alignItems="center" display="flex" justifyContent="space-between">
        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.terms}
              name="terms"
              color="primary"
              onChange={formik.handleChange}
            />
          }
          label={
            <>
              <Typography variant="body2">
                'I accept the'{' '}
                <Link to="#">'terms and conditions'</Link>.
              </Typography>
            </>
          }
        />
        <Link to="/userapp/auth/login">
          <b>Sign In</b>
        </Link>
      </Box>

      {Boolean(formik.touched.terms && formik.errors.terms) && (
        <FormHelperText error>{formik.errors.terms}</FormHelperText>
      )}

      <Button
        sx={{
          mt: 3
        }}
        color="primary"
        startIcon={
          formik.isSubmitting ? <CircularProgress size="1rem" /> : null
        }
        disabled={formik.isSubmitting}
        type="submit"
        fullWidth
        size="large"
        variant="contained"
      >
        {'Sign in'}
      </Button>
    </form>
    </Card>
    </Box>
  );
};
