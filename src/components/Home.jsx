import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {fetchProducts} from '../products/productsSlice';
const Home = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(fetchProducts());
    },[dispatch]);

    const {productItems} = useSelector((state)=>state.products);
  return (
    <div className='py-10 px-15 bg-orange-50 h-full'>
      {productItems?.map((item)=>(
        <div key={item.id}>{item.title}
          {item.price}
        </div>
      ))}
    </div>
  )
}

export default Home