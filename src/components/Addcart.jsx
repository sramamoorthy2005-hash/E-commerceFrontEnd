import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, QtyDec, QtyInc, removeItem } from "../products/cartSlice";
import { FaMinus, FaPlus } from "react-icons/fa";
import { ImBin } from "react-icons/im";
const Addcart = ({ item }) => {
  const dispatch = useDispatch();
  
  const cartItem = useSelector((state) =>
    state.cart?.cartItems?.find((cartProduct) => cartProduct.id === item.id),
  );
  

  return (
    <>
      {cartItem ? (
        <div className="flex gap-5 items-center">
        <div className="bg-white   text-white w-full text-black ring-3 ring-orange-300 flex items-center justify-between  px-3 rounded-xl">
          <button onClick={()=>dispatch(QtyDec(cartItem.id))} className="text-black cursor-pointer">
            <FaMinus />
          </button>{" "}
          <span className="text-black text-lg">{cartItem.quantity}</span>{" "}
          <button onClick={()=>dispatch(QtyInc(cartItem.id))} className="text-black cursor-pointer">
            <FaPlus />
          </button>
        </div>
        <button onClick={()=>dispatch(removeItem(cartItem.id))} className="cursor-pointer text-lg"><ImBin/></button>
        </div>
      ) : (
        <button
          onClick={() => dispatch(addToCart(item))}
          className="bg-yellow-400 cursor-pointer text-white w-full hover:bg-yellow-500 py-2 rounded-xl"
        >
          Add to Cart
        </button>
      )}
    </>
  );
};

export default Addcart;
