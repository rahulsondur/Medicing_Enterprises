import React from 'react';
import {
    Avatar,
    CircularProgress,
    Box,
    Skeleton,
    Card,
    Checkbox,
    DialogContent,
    Autocomplete,
    DialogActions,
    Backdrop,
    Grid,
    Slide,
    Divider,
    Tooltip,
    IconButton,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableSortLabel,
    TableHead,
    TablePagination,
    TableContainer,
    TableRow,
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

  const CardWrapper = styled(Card)(
    ({ theme }) => `
  
    position: relative;
    overflow: visible;
  
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      border-radius: inherit;
      z-index: 1;
      transition: ${theme.transitions.create(['box-shadow'])};
    }
        
      &.Mui-selected::after {
        box-shadow: 0 0 0 3px ${theme.colors.primary.main};
      }
    `
  );

 
export default function GridSkeleton({ paginatedUsers}) {
    
    return (
  <Grid container spacing={3}>
    {paginatedUsers.map((user,index) => {
  return (
    <Grid item xs={12} sm={6} md={4} key={user.id}>
    <CardWrapper
      
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: '2'
        }}
      >
        <Box
          px={2}
          pt={2}
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
        >
         <Skeleton variant="text" width={60} height={20} animation='wave' />
         
          <Typography noWrap>
            <Tooltip  arrow>
              <IconButton
                
                color="primary"
              >
                <Skeleton variant="rectangular" width={20} height={20} animation='wave' />
              </IconButton>
            </Tooltip>
            <Tooltip  arrow>
              <IconButton
                
                color="primary"
              >
                 <Skeleton variant="rectangular" width={20} height={20} animation='wave' />
              </IconButton>
            </Tooltip>
          </Typography>
       
        </Box>
        <Box p={2} display="flex" alignItems="flex-start">
       
          <Box display='flex' alignItems='center' gap='20px' >
            <Box>
            <Skeleton variant="circular" width={40} height={40} animation='wave' />
            </Box>
            <Box >
            <Typography
              sx={{
                pt: 0.3
              }}
              variant="subtitle2"
            >
            <Skeleton variant="text" width={100} height={20} animation='wave' />
            </Typography>
            <Typography
              sx={{
                pt: 1
              }}
              variant="h6"
            >
            <Skeleton variant="text" width={150} height={20} animation='wave' />
            </Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box
          pl={2}
          py={1}
          pr={1}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography>
          <Skeleton variant="text" width={100} height={20} animation='wave' />
          </Typography>
          <Skeleton variant="rectangular" width={20} height={20} animation='wave' />
        </Box>
      </Box>
    </CardWrapper>
  </Grid>
  )})}
  </Grid>
 )
}
