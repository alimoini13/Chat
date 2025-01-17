import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUserInRoom: false,
  isUserRoomCreator: false,
  roomDetails: null,
  activeRooms: [],
  localStream: null,
  remoteStreams: [],
  audioOnly: false,
  screenSharingStream: null,
  isScreenSharingActive: false,
  isUserJoinedWithOnlyAudio: false,
};
const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setOpenRoom: (state, action) => {
      state.isUserRoomCreator = action.payload.isUserRoomCreator;
      state.isUserInRoom = action.payload.isUserInRoom;
    },
    setRoomDetails: (state, action) => {
      console.log('setRoomDetails', action.payload);
      state.roomDetails = action.payload.roomId;
    },
    setActiveRooms: (state, action) => {
      state.activeRooms = [...action.payload.rooms];
    },
    setLocalStream: (state, action) => {
      console.log('setLocalStream payload', action.payload);
      state.localStream = action.payload;
    },
    setRemoteStreams: (state, action) => {},
    setAudioOnly: (state, action) => {
      console.log('setAudioOnly', action.payload);
      state.audioOnly = action.payload;
    },
    setScreenShareStream: (state, action) => {},
  },
});
export const {
  setOpenRoom,
  setRoomDetails,
  setActiveRooms,
  setLocalStream,
  setRemoteStreams,
  setAudioOnly,
  setScreenShareStream,
} = roomSlice.actions;
export default roomSlice.reducer;
