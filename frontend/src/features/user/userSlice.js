import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register } from '../../api';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ mail, password }) => {
    const response = await login({ mail, password });
    console.log(response, 'response');
    if (response.error) {
      throw Error(response.exception.response.data);
    }
    return response.data;
  }
);
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ username, mail, password }) => {
    const response = await register({ username, mail, password });
    if (response.error) {
      throw Error(response.exception.response.data);
    }
    return response.data;
  }
);
const initialState = { error: null, userDetails: null };
const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.userDetails = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = true;
        state.userDetails = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.userDetails = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.error = null;
        state.userDetails = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        if (action.error.message) {
          state.error = action.error.message;
        }
        state.userDetails = null;
      });
  },
});
export default userSlice.reducer;
