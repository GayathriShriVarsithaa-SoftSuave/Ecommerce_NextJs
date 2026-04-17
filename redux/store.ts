"use client"
import {configureStore} from "@reduxjs/toolkit";
import cartitemReducer from "../redux/features/cartSlice"
export const store=configureStore({
    reducer:{
        cartitem:cartitemReducer
    },
});
export type RootState = ReturnType<typeof store.getState>;