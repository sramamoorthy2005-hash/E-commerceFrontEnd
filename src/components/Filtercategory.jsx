import React, { useEffect } from 'react'
import { setselectCategory } from '../products/filter';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Filtercategory = ({onFilter}) => {
  const {productItems=[]}=useSelector((state)=>state.products || []);
  const selectCategory = useSelector((state)=>state.filter?.selectCategory || "All");
  const dispatch = useDispatch();
  const category = ["All",...new Set(productItems.map((item)=>item.category))];
  const location = useLocation();
  const filters = location.pathname==='/';
  
 
  const HandlesetselectCategory = (item)=>{
    dispatch(setselectCategory(item));
    if(onFilter){
    onFilter();
  }
  }
  if(!filters) return null;
  return (
    <ul className="bg-black h-acto  py-3 text-white flex text-lg px-8 gap-8 max-md:flex-col max-md:h-screen">
      {category.map((item)=>{
        const isActive = selectCategory.toLowerCase() === item.toLowerCase();
        return (<li onClick={()=>(HandlesetselectCategory (item))} className={`cursor-pointer py-1 px-3 rounded-lg transition-all ease-in-out duration-300 hover:-translate-y-0.5 hover:ring ${isActive ? 'bg-gray-800 ring-2 ring-gray-600  ' : ''}`} key={item}>{item}</li>)
      })}
    </ul>
  )
}

export default Filtercategory