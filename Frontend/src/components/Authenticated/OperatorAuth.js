import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Slide } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {userApi} from "../../mocks/operator/users";

export const OperatorAuth = (props) => {
  const { children } = props;
  const navigate = useNavigate()
  const [verified, setVerified] = useState(false);
  const { enqueueSnackbar } = useSnackbar();


  const isAuthenticated = async () =>{

    const result = await userApi.me();
     if(result.status==='SUCCESS'){
      setVerified(true);

      enqueueSnackbar('You are successfully authenticated!', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        autoHideDuration: 2000,
        TransitionComponent: Slide
      });
     }
    else 
    navigate('/userapp/auth/login');
  }



  useEffect(() => {
    isAuthenticated();
  }, []);

  if (!verified) {
    return null;
  }

  return <>{children}</>;
};

OperatorAuth.propTypes = {
  children: PropTypes.node
};
