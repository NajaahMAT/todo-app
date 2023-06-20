import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
  filterStatus: 'all',
  filterDates: {startDate: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000), endDate: new Date()},
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState: initialValue,

  reducers: {
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },

    updateFilterDates: (state, action) => {

      console.log(JSON.stringify(state.filterDates), JSON.stringify(action.payload))
      if (state.filterDates.startDate !== action.payload.startDate || state.filterDates.endDate !== action.payload.endDate){
        state.filterDates = action.payload;
      }
    },
  },
});

export const {  updateFilterStatus, updateFilterDates } =  todoSlice.actions;
export default todoSlice.reducer;
