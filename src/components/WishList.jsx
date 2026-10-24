import React from 'react'
import { FaCircleArrowRight } from 'react-icons/fa6';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Addcart from './Addcart';


const WishList = () => {
    const {wishList} = useSelector((state)=>state.cart||[]);
    const nav = useNavigate();
    if(wishList.length==0){
      return <div className=" mt-15 flex items-center gap-3 flex-col">
              <h2 className="font-bold text-gray-700 text-5xl">Your WhisList is Empty !</h2>
              <p className="text-xl font-normal">You are no products is Liked.</p>
              <button onClick={()=>nav('/')} className="bg-emerald-400 py-1 px-3 rounded-xl"><span className="text-lg cursor-pointer">Check Products</span> <FaCircleArrowRight className="inline-block" /></button>
            </div>
    }
  return (
    <div className="px-15 py-10  max-md:px-5 max-md:py-5">
          <h2 className="text-3xl font-medium">Liked Products!</h2>
          {wishList.map((item) => {
            let price = (item.price * item.discountPercentage) / 100;
            price = item.price - price;
            return (
              <div className="flex ring rounded-xl mt-5 max-md:flex-col">
                <div className="w-70  shrink-0 max-md:w-full max-md:h-80  rounded-xl bg-gray-200 border-r">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="bg-gray-100 py-5 px-10 w-full text-wrap rounded-xl">
                  <h2 className=" text-4xl font-medium">{item.title}</h2>
                  <p className="mt-5 text-2xl font-normal text-gray-700 ">
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
                  <p className='w-49 mt-5'><Addcart item={item}/></p>
                </div>
                
              </div>
            );
          })}
        </div>
  )
}

export default WishList