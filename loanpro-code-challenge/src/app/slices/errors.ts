import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorState {
  loginError: string | null;
  operationError: string | null;
  operationRecordsError: string | null;
}

const initialState: ErrorState = {
  loginError: null,
  operationError: null,
  operationRecordsError: null
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setLoginError: (state, action: PayloadAction<string>) => {
      state.loginError = action.payload;
    },
    clearLoginError: (state) => {
      state.loginError = null;
    },
    setOperationError: (state, action: PayloadAction<string>) => {
      state.operationError = action.payload;
    },
    clearOperationError: (state) => {
      state.operationError = null;
    },
    setOperationRecordsError: (state, action: PayloadAction<string>) => {
      state.operationRecordsError = action.payload.toString()
    },
    clearOperationRecordsError: (state) => {
      state.operationRecordsError = null
    }
  },
});

export const {
  setLoginError,
  clearLoginError,
  setOperationError,
  clearOperationError,
  setOperationRecordsError,
  clearOperationRecordsError
} = errorSlice.actions;

export default errorSlice.reducer;