import { createSlice } from "@reduxjs/toolkit";
const initialState = {}

export const LoginSlice = createSlice({
    name:"Login",
    initialState: initialState,
    reducers:{
        setUser:(state:any,action:any)=> action.payload,
        resetUser:()=>initialState ,
    }
})
export const {setUser,resetUser} = LoginSlice.actions;
export default LoginSlice.reducer;