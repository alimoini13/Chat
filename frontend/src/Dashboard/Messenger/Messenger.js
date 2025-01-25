import React from 'react';
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';
import MessengerContent from './MessengerContent';
import WelcomMessage from './WelcomMessage';

const MainContainer = styled('div')({
  flexGrow: 1,
  backgroundColor: '#36393f',
  marginTop: '48px',
  display: 'flex',
});

const Messenger = () => {
  const { chosenChatDetails } = useSelector((state) => state.chat);

  return (
    <MainContainer>
      {chosenChatDetails ? (
        <MessengerContent choseChatDetails={chosenChatDetails} />
      ) : (
        <WelcomMessage />
      )}
    </MainContainer>
  );
};

export default Messenger;
