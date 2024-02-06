import { createSlice } from "@reduxjs/toolkit";
const initialState = ""

export const GuestSlice = createSlice({
    name:"Guest",
    initialState: initialState,
    reducers:{
        setGuest:()=> "Guest",
        resetGuest:()=>initialState ,
    }
})
export const {setGuest,resetGuest} = GuestSlice.actions;
export default GuestSlice.reducer;