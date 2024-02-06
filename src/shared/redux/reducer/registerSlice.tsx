import { createSlice } from "@reduxjs/toolkit";
const initialState = {}

export const RegisterSlice = createSlice({
    name:"Register",
    initialState: initialState,
    reducers:{
        setRegister:(state:any,action:any)=> action.payload,
        resetRegister:()=>initialState ,
    }
})
export const {setRegister,resetRegister} = RegisterSlice.actions;
export default RegisterSlice.reducer;