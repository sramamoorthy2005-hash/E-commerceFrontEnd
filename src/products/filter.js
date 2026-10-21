import { createSlice } from "@reduxjs/toolkit";

const filter = createSlice({
    name:'filter',
    initialState:{
        selectCategory:"All"
    },

    reducers:{
        setselectCategory:(state,action)=>{
            state.selectCategory = action.payload
        }
    }
})
export const {setselectCategory} = filter.actions;
export default filter