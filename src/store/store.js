import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../products/productsSlice";
import cartSlice from "../products/cartSlice";
import filter from "../products/filter";
import formSlice from "../products/formSlice";
import orderSlice from "../products/orderSlice";




export const store = configureStore({
    reducer:{
        products:productsSlice.reducer,
        cart:cartSlice.reducer,
        filter:filter.reducer,
        form:formSlice.reducer,
        order:orderSlice.reducer,
      
    }
});