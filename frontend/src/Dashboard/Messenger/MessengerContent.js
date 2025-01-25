import { styled } from '@mui/system';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Messages from './Messages/Messages';
import NewMessageInput from './NewMessageInput';
import { getDirectChatHistory } from './../../realTimeCommunication/socketConnection';

const Wrapper = styled('div')({
  flexGrow: 1,
});
const MessengerContent = () => {
  const { chosenChatDetails } = useSelector((state) => state.chat);

  useEffect(() => {
    getDirectChatHistory({
      receiverUserId: chosenChatDetails.id,
    });
  }, [chosenChatDetails]);

  return (
    <Wrapper>
      <Messages />
      <NewMessageInput />
    </Wrapper>
  );
};

export default MessengerContent;
