import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  acceptInvitation,
  rejectInvitation,
  sendFriendInvitation,
} from './../../api';

export const sendInvitation = createAsyncThunk(
  'friend/sendInvitation',
  async (data) => {
    const response = await sendFriendInvitation(data);
    if (response.error) {
      throw Error(response.exception.response.data);
    }
    return response.data;
  }
);

export const acceptFriendInvitation = createAsyncThunk(
  'friend/acceptInvitation',
  async (data) => {
    const response = await acceptInvitation(data);
    if (response.error) {
      throw Error(response.exception.response.data);
    }
    return response.data;
  }
);
export const rejectFriendInvitation = createAsyncThunk(
  'friend/acceptInvitation',
  async (data) => {
    const response = await rejectInvitation(data);
    if (response.error) {
      throw Error(response.exception.response.data);
    }
    return response.data;
  }
);

const initialState = {
  friends: [],
  pendingFriendsInvitations: [],
  onlineUsers: [],
};
const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
    setPendingFriendsInvitations: (state, action) => {
      state.pendingFriendsInvitations = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});
export const { setPendingFriendsInvitations, setFriends, setOnlineUsers } =
  friendSlice.actions;
export default friendSlice.reducer;
