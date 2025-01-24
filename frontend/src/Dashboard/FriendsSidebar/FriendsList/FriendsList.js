import React from 'react';
import { styled } from '@mui/system';
import FriendsListItem from './FriendsListItem';
import { useSelector } from 'react-redux';

const MainContainer = styled('div')({
  flexGrow: 1,
  width: '100%',
});

const checkOnlineUsers = (friends = [], onlineUsers = []) => {
  const updatedFriends = friends.map((f) => {
    const isUserOnline = onlineUsers.find((user) => user.userId === f.id);

    // Return a new object with the isOnline property
    return {
      ...f,
      isOnline: !!isUserOnline, // true if online, false otherwise
    };
  });

  return updatedFriends;
};

const FriendsList = () => {
  const { friends, onlineUsers } = useSelector((state) => state.friend);

  return (
    <MainContainer>
      {checkOnlineUsers(friends, onlineUsers).map((f) => (
        <FriendsListItem
          username={f.username}
          id={f.id}
          key={f.id}
          isOnline={f.isOnline}
        />
      ))}
    </MainContainer>
  );
};

export default FriendsList;
