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

const userTypeObj = ["User","Client","Operator", "Admin"]

export default function UserUpdate({userUpdateOpen,setUserUpdateOpen,fetchUsers, handleUpdateData}) {
    const [result,setResult] = useState(null);
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    const handleUserUpdateClose = () => {
        setUserUpdateOpen(false);
      };

    const  handlUserUpdateSuccess = () =>{
        enqueueSnackbar(t('Machine was Created successfully'), {
            variant: 'success',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right'
            },
            TransitionComponent: Zoom
          });
      
          handleUserUpdateClose();
    }

  return (
    <div>
 <Dialog
        fullWidth
        maxWidth="md"
        open={userUpdateOpen}
        onClose={handleUserUpdateClose}
      >
       
        <Formik
          initialValues={{
            name:handleUpdateData?.name,
            phone:handleUpdateData?.phone,
            email:handleUpdateData?.email,
            userType:handleUpdateData?.userType,
            submit: null
          }}
          validationSchema={Yup.object().shape({
          
          })}

          onSubmit={async (
            _values,
            { resetForm, setErrors, setStatus, setSubmitting }
          ) => {
            try {
              const {name,phone,email,userType} = _values;
              const data = {name,phone,email,userType}
              const result = await userApi.update(handleUpdateData?.id,data);
                if(result.status==='SUCCESS')
                {
             fetchUsers();
         
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              handlUserUpdateSuccess();
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
                        <Autocomplete
                          disablePortal
                          onChange={(event, value) => value&&(values.userType=value.value)} 
                          options={USER_TYPE}
                          getOptionLabel={(option) => option.name}
                         
                          renderInput={(params) => (
                            <TextField
                              fullWidth
                              {...params}
                              label={userTypeObj[values.userType-1]}
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
                <Button color="secondary" onClick={handleUserUpdateClose}>
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
                  {t('Update User')}
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>

    </div>
  )
}
