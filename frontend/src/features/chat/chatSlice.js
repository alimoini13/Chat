import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {} from './../../api';

const chatType = {
  DIRECT: 'DIRECT',
  GROUP: 'GROUP',
};
const initialState = {
  chosenChatDetails: null,
  chatType: null,
  messages: [],
};
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChosenChatDetails: (state, action) => {
      state.chatType = action.payload.chatTypes;
      state.chosenChatDetails = {
        id: action.payload.id,
        name: action.payload.name,
      };
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});
export const { setChosenChatDetails, setMessages } = chatSlice.actions;
export default chatSlice.reducer;
