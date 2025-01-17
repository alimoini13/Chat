import io from 'socket.io-client';
import {
  setFriends,
  setOnlineUsers,
  setPendingFriendsInvitations,
} from '../features/friend/friendSlice';
import { store } from './../store';
// import { updateDirectChatHistoryIfActive } from './../shared/utils/chat';
// import { newRoomCreated, updateActiveRooms } from './roomHandler';
let socket = null;
export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.userDetails.token;

  const SOCKET_URL =
    window.location.host.indexOf('localhost') >= 0
      ? 'http://localhost:5002'
      : window.location.host;
  socket = io(SOCKET_URL, {
    auth: {
      token: jwtToken,
    },
  });
  socket.on('connect', () => {
    console.log('succesfully connected with socket.io server');
    console.log(socket.id);
  });
//   socket.on('friends-invitations', (data) => {
//     const { pendingInvitations } = data;

//     store.dispatch(setPendingFriendsInvitations(pendingInvitations));
//   });

//   socket.on('friends-list', (data) => {
//     const { friends } = data;
//     // console.log('socket connection friends', friends);
//     store.dispatch(setFriends(friends));
//   });
//   socket.on('online-users', (data) => {
//     const { onlineUsers } = data;
//     store.dispatch(setOnlineUsers(onlineUsers));
//   });
//   socket.on('direct-chat-history', (data) => {
//     console.log('direct chat history came from server');
//     console.log(data);
//     updateDirectChatHistoryIfActive(data);
//   });
//   socket.on('room-create', (data) => {
//     newRoomCreated(data);
//   });

//   socket.on('active-rooms', (data) => {
//     updateActiveRooms(data);
//   });
//   socket.on('conn-prepare', (data) => {
//     const { connUserSocketId } = data;
//     console.log('conn-prepare', data);
//     // webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);
//     // socket.emit("conn-init", { connUserSocketId: connUserSocketId });
//   });
// };

// //send to server
// export const sendDirectMessage = (data) => {
//   console.log(data);
//   socket.emit('direct-message', data);
// };
// //send to server
// export const getDirectChatHistory = (data) => {
//   socket.emit('direct-chat-history', data);
// };
// export const createNewRoom = () => {
//   socket.emit('room-create');
// };
// export const joinRoom = (data) => {
//   socket.emit('room-join', data);
// };
// export const leaveRoom = (data) => {
//   socket.emit('room-leave', data);
};
