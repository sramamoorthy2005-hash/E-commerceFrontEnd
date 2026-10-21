import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',

    initialState:{
        cartItems:[],
        wishList:[],
       
    },
    reducers:{
        toggleSelect:(state,action)=>{
            const isfindId = state.cartItems.find((item)=>item.id===action.payload)
            if(isfindId){
                isfindId.selected = !isfindId.selected
            }
        },
        addToCart:(state,action)=>{
            const isCart = state.cartItems.find((item)=>item.id===action.payload.id);
            if(isCart){
                isCart.quantity+=1;
            }
            else{
                state.cartItems.push({
                    ...action.payload,
                    quantity:1,
                    selected:true
                })
            }
        },
        QtyInc:(state,action)=>{
            const isCart = state.cartItems.find((item)=>item.id===action.payload);
            if(isCart){
                isCart.quantity+=1;
            }
        },
        QtyDec:(state,action)=>{
            const isCart = state.cartItems.find((item)=>item.id===action.payload);
            if(isCart.quantity > 1){
                isCart.quantity-=1;
            }
            else{
                state.cartItems = state.cartItems.filter((item)=>item.id!==action.payload);
            }
        },
        removeItem:(state,action)=>{
            const isCart = state.cartItems.find((item)=>item.id===action.payload);
            if(isCart){
                state.cartItems = state.cartItems.filter((item)=>item.id!==action.payload);
            }
        },
        addWishList:(state,action)=>{
            const isWishlist = state.wishList.findIndex((item)=>item.id===action.payload.id)
            if(isWishlist>=0){
                state.wishList.splice(isWishlist,1);
            }
            else{
                state.wishList.push(action.payload)
            }
        }
    }
})

export const {addToCart,QtyInc,QtyDec,addWishList,removeItem,toggleSelect} = cartSlice.actions;
export default cartSlice