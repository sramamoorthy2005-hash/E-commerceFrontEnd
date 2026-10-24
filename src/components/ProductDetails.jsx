import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Addcart from './Addcart';

const ProductDetails = () => {
    const {id} = useParams();
   const {productItems}= useSelector((state)=>state.products);
   const product = productItems.find((item)=>item.id===Number(id));
   let price = (product.price * product.discountPercentage) / 100 ;
         price = product.price - price
  return (
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
  )
}

export default ProductDetails