import React, { useEffect } from 'react'
import { setselectCategory } from '../products/filter';
import { useDispatch, useSelector } from 'react-redux';

const Filtercategory = () => {
  const {productItems=[]}=useSelector((state)=>state.products || []);
  const selectCategory = useSelector((state)=>state.filter?.selectCategory || "All");
  const dispatch = useDispatch();
  const category = ["All",...new Set(productItems.map((item)=>item.category))];
  useEffect(()=>{
    console.log("current category : " , selectCategory);
  },[selectCategory])
  return (
    <ul className="bg-black h-acto  py-3 text-white flex text-lg px-12 gap-8">
      {category.map((item)=>{
        const isActive = selectCategory.toLowerCase() === item.toLowerCase();
        return (<li onClick={()=>dispatch(setselectCategory (item))} className={`cursor-pointer py-1 px-3 rounded-lg transition-all ease-in-out duration-300 hover:-translate-y-0.5 hover:ring ${isActive ? 'bg-gray-800 ring-2 ring-gray-600  ' : ''}`} key={item}>{item}</li>)
      })}
    </ul>
  )
}

export default Filtercategory