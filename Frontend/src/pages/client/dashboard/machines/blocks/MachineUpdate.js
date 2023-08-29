import { SyntheticEvent, useState,useEffect ,ReactElement, Ref, forwardRef } from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import {machinesApi} from "../../../../../mocks/client/machines"
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
import { MACHINE_STATUS } from '../../../../../config/constants';

export default function MachineUpdate({machineUpdateOpen,setMachineUpdateOpen,fetchMachines,handleUpdateData}) {
    const [result,setResult] = useState(null);
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    const handleMachineUpdateClose = () => {
        setMachineUpdateOpen(false);
      };

    const  handleMachineUpdateSuccess = () =>{
        enqueueSnackbar(t('Machine was Updated successfully'), {
            variant: 'success',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right'
            },
            TransitionComponent: Zoom
          });
      
          handleMachineUpdateClose();
    }

  return (
    <div>
 <Dialog
        fullWidth
        maxWidth="md"
        open={machineUpdateOpen}
        onClose={handleMachineUpdateClose}
      >
       
        <Formik
          initialValues={{
            name:handleUpdateData?.name,
            number:handleUpdateData?.number,
            status:handleUpdateData?.status,
            submit: null
          }}
          validationSchema={Yup.object().shape({
          
          })}

          onSubmit={async (
            _values,
            { resetForm, setErrors, setStatus, setSubmitting }
          ) => {
            try {
              const {name,number,status} = _values;
              const data = {name,number,status}
              const result = await machinesApi.update(handleUpdateData?.id,data);
                if(result.status==='SUCCESS')
                {
             fetchMachines();
         
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              handleMachineUpdateSuccess();
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
                  <Grid item xs={12} lg={7}>
                    <Grid container spacing={3}>
                    <Grid item xs={12}>
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
                          error={Boolean(
                            touched.number && errors.number
                          )}
                          fullWidth
                          helperText={touched.number && errors.number}
                          label={t('Number')}
                          name="number"
                          type='number'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.number}
                          variant="outlined"
                        />
                      </Grid>

                   

                      
                  
                      <Grid item xs={12} md={6}>
                        <Autocomplete
                          disablePortal
                          onChange={(event, value) => value&&(values.status=value)} 
                          options={MACHINE_STATUS}
                          getOptionLabel={(option) => option}
                          defaultValue={handleUpdateData?.status}
                          renderInput={(params) => (
                            <TextField
                              fullWidth
                              {...params}
                              label={t('Status')}
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
                <Button color="secondary" onClick={handleMachineUpdateClose}>
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
                  {t('Update Machine')}
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>

    </div>
  )
}
