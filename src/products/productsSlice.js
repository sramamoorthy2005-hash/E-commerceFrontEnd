import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../api/productApi";

export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async(_,{rejectWithValue})=>{
        try{
            const response = await getProducts();
            // console.log(response)
            return response.data.products;
            // return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?.message || "Faild to fetch the products ")
        }
    }
);

const productsSlice = createSlice({
    name:'products',

    initialState:{
        productItems:[],
        loading:false,
        error:null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProducts.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.loading=false;
            state.productItems=action.payload;
        })
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
    }
});

export default productsSlice