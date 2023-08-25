import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Dialog, IconButton, Typography, useTheme } from '@mui/material';
import Block1 from '../customize/Block1';
import {Edit,Delete, KeyboardArrowRight, KeyboardArrowLeft} from '@mui/icons-material'
import Block2 from '../customize/Block2';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import PropTypes from 'prop-types';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';




function TablePaginationActions(props) {
  
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml:6}}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(id,machineName,machineNumber,state,edit) {
  return { id,machineName,machineNumber,state,edit };
}

const rows = [
  createData(1, 'Machine A',101, 'Review', ),
  createData(2,'Machine B',102, 'Completed',),
  createData(3, 'Machine C',103, 'Review',),
  createData(4, 'Machine A', 104, 'Completed',),
  createData(6, 'Machine B', 105, 'Review',),
  createData(7, 'Machine B', 105, 'Review',),
  createData(8, 'Machine B', 105, 'Review',),
  createData(9, 'Machine B', 105, 'Review',),
  createData(10, 'Machine B', 105, 'Review',),
].sort((a, b) => (a.machineName < b.machineName ? -1 : 1));

export default function AdminTable(props) {


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }
  const [open,setOpen] = React.useState(false)
  const [close,setClose] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleOpenDialog = () => {
    setClose(true)
  }

  const handleClose = () => {
    setOpen(false)
    setClose(false)
  }
  return (

    <>

    <Box sx={{width:'100%',height:'70px',display:'flex',justifyContent:'space-between'}}>
      <Box sx={{width:'20%',height:'70px',display:'flex',justifyContent:'center',alignItems:'center'}}>
       <Typography sx={{fontSize:'25px',fontWeight:'600'}}>Table List</Typography>
      </Box>
      <Box sx={{width:'20%',height:'70px',display:'flex',justifyContent:'center',alignItems:'center'}}>
       <Button onClick={handleOpen} variant='contained'>Change</Button>
       <Dialog open={open} onClose={handleClose}>
          <Block1 setOpen={setOpen}/>
       </Dialog>
      </Box>
    </Box>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Id</TableCell>
            <TableCell align="center">Machine Name</TableCell>
            <TableCell align="center">Machine Number</TableCell>
            <TableCell align="center">State</TableCell>
            <TableCell align="center">Edit</TableCell>
          </TableRow>
        </TableHead>


        <TableBody>
        {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow
              key={row.id}
              sx={{  }}
            >
              <TableCell align="center" component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.machineName}</TableCell>
              <TableCell align="center">{row.machineNumber}</TableCell>
              <TableCell align="center">{row.state}</TableCell>
              <TableCell align="center" sx={{display:'flex',justifyContent:'center',gap:'10px'}}>
                <Box>
                <Edit onClick={handleOpenDialog} sx={{cursor:'pointer'}}/> 
                <Dialog open={close} onClose={handleClose}>
                    <Block2 setClose={setClose}/>
                </Dialog>
                </Box>
                <Delete sx={{cursor:'pointer'}}/>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter >
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={0}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
             
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </>
  );
}