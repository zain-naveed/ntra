import { createSlice } from "@reduxjs/toolkit";

const initState = {};
export const calendarSlice = createSlice({
  name: "Calender",
  initialState: initState,
  reducers: {
    setCalender: (state:any, action:any) => action.payload,

    resetCalender: () => initState,
  },
});

export const { setCalender, resetCalender } = calendarSlice.actions;

export default calendarSlice.reducer;