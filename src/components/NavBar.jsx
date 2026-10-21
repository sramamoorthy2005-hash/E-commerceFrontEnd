import React, { useEffect, useState } from "react";
import { FaOpencart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setSearch } from "../products/productsSlice";
import { IoIosHeart } from "react-icons/io";

const NavBar = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart || []);
  const searchNav = useSelector((state) => state.products.search || "");
  const location = useLocation();
  const isCheckout = location.pathname ==="/Checkout"; 
  return (
    <>
    <div className="bg-gray-800 text-white py-6 px-15 flex justify-between items-center ">
      <div onClick={() => nav("/")} className="cursor-pointer">
        Logo
      </div>
      {isCheckout ? (
        <h3 className="text-3xl text-yellow-400">Checkout</h3>
      ):
      (
        <input
        className="border-2 border-gray-400 rounded-xl py-1 px-2"
        placeholder="Search"
        type="search"
        value={searchNav}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
      )
      }
      

      <div className="flex items-center gap-5">
        <div className="relative flex justify-center ">
          <FaOpencart
            onClick={() => nav("/Cart")}
            className="text-4xl cursor-pointer hover:text-orange-400"
          />
          <span className="absolute text-orange-400 font-medium text-lg top-[-15px]">
            {cartItems.length}
          </span>
        </div>
        <IoIosHeart className="text-3xl cursor-pointer" onClick={()=>nav('/wishlist')} />
      </div>
    </div>

    
    </>
  );
};

export default NavBar;
