import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import errorReducer from './slices/errors'
import userReducer from './slices/user'
import operationsReducer from './slices/operations'

export const store = configureStore({
  reducer: {
    errors: errorReducer,
    user: userReducer,
    operations: operationsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
