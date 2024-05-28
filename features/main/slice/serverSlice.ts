import { createSlice } from '@reduxjs/toolkit';
import { InitialServersState } from '../types/Type';

const initialState: InitialServersState = {
  serverId: null,
  serverName: null,
};

export const serverSlice = createSlice({
  name: 'server',
  initialState,
  reducers: {
    setServerInfo: (state, action) => {
      state.serverId = action.payload.serverId;
      state.serverName = action.payload.serverName;
    },
    initializeServerInfo: (state, action) => {
      state.serverId = action.payload.serverId;
      state.serverName = action.payload.serverName;
    },
  },
});

export const { setServerInfo, initializeServerInfo } = serverSlice.actions;
export default serverSlice.reducer;
