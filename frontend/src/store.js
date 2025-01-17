import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice.js';
import alertReducer from './features/alert/alertSlice';
import friendReducer from './features/friend/friendSlice';
import chatReducer from './features/chat/chatSlice';
import roomReducer from './features/room/roomSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
    friend: friendReducer,
    chat: chatReducer,
    room: roomReducer,
  },
});
