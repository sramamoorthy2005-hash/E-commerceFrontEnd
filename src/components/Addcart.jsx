import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../products/cartSlice";
import { FaMinus, FaPlus } from "react-icons/fa";
const Addcart = ({ item }) => {
  const dispatch = useDispatch();
  
  const cartItem = useSelector((state) =>
    state.cart?.cartItems?.find((cartProduct) => cartProduct.id === item.id),
  );
  const isCart = Boolean(cartItem);

    return (
    <>
      {cartItem ? (
        <div>
          {isCart ? (
            <div className="bg-yellow-400 cursor-pointer text-white w-full hover:bg-yellow-500 flex items-center py-2 rounded-xl">
              <FaMinus /> <span>{cartItem.quantity}</span> <FaPlus />
            </div>
          ) : (
            <button
              onClick={() => dispatch(addToCart(item))}
              className="bg-yellow-400 cursor-pointer text-white w-full hover:bg-yellow-500 py-2 rounded-xl"
            >
              Add to Cart
            </button>
          )}
        </div>
      ) : null}
    </>
  );
}

export default Addcart;
