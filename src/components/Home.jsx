import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../products/productsSlice";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const { productItems , loading , error } = useSelector((state) => state.products);

  if(loading){
    return (<div className="text-center text-4xl font-bold">Loading Products</div>)
  }

  if(error){
    return (<div className="text-center text-4xl font-bold">Error : {error}</div>)
  }

  return (
    <div className="grid gap-5 grid-cols-5 py-10 px-15 bg-orange-50 h-full">
      {productItems?.map((item) => {
        let price = (item.price * item.discountPercentage) / 100 ;
         price = item.price - price
        
        return (
          <div className="border-2 rounded-xl shadow-xl bg-white" key={item.id}>
            <div onClick={()=>nav(`/product/${item.id}`)} className="h-100 border-b-2 cursor-pointer">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full bg-gray-100 rounded-xl"
              />
            </div>
            <div className="p-3">
              <p className="text-xl font-semibold">{item.title}</p>
              <p className="text-gray-900 text-sm mt-3 font-medium">{item.description}</p>
              <p className="mt-3 font-medium text-gray-700"> <span className="text-3xl font-medium"><sup className="text-xl text-black">₹</sup >{price.toFixed(2)} </span>
                 M.R.P <span className="line-through">₹{item.price}</span>
                <span>({item.discountPercentage}% off)</span>
              </p>
              <p className="mt-4 text-lg font-medium">Category : {item.category}</p>
              <button className="bg-yellow-400 cursor-pointer text-white w-full mt-8 py-2 rounded-xl">Add to Cart</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
