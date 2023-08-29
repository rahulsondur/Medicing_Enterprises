import { SyntheticEvent, useState,useEffect ,ReactElement, Ref, forwardRef } from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import {userApi} from "../../../../../mocks/admin/users"
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

import PropTypes from 'prop-types';
import {
  Avatar,
  CircularProgress,
  Box,
  Card,
  Checkbox,
  DialogContent,
  Autocomplete,
  Switch,
  DialogActions,
  Grid,
  Slide,
  Divider,
  Tooltip,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableContainer,
  TableRow,
  TableSortLabel,
  ToggleButton,
  ToggleButtonGroup,
  Tab,
  Tabs,
  TextField,
  Button,
  Typography,
  Dialog,
  Zoom,
  styled
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { MACHINE_STATUS, USER_TYPE } from '../../../../../config/constants';

export default function UserCreate({userCreateOpen,setUserCreateOpen,fetchUsers}) {
    const [result,setResult] = useState(null);
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    const handleUserCreateClose = () => {
        setUserCreateOpen(false);
      };

    const  handlUserCreateSuccess = () =>{
        enqueueSnackbar(t('Machine was Created successfully'), {
            variant: 'success',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right'
            },
            TransitionComponent: Zoom
          });
      
          handleUserCreateClose();
    }

  return (
    <div>
 <Dialog
        fullWidth
        maxWidth="md"
        open={userCreateOpen}
        onClose={handleUserCreateClose}
      >
       
        <Formik
          initialValues={{
            name:'',
            phone:null,
            email:'',
            password:'',
            userType:"",
            submit: null
          }}
          validationSchema={Yup.object().shape({
          
          })}

          onSubmit={async (
            _values,
            { resetForm, setErrors, setStatus, setSubmitting }
          ) => {
            try {
              const {name,phone,email,password,userType} = _values;
              const data = {name,phone,email,password,userType}
              const result = await userApi.create(data);
                if(result.status==='SUCCESS')
                {
             fetchUsers();
         
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              handlUserCreateSuccess();
              setResult(null)
                } else{
                    setResult(result);
                }
            } catch (err) {
              console.error(err);
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent
                dividers
                sx={{
                  p: 3
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} lg={12}>
                    <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(touched.name && errors.name)}
                          fullWidth
                          helperText={touched.name && errors.name}
                          label={t('Name')}
                          name="name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.name}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(touched.email && errors.email)}
                          fullWidth
                          helperText={touched.email && errors.email}
                          label={t('Email')}
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                          variant="outlined"
                        />
                      </Grid>
                
                     
                      <Grid item xs={12}  md={6}>
                        <TextField
                          error={Boolean(
                            touched.phone && errors.phone
                          )}
                          fullWidth
                          helperText={touched.phone && errors.phone}
                          label={t('Phone')}
                          name="phone"
                          type='number'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.phone}
                          variant="outlined"
                        />
                      </Grid>

                   
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(touched.password && errors.password)}
                          fullWidth
                          helperText={touched.password && errors.password}
                          label={t('password')}
                          name="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.password}
                          variant="outlined"
                        />
                      </Grid>
                      
                  
                      <Grid item xs={12} md={6}>
                        <Autocomplete
                          disablePortal
                          onChange={(event, value) => value&&(values.userType=value.value)} 
                          options={USER_TYPE}
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => (
                            <TextField
                              fullWidth
                              {...params}
                              label={t('Select User Type')}
                            />
                          )}                         
                          />
                      </Grid>
                      
                    </Grid>
                  </Grid>
                
                </Grid>
              </DialogContent>
              <DialogActions
                sx={{
                  p: 3
                }}
              >
                <Button color="secondary" onClick={handleUserCreateClose}>
                  {t('Cancel')}
                </Button>
                <Button
                  type="submit"
                  startIcon={
                    isSubmitting ? <CircularProgress size="1rem" /> : null
                  }
                  disabled={Boolean(errors.submit) || isSubmitting}
                  variant="contained"
                >
                  {t('Create User')}
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>

    </div>
  )
}
