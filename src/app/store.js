import { configureStore } from '@reduxjs/toolkit';
import snackbarReducer from '../features/SnackBar/snackbarSlice';
import userReducer from '../features/User/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    snackbar: snackbarReducer
  },
});
