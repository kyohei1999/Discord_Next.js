import { configureStore } from '@reduxjs/toolkit';

import userReucer from './slice/userSlice';
import channelReducer from './slice/channelSlice';
import serchReducer from './slice/SerchSlice';
import serverReducer from './slice/serverSlice';

export const store = configureStore({
  reducer: {
    user: userReucer,
    channel: channelReducer,
    serch: serchReducer,
    server: serverReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
