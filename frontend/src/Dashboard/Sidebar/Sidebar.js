import React from 'react';
import { styled } from '@mui/system';
import MainPageButton from './MainPageButton';
import CreateRoomButton from './CreateRoomButton';
import { useSelector } from 'react-redux';
import ActiveRoomButton from './ActiveRoomButton';
const Sidebar = () => {
  const MainContainer = styled('div')({
    width: '72px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#202225',
  });
  const { activeRooms, isUserInRoom } = useSelector((state) => state.room);
  console.log('sidebar',activeRooms)
  return (
    <MainContainer>
      <MainPageButton />
      <CreateRoomButton />
      {activeRooms.map((room) => (
        <ActiveRoomButton
          roomId={room.roomId}
          creatorUsername={room.creatorUsername}
          amountOfParticipants={room.participants.length}
          key={room.roomId}
          isUserInRoom={isUserInRoom}
        />
      ))}
    </MainContainer>
  );
};

export default Sidebar;
