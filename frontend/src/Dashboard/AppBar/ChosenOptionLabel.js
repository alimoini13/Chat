import { Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const ChosenOptionLabel = () => {
  const { chosenChatDetails } = useSelector((state) => state.chat);

  return (
    <Typography sx={{ fontSize: '16px', color: 'white', fontWeight: 'bold' }}>
      {`${chosenChatDetails?.name ? chosenChatDetails?.name : ''}`}
    </Typography>
  );
};

export default ChosenOptionLabel;
