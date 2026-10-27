import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
    name:'form',
    initialState:{
        address:[],
        selectId:null
    },

    reducers:{
        setAddress:(state,action)=>{
            const newAddress = {
                ...action.payload,
                id:Date.now()
            };
            state.address.push(newAddress);
            state.selectId = newAddress.id
        },
        selectAddress:(state,action)=>{
            state.selectId = action.payload;
        }

    }
})

export const {setAddress , selectAddress} = formSlice.actions;
export default formSlice;