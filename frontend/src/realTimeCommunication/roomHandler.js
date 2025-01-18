import {
  setActiveRooms,
  setLocalStream,
  setOpenRoom,
  setRoomDetails,
} from '../features/room/roomSlice';

import * as socketConnection from './socketConnection';
// import * as webRTCHandler from './webRTCHandler';
import { store } from './../store';

export const createNewRoom = () => {
  const successCalbackFunc = () => {
    store.dispatch(
      setOpenRoom({ isUserRoomCreator: true, isUserInRoom: true })
    );

    // const audioOnly = store.getState().room.audioOnly;
    // store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
    socketConnection.createNewRoom();
  };
  // webRTCHandler.getLocalStreamPreview(false, successCalbackFunc);

  // const audioOnly = store.getState().room.audioOnly;
  // console.log('create roomm audioOnly', audioOnly);
  // webRTCHandler.getLocalStreamPreview(audioOnly, successCalbackFunc);
};

export const newRoomCreated = (data) => {
  const { roomDetails } = data;
  console.log('newRoomCreat', roomDetails);
  store.dispatch(setRoomDetails({ roomDetails }));
};

export const updateActiveRooms = (data) => {
  const { activeRooms } = data;

  const friends = store.getState().friend.friends;
  const rooms = [];
  const userId = store.getState().user.userDetails?.userDetails?._id;
  // console.log('userId', userId);

  activeRooms.forEach((room) => {
    const isRoomCreatedByMe = room.roomCreator.userId === userId;

    if (isRoomCreatedByMe) {
      rooms.push({ ...room, creatorUsername: 'Me' });
    } else {
      friends.forEach((f) => {
        if (f.id === room.roomCreator.userId) {
          rooms.push({ ...room, creatorUsername: f.username });
        }
      });
    }
  });
  store.dispatch(setActiveRooms({ rooms }));
};

export const joinRoom = (roomId) => {
  const successCalbackFunc = () => {
    store.dispatch(setRoomDetails({ roomId }));
    store.dispatch(
      setOpenRoom({ isUserRoomCreator: false, isUserInRoom: true })
    );
    //     const audioOnly = store.getState().room.audioOnly;
    //     store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
    socketConnection.joinRoom({ roomId });
  };

  // const audioOnly = store.getState().room.audioOnly;
  // webRTCHandler.getLocalStreamPreview(audioOnly, successCalbackFunc);
};

export const leaveRoom = () => {
  console.log('getstate', store.getState().room.roomDetails);
  const roomId = store.getState().room.roomDetails;
  const localStream = store.getState().room.localStream;
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
    store.dispatch(setLocalStream(null));
  }

  //   const screenSharingStream = store.getState().room.screenSharingStream;
  //   if (screenSharingStream) {
  //     screenSharingStream.getTracks().forEach((track) => track.stop());
  //     store.dispatch(setScreenSharingStream(null));
  //   }

  //   store.dispatch(setRemoteStreams([]));
  //   webRTCHandler.closeAllConnections();
  console.log('roomId', roomId);
  socketConnection.leaveRoom({ roomId });
  store.dispatch(setRoomDetails({ roomId: null }));
  store.dispatch(
    setOpenRoom({ isUserRoomCreator: false, isUserInRoom: false })
  );
};
