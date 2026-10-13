import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {
    const {id} = useParams();
   const {productItems}= useSelector((state)=>state.products);
   const product = productItems.find((item)=>item.id===Number(id));
   let price = (product.price * product.discountPercentage) / 100 ;
         price = product.price - price
  return (
    <div className='py-5 px-15 gap-15 flex'>
        <div className='w-150 h-150  rounded-xl bg-gray-200'>
            <img src={product.images} alt={product.title} className='w-full h-full object-fill' />
        </div>
        <div className='bg-gray-100 py-5 px-10 w-full text-wrap'>
            <h2 className=' text-4xl font-medium'>{product.title}</h2>
            <p className='mt-5 text-2xl font-normal text-gray-700 '>{product.description}</p>
            <p className='mt-2 font-medium text-lg'>Category : {product.category}</p>
            <p className="mt-5 font-medium text-gray-700"> <span className="text-3xl font-medium"><sup className="text-xl text-black">₹</sup >{price.toFixed(2)} </span>
                 M.R.P <span className="line-through">₹{product.price}</span>
                <span>({product.discountPercentage}% off)</span>
            </p>
            <p>{product.brand}</p>
        </div>
    </div>
  )
}

export default ProductDetails