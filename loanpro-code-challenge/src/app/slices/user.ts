import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  balance: number | null;
  username: string,
  authToken: string | null
}

const initialState: UserState = {
  balance: null,
  username: "",
  authToken: ""
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload
    },
    clearAuthToken: (state) => {
      state.authToken = null
    }
  },
});

export const { setBalance, setUsername, setAuthToken, clearAuthToken } = userSlice.actions;

export default userSlice.reducer;