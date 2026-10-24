import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../products/productsSlice";
import { useNavigate } from "react-router-dom";
import Addcart from "./Addcart";
import { IoIosHeart } from "react-icons/io";
import { addWishList } from "../products/cartSlice";
const Home = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const { productItems=[] ,search='' , loading , error } = useSelector((state) => state.products||{});
  const {wishList} = useSelector((state)=>state.cart||[]);
  const selectCategory = useSelector((state)=>state.filter?.selectCategory || "All");
  const filterProducts = productItems.filter((product)=>{
    const msearch =  product.title.toLowerCase().includes(search.toLowerCase());

    const categoryFilter = selectCategory.toLowerCase()=="all" || product.category.toLowerCase() == selectCategory.toLowerCase();
    return msearch && categoryFilter ;
  } 
  );
  if(loading){
    return (<div className="text-center text-4xl font-bold ">Loading Products</div>)
  }

  if(error){
    return (<div className="text-center text-4xl font-bold">Error : {error}</div>)
  }

  return (
    <div className="grid gap-5 grid-cols-5 py-10 px-10 bg-orange-50 min-h-[80vh] max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-md:px-1 max-md:py-1 max-md:gap-1">

      {filterProducts?.map((item) => {
        let price = (item.price * item.discountPercentage) / 100 ;
         price = item.price - price
        let wishcolor = wishList.some((product)=>product.id===item.id);
        return (
          <div className="border-2 max-md:border-1 rounded-xl  shadow-xl  bg-white" key={item.id}>
            <div onClick={()=>nav(`/product/${item.id}`)} className="h-95 max-md:h-60 border-b-2 cursor-pointer rounded-xl ">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full bg-gray-100 object-contain rounded-xl   "
              />
            </div>
            <div className="p-3">
              <p className="text-xl font-semibold max-md:text-sm">{item.title}</p>
              {/* <p className="text-gray-600 text-sm mt-3 font-medium">{item.description}</p> */}
              <p className="mt-3 font-medium text-gray-700"> <span className="text-3xl font-medium max-md:text-xl">₹{price.toFixed(2)} </span>
                 M.R.P <span className="line-through">₹{item.price}</span>
                <span>({item.discountPercentage}% off)</span>
              </p>
              <p className="mt-4 text-lg font-medium mb-5 flex justify-between max-md:text-sm">Category : {item.category} 
                <IoIosHeart onClick={()=>dispatch(addWishList(item))} className={`text-3xl cursor-pointer ${wishcolor ? 'text-red-400' : 'text-gray-800'}`}/>
              </p>
              <Addcart  item={item}/>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
