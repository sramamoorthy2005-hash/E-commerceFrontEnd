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
    <ul className=" h-auto    flex flex-col text-lg   ">
      {category.map((item)=>{
        const isActive = selectCategory.toLowerCase() === item.toLowerCase();
        return (<li onClick={()=>(HandlesetselectCategory (item))} className={`cursor-pointer  py-2 px-8 transition-all ease-in-out duration-300  hover:bg-gray-200 ${isActive ? 'underline underline-offset-8  underline-red-900 text-orange-400 ' : ''}`} key={item}> {item}</li>)
      })}
    </ul>
  )
}

export default Filtercategory