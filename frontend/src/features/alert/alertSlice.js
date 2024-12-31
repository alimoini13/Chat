import { createSlice } from '@reduxjs/toolkit';

const initialState = { showAlertMessage: false, alertMessageContent: null };
const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    openAlertMessage: (state, action) => {
      console.log(action);
      state.showAlertMessage = true;
      state.alertMessageContent = action.payload;
    },
    closeAlertMessage: (state, action) => {
      state.showAlertMessage = false;
      state.alertMessageContent = null;
    },
  },
});
export const { openAlertMessage, closeAlertMessage } = alertSlice.actions;
export default alertSlice.reducer;
