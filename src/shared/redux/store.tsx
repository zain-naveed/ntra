import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import calendar from './reducer/calenderSlice'
import Login from './reducer/loginSlice';
import Register from './reducer/registerSlice';
import Guest from './reducer/guest';
const rootReducer = combineReducers({
    calendar:calendar,
    LoginUser:Login,
    RegisterUser:Register,
    Guest:Guest
});
  
  export const store = configureStore({
    reducer: {
      root: rootReducer,
    },
  });