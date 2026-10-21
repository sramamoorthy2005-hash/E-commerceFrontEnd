import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../products/cartSlice';

const Addcart = ({item}) => {
    const dispatch = useDispatch();
  return (
    <button onClick={()=>dispatch(addToCart(item))} className="bg-yellow-400 cursor-pointer text-white px-4 w-full  py-2 rounded-xl">Add to Cart</button>
  )
}

export default Addcart