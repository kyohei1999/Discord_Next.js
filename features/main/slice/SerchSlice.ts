import { createSlice } from '@reduxjs/toolkit';
import { InitialSerchState } from '../types/Type';

const initialState: InitialSerchState = {
  inputValue: '',
  flag: false,
};

export const SerchSlice = createSlice({
  name: 'serch',
  initialState,
  reducers: {
    serch: (state, action) => {
      state.inputValue = action.payload;
      state.flag = true;
    },
    serchCansel: (state) => {
      state.flag = false;
    },
  },
});

export const { serch, serchCansel } = SerchSlice.actions;
export default SerchSlice.reducer;
