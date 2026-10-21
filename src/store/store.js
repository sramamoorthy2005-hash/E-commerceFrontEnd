import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../products/productsSlice";
import cartSlice from "../products/cartSlice";
import filter from "../products/filter";


export const store = configureStore({
    reducer:{
        products:productsSlice.reducer,
        cart:cartSlice.reducer,
        filter:filter.reducer
    }
});