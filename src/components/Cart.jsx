import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa";
import { QtyDec, QtyInc, removeItem, toggleSelect } from "../products/cartSlice";
import { FaCircleArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ImBin } from "react-icons/im";
const Cart = () => {
  const { cartItems ,selectItems } = useSelector((state) => state.cart || []);
  const dispatch = useDispatch();
  const nav = useNavigate();
  
  if (cartItems.length == 0) {
    return (
      <div className=" mt-15 flex items-center gap-3 flex-col ">
        <h2 className="font-bold text-gray-700 text-5xl">
          Your Cart is Empty !
        </h2>
        <p className="text-xl font-normal">
          Looks like you haven't added anything to your cart yet.
        </p>
        <button
          onClick={() => nav("/")}
          className="bg-yellow-400 py-1 px-3 rounded-xl"
        >
          <span className="text-lg cursor-pointer">Continue Shopping</span>{" "}
          <FaCircleArrowRight className="inline-block" />
        </button>
      </div>
    );
  }

  const Subtotal = cartItems
  .filter((item)=>item.selected)
  .reduce((acc, item) => {
    let discount = (item.price * item.discountPercentage) / 100;
    let finalprice = item.price - discount;
    return acc + finalprice * item.quantity;
  }, 0);
  const totalProducts = cartItems
  .filter((item)=>item.selected)
  .reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  return (
    <div className="px-15 py-10 bg-gray-200 flex items-start max-md:flex-col max-md:gap-5 max-md:px-5 max-md:py-5">
      <div className="shadow-xl bg-white py-3 px-3 mr-5 w-full">
        <h2 className="text-3xl pb-2 font-medium border-b-2">CartItems!</h2>
        {cartItems.map((item) => {
          let price = (item.price * item.discountPercentage) / 100;
          price = item.price - price;
          
          return (
            <div key={item.id} className="">
               <div className="mt-2 ">
                  <input type="checkbox"
                          checked={item.selected}
                          onChange={()=>dispatch(toggleSelect(item.id))}
                    className="w-4 h-4  cursor-pointer"
                  />
                </div>
              <div className="flex border-b-[2px] border-gray-300 py-4 max-lg:flex-col max-lg:items-center  ">
               
                <div className="w-auto   rounded-xl  ">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-80 h-80 shrink-0  object-contain"
                  />
                </div>

                <div className=" w-full text-wrap ">
                  <h2 className=" text-2xl font-medium">{item.title}</h2>
                  <p className="mt-5 text-lg font-normal text-gray-700 ">
                    {item.description}
                  </p>
                  <p className="mt-2 font-medium text-lg">
                    Category : {item.category}
                  </p>
                  <p className="mt-5 font-medium text-gray-700">
                    {" "}
                    <span className="text-3xl font-medium">
                      <sup className="text-xl text-black">₹</sup>
                      {price.toFixed(2)}{" "}
                    </span>
                    M.R.P <span className="line-through">₹{item.price}</span>
                    <span>({item.discountPercentage}% off)</span>
                  </p>
                  <p>{item.brand}</p>
                  <p className="font-normal  mt-3 flex items-center gap-2">
                    <button
                      onClick={() => dispatch(QtyDec(item.id))}
                      className="bg-red-400  p-1 rounded-sm"
                    >
                      <FaMinus />
                    </button>
                    <span>Qty : {item.quantity}</span>
                    <button
                      onClick={() => dispatch(QtyInc(item.id))}
                      className="bg-green-400 p-1 rounded-sm"
                    >
                      <FaPlus />
                    </button>
                    <button onClick={()=>dispatch(removeItem(item.id))} className="ml-5 cursor-pointer text-lg">
                    <ImBin />
                  </button>
                  </p>
                  
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="sticky top-10 min-w-[20rem] max-sm:min-w-[5rem] max-sm:w-full shadow-xl bg-white min-h-[200px] h-auto p-5 flex flex-col items-center justify-center gap-5">
        <p className="text-xl font-normal">
          Subtotal <span>({totalProducts} items): </span>
          <span className="font-medium text-2xl">₹{Subtotal.toFixed(2)}</span>
        </p>
        <button onClick={()=>nav('/Checkout')} className="bg-yellow-300 w-full py-1 rounded-xl cursor-pointer">
          Proceed to Buy
        </button>
      </div>
    </div>
  );
};

export default Cart;
