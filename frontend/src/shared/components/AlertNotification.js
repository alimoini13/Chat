import React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { closeAlertMessage } from '../../features/alert/alertSlice';
const AlertNotification = () => {
  const dispatch = useDispatch();
  const { showAlertMessage, alertMessageContent } = useSelector(
    (state) => state.alert
  );

  const handleClose = () => {
    dispatch(closeAlertMessage());
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={showAlertMessage}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert severity="info">{alertMessageContent}</Alert>
    </Snackbar>
  );
};

export default AlertNotification;
