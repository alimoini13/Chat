import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@mui/system';

import FriendsSidebar from './FriendsSidebar/FriendsSidebar';
import { logout } from '../shared/utils/auth';
import { connectWithSocketServer } from '../realTimeCommunication/socketConnection';
import Sidebar from './Sidebar/Sidebar';
import Messenger from './Messenger/Messenger';
import AppBar from './AppBar/AppBar';

import Room from './Room/Room';

const Dashboard = () => {
  const { isUserInRoom } = useSelector((state) => state.room);

  const Wrapper = styled('div')({
    width: '100%',
    height: '100vh',
    display: 'flex',
  });

  useEffect(() => {
    const userDetails = localStorage.getItem('user');

    if (!userDetails) {
      logout();
    } else {
      // setUserDetails(JSON.parse(userDetails));

      connectWithSocketServer(JSON.parse(userDetails));
    }
  }, []);

  return (
    <Wrapper>
    
       <Sidebar />
      <FriendsSidebar />
      <Messenger />
      <AppBar />
      {isUserInRoom && <Room />} 
    </Wrapper>
  );
};

export default Dashboard;