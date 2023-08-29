import { SyntheticEvent, useState, useEffect, ReactElement, Ref, forwardRef } from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';
import {Link} from "react-router-dom"

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
  TableSortLabel,
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
import CloseIcon from '@mui/icons-material/Close';
import ClearIcon from '@mui/icons-material/Clear';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import EditIcon from '@mui/icons-material/Edit';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone';
import TableRowsTwoToneIcon from '@mui/icons-material/TableRowsTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useSnackbar } from 'notistack'; 
import dayjs from "dayjs";
import TableSkeleton from '../../../../components/skeleton/TableSkeleton';
import GridSkeleton from '../../../../components/skeleton/GridSkeleton';
import {userApi} from '../../../../mocks/user/users';
import {machinesApi} from '../../../../mocks/user/machines';
import Navbar from "../../../../components/layout/Navbar"
import {UserAuth} from "../../../../components/Authenticated/UserAuth"
import { PLATFORM_TOKEN } from '../../../../config/constants';


const DialogWrapper = styled(Dialog)(
  () => `
      .MuiDialog-paper {
        overflow: visible;
      }
`
);

const AvatarError = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.error.lighter};
      color: ${theme.colors.error.main};
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(45)};
      }
`
);

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

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

const TabsWrapper = styled(Tabs)(
  ({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px) {
      .MuiTabs-scrollableX {
        overflow-x: auto !important;
      }

      .MuiTabs-indicator {
          box-shadow: none;
      }
    }
    `
);

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});





const Results = ({ users,setUsers, setUsersPaginator, usersPaginator }) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [skeletonOpen,setskeletonOpen] = useState(true);
  const [result,setResult] = useState(null);
  
//  1. Bydefault and actions apply query,filter,page,limit
const [page, setPage] = useState(0);
const [limit, setLimit] = useState(10);
const [query, setQuery] = useState('');
const [filters, setFilters] = useState({});
const [sort,setSort] = useState({createdAt:-1});
const [machines,setMachines] = useState([]);
const [machinesPaginator, setMachinePaginator] = useState({});
const [user,setUser] = useState({});

const getUser = async () =>{
   const result = await userApi.me();
   if(result.status==='SUCCESS')
    setUser(result.data)
  else 
  setUser({})
}
useEffect(() =>{
     getUser();  
},[])

const fetchMachines = async () =>{
  setskeletonOpen(true);
   const result = await machinesApi.list(page+1,limit,filters,sort);
   if(result.status=="SUCCESS"){
    setMachines(result.data.data);
    setMachinePaginator(result.data.paginator)
   } else{
    setMachines([]);
    setMachinePaginator({})
   }
    setskeletonOpen(false)
}

useEffect (()=>{
   
    setPage(0);
    setLimit(10);
    fetchMachines();

},[filters,sort]); 

useEffect (()=>{
  fetchMachines();

},[page,limit]); 



// 2. table sorting function 

const [direction,setDirection] = useState("asc");
const handleTableSort = async (field)=>{
  try {
    let response;
    if(direction==="asc"){
      setDirection("dsc");
      setSort({[field]:1});
    }
    else{
      setDirection("asc");
      setSort({[field]:-1});
    }
  
  } catch (err) {
    console.error(err);
  } 
} 


 

 

  // 5. initialize tab value and set tab change function
  const tabs = [
    {
      value: 0,
      label: t('Machines')
    }
  ];


  const handleTabsChange = (_event, tabsValue) => {
    if (tabsValue !== 0) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        userType: tabsValue
      }));
    } else {
      delete filters.userType
      setFilters({...filters})
    }


  };

// 6. query change function
  const handleQueryChange = (event) => {
    if(event.target){
      setQuery(event.target.value);
      setFilters({...filters,name:{"$regex":query,"$options":"i"}})
  } else {
    setQuery(event);
    delete filters["name"]
    setFilters({...filters})
  }
  };


 // 8. page change function
  const handlePageChange = async (_event, newPage) => {
    setPage(newPage)
  };

  // 9. limit change function
  const handleLimitChange = async (event) => {
    setLimit(parseInt(event.target.value));
  };

 // 10. change view(grid or table) function
  const [toggleView, setToggleView] = useState('table_view');
  const handleViewOrientation = (_event, newValue) => {
    setToggleView(newValue);
  };

 

  return (
    <>
    <UserAuth>
   
    <Navbar user={user} platformToken={PLATFORM_TOKEN.USERAPP}/>
      <Box
        display="flex"
        alignItems="center"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent={{ xs: 'center', sm: 'space-between' }}
        pb={3}
        sx={{margin:"20px 15px 0"}}
      >
        <TabsWrapper
          onChange={handleTabsChange}
          scrollButtons="auto"
          textColor="secondary"
          value={filters.userType || 0}
          variant="scrollable"
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </TabsWrapper>
      
       
      </Box>
      {toggleView === 'table_view' && (
        <Card sx={{margin:"0px 20px 0px"}}>
          <Box p={2}>
          
            <Box sx={{position:'relative'}}>  <TextField
                sx={{
                  m: 0
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchTwoToneIcon />
                    </InputAdornment>
                  )
                }}
                onChange={handleQueryChange}
                placeholder={t('Search by name, email and phone ...')}
                value={query}
                size="small"
                fullWidth
                margin="normal"
                variant="outlined"
              />
               { query!=='' && <Tooltip onClick={() => handleQueryChange("")} ><ClearIcon  sx={{position:'absolute',right:'10px',top:'20%',cursor:'pointer'}}  /></Tooltip>}
              </Box> 
          
          
          </Box>

          <Divider />

          {machines.length === 0 ? (
             <>
           
             <Typography sx={{textAlign:"center",padding:"30px",margin:"40px",fontSize:"20px",fontWeight:"600"}}>Record Not found In this criteria</Typography>
                    
         </>
          ) : (
            <>
                { skeletonOpen ?  <TableSkeleton paginatedUsers={machines} />
            :  <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                     
                      
                      <TableCell >
                      <TableSortLabel active={true} 
                      direction={direction}
                      onClick={()=>handleTableSort('name')}
                      >
                        {t('Machine')}
                        </TableSortLabel>
                        </TableCell>
                        <TableCell align='center' >{t('Number')}</TableCell>
                        <TableCell align="center">
                      <TableSortLabel active={true} 
                      direction={direction}
                      onClick={()=>handleTableSort('status')}
                      >
                        {t('Status')}
                        </TableSortLabel>
                        </TableCell>
                        <TableCell align='center'>{t('CreatedAt')}</TableCell>
                      
                     
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {machines.map((machine,index) => {
                      return (
                        <TableRow hover key={machine.id} >
                        
                          <TableCell >
                           {machine?.name}
                          </TableCell>
                          <TableCell align='center'>
                            {machine?.number}
                          </TableCell>
                          <TableCell align="center">
                           {machine?.status}
                          </TableCell>
                          
                          <TableCell align='center'>
                          <Typography fontWeight="bold">
                              {machine.createdAt?dayjs(machine.createdAt).format('DD-MM-YYYY'):'null'}
                            </Typography>
                            </TableCell>

                           
                       
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
}
              <Box p={2}>
                <TablePagination
                  component="div"
                  count={machinesPaginator.itemCount}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleLimitChange}
                  page={page}
                  rowsPerPage={limit}
                  rowsPerPageOptions={[5, 10, 15]}
                />
              </Box>
            </>
          )}
        </Card>
      )}
    
      {!toggleView && (
        <Card
          sx={{
            textAlign: 'center',
            p: 3
          }}
        >
          <Typography
            align="center"
            variant="h4"
            fontWeight="normal"
            color="text.secondary"
            sx={{
              my: 5
            }}
            gutterBottom
          >
            {t(
              'Choose between table or grid views for displaying the users list.'
            )}
          </Typography>
        </Card>
      )}

</UserAuth>
    </>
  );
};

Results.propTypes = {
  users: PropTypes.array.isRequired
};

Results.defaultProps = {
  users: []
};

export default Results;