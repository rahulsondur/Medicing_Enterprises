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
  

export default function TableSkeleton({paginatedUsers}) {
  return (
    <TableContainer >
      <Table >
      <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                      <Skeleton variant="rectangular" width={20} height={20} animation='wave' />
                      </TableCell>
                     
                      <TableCell>
                      <Skeleton variant='text' width={100} height={40} animation='wave'  />
                        </TableCell>
                       
                    <TableCell>
                    <Skeleton variant='text' width={130} height={40} animation='wave'  />
                        </TableCell>    
                        
                        <TableCell>
                        <Skeleton animation='wave' variant="text" width={100} height={40} />
                        </TableCell> 
                   
                        
                         
                        <TableCell>
                        <TableCell>  <Skeleton animation='wave' variant="text" width={60} height={40} /></TableCell>
                        </TableCell> 
                      <TableCell > <TableCell>  <Skeleton animation='wave' variant="text" width={50} height={40} /></TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedUsers.length>0 && paginatedUsers.map((user,index) => {
                    
                      return (
                        <TableRow hover key={user.id} >
                          <TableCell padding="checkbox">
                          <Skeleton variant="rectangular" width={20} height={20} animation='wave' />
                          </TableCell>
                        
                          <TableCell>
                            <Box display="flex" flexDirection='row' gap='10px'  >
                            <Skeleton variant="circular" width={40} height={40} animation='wave' />
                              <Box>
                                <Typography >
                                   <Skeleton variant='text' width={130} height={20} animation='wave'  />
                                </Typography>
                                <Typography noWrap variant="subtitle2">
                                <Skeleton variant='text' width={100} height={20} animation='wave'  />
                                </Typography>
                               
                              </Box>
                            </Box>
                          </TableCell>
                         
                        
                          <TableCell>
                            <Typography>    <Skeleton variant='text' width={130} height={20} animation='wave'  /></Typography>
                          </TableCell>
                        
                          <TableCell>
                            <Typography>  <Skeleton animation='wave' variant="text" width={100} height={20} /></Typography>
                          </TableCell>
                        
                          <TableCell>  <Skeleton animation='wave' variant="text" width={50} height={20} /></TableCell>
                          <TableCell align="center">
                            <Typography noWrap>
                              <Tooltip  arrow>
                                <IconButton
                                  
                                  color="primary"
                                >
                                <Skeleton variant="rectangular" width={60} height={20} animation='wave' />
                                </IconButton>
                              </Tooltip>
                            
                            </Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                  </Table>
                  </TableContainer>
  )
}
