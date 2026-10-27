import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name:'order',

    initialState:{
        order:[]
    },
    reducers:{
        placeorder:(state,action)=>{
            state.order.unshift(action.payload);
        }
    }
})

export const {placeorder} = orderSlice.actions;
export default orderSlice