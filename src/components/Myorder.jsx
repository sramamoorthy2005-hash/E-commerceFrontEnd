import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Myorder = () => {
    const orderDetails = useSelector((state)=>state.order);
    useEffect(()=>{
        console.log(orderDetails)
    },[orderDetails])
  return (
    <div>Myorder</div>
  )
}

export default Myorder