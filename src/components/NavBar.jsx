import React, { useEffect, useState } from "react";
import { FaOpencart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setSearch } from "../products/productsSlice";
import { IoIosHeart } from "react-icons/io";
import Filtercategory from "./Filtercategory";
import { TbMenuDeep } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
const NavBar = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart || []);
  const searchNav = useSelector((state) => state.products.search || "");
  const location = useLocation();
  const isCheckout = location.pathname === "/Checkout";
  const [isOpen, setIsOpen] = useState(false);
  useEffect(()=>{
    if(isOpen){
      document.body.style.overflow = 'hidden';
    }
    else{
      document.body.style.overflow = 'unset';
    }
    return ()=>{
      document.body.style.overflow = 'unset';
    };
  },[isOpen]);
  return (
    <>
      <div className="bg-gray-800 flex-wrap text-white py-3  px-5 flex justify-between items-center ">
        <div className="cursor-pointer  h-20 max-md:flex">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-4xl text-orange-400 hidden max-md:block"
          >
            <TbMenuDeep />
          </button>
          <img
            onClick={() => nav("/")}
            src="/ec-removebg-preview.png"
            alt="E-Commerce"
            className="w-full h-full object-contain"
          />
        </div>
        {isCheckout ? (
          <h3 className="text-3xl text-yellow-400">Checkout</h3>
        ) : (
          <input
            className="border-2 border-gray-400 rounded-xl py-1 px-2 max-[426px]:order-2 max-[426px]:w-full"
            placeholder="Search"
            type="search"
            value={searchNav}
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
        )}

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
          <IoIosHeart
            className="text-3xl cursor-pointer "
            onClick={() => nav("/wishlist")}
          />
        </div>
      </div>
      <div className="max-md:hidden">
        <Filtercategory />
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            className="fixed inset-0 bg-black/30 "
          />
          <div className="w-3/4 flex flex-col  bg-white shadow-2xl  z-10 relative h-screen bg-gray-800 ">
            <div className="flex items-center justify-between bg-gray-800 text-white px-5"
                  >
              <div className="w-20">
                <img
                  onClick={() =>{ nav("/") ; setIsOpen((prev)=>!prev)}}
                  src="/ec-removebg-preview.png"
                  alt="E-Commerce"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="text-red-600  bg-white  hover:text-white p-1 rounded-lg"
              >
                <IoClose size={24} />
              </button>
            </div>
            <div className="bg-black flex-1 overflow-y-auto">
              <h1 className="font-medium text-white text-lg border-b border-black py-4 px-10">Categories : </h1>
              <Filtercategory onFilter={()=>setIsOpen(false)}/>
               <div className="text-white flex justify-between px-10 pb-2 max-[532px]:flex-col max-[532px]:gap-2 max-[532px]:text-center">
                <p className="text-emerald-400">Ramamoorthy</p>
                <p className="text-sky-400">@2026 RamDevi</p>
                <p>QuickCart</p>
               </div>
            </div>
          
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
