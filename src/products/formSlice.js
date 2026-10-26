import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
    name:'form',
    initialState:{
        address:null
    },

    reducers:{
        setAddress:(state,action)=>{
            state.address =action.payload
        }
    }
})

export const {setAddress} = formSlice.actions;
export default formSlice;