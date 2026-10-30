import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Addcart from './Addcart';
import { fetchProducts } from '../products/productsSlice';
import { AnimatePresence ,motion } from 'framer-motion';
import { IoIosHeart } from 'react-icons/io';
import { addWishList } from '../products/cartSlice';


const ProductDetails = () => {
    const {id} = useParams();
   const {productItems}= useSelector((state)=>state.products);
   const product = productItems.find((item)=>item.id===Number(id));
   const wishList = useSelector((state) => state.cart?.wishList || []);
   const dispatch = useDispatch();
   const nav = useNavigate();
   useEffect(() => {
    if (productItems.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, productItems.length]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);


  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-xl font-medium text-gray-600 animate-pulse">
          Loading Product Details...
        </p>
      </div>
    );
  }

  const relatedProducts = productItems.filter(
    (item) => item.category === product?.category && String(item.id) !== String(id)
  );

   let price = (product.price * product.discountPercentage) / 100 ;
         price = product.price - price;




  return (
    <>
    <div className='py-5 px-15 gap-2 flex max-md:flex-col max-md:px-5'>
        <div className='w-100 h-150 max-md:h-80 max-md:w-full max-lg:w-70  shrink-0 rounded-xl bg-gray-200'>
            <img src={product.thumbnail} alt={product.title} className='w-full h-full object-contain' />
        </div>
        <div className='bg-gray-100   py-5 px-10  text-wrap'>
            <h2 className=' text-2xl font-medium'>{product.title}</h2>
            <p className='mt-5 text-lg font-normal text-gray-700 '>{product.description}</p>
            <p className='mt-2 font-medium text-lg'>Category : {product.category}</p>
            <p className="mt-5 font-medium text-gray-700"> <span className="text-3xl font-medium"><sup className="text-xl text-black">₹</sup >{price.toFixed(2)} </span>
                 M.R.P <span className="line-through">₹{product.price}</span>
                <span>({product.discountPercentage}% off)</span>
            </p>
            <p className='mb-10'>{product.brand}</p>
            <p className='w-50 max-sm:w-full'><Addcart  item={product}/></p>
        </div>
    </div>


    
    {relatedProducts.length>0 && (


    
        <div className="grid gap-5 grid-cols-5 py-10 px-10  min-h-[80vh] max-[1280px]:grid-cols-4  max-[1024px]:grid-cols-3  max-[768px]:grid-cols-2 max-md:px-5 max-[425px]:grid-cols-1 ">
      <AnimatePresence>
      {relatedProducts?.map((item) => {
        let price = (item.price * item.discountPercentage) / 100;
        price = item.price - price;
        let wishcolor = wishList.some((relatedProducts) => relatedProducts.id === item.id);
        return (
          <motion.div
            layout="position"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                layout: { type: "spring", damping: 25, stiffness: 180 },
                opacity: { duration: 0.1 },
              }}
            className="border border-gray-400  rounded-xl  bg-white shadow-xl flex flex-col justify-between overflow-hidden"
            key={item.id}
          >
            <div
              onClick={() => nav(`/product/${item.id}`)}
              className="h-[20rem] max-md:h-60 max-md:border-none  border-b-2 border-gray-200  cursor-pointer rounded-xl "
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full bg-gray-100 object-contain   hover:scale-105 transition-transform duration-300 "
              />
            </div>
            <div className="p-3">
              <p onClick={() => nav(`/product/${item.id}`)} className="text-lg hover:underline underline-offset-4 cursor-pointer text-gray-800 font-medium max-md:text-sm">
                {item.title}
              </p>
              {/* <p className="text-gray-600 text-sm mt-3 font-medium">{item.description}</p> */}
              <p className="mt-3 font-medium text-gray-700">
                {" "}
                <span className="text-3xl font-medium max-md:text-xl">
                  ₹{price.toFixed(2)}{" "}
                </span>
                M.R.P <span className="line-through">₹{item.price}</span>
                <span>({item.discountPercentage}% off)</span>
              </p>
              <p className="mt-4 text-base font-medium mb-5 flex justify-between max-md:text-sm">
                Category : {item.category}
                <IoIosHeart
                  onClick={() => dispatch(addWishList(item))}
                  className={`text-3xl cursor-pointer ${wishcolor ? "text-red-400" : "text-gray-800"}`}
                />
              </p>
              <Addcart item={item} />
            </div>
          </motion.div>
        );
      })}
      </AnimatePresence>
    </div>
    
    )}

        <div onClick={()=>nav('/')} className='py-10 text-center text-white '><button className='bg-emerald-400 cursor-pointer py-1 px-4 rounded-lg'>Go to Home</button></div>
</>

  )
}

export default ProductDetails