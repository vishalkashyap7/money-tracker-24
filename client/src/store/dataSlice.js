import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setEntries(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setEntries } = dataSlice.actions;
export default dataSlice.reducer;
