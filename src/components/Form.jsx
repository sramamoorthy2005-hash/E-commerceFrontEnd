import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "../products/formSlice";

const Form = ({setAddressOpen}) => {
  const dispatch = useDispatch();

  const [formdata,setFormdata] = useState({
    name:'',
    mobile:'',
    pincode:'',
    house:'',
    street:'',
    landmark:'',
    city:'',
    country:''

  });

  const handleChange = (e)=>{
    const {name , value} = e.target;
    setFormdata((prev)=>({
      ...prev,[name]:value,
    }));
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(setAddress(formdata));
    setAddressOpen(false);
  }
  
  return (
    <section  onClick={()=>setAddressOpen((prev)=>!prev)} className=" fixed inset-0 z-50 flex  bg-black/50 justify-center items-center p-4">
      <div onClick={(e) => e.stopPropagation()}  className="relative  w-full max-w-xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden ">
        <div className="bg-gray-100 flex p-4 justify-between rounded-xl ">
          <h4 className="font-bold">Add an address</h4>
          <button onClick={()=>setAddressOpen((prev)=>!prev)} className="text-2xl cursor-pointer  font-bold"><IoMdClose /></button>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-5 overflow-y-auto space-y-4 custom-scrollbar">
          <div className="">
            <label className="font-medium" htmlFor="">
              Full name (First and Last name)
            </label>
            <div>
              <input
                type="text"
                name="name"
                value={formdata.name}
                onChange={handleChange}
                className="border-2 border-gray-500 py-1 transition-all duration-300 ease-in px-4 rounded-xl focus:outline-2 focus:outline-blue-100 focus:border-sky-400  w-full mt-1"
              />
            </div>
          </div>
          <div className="">
            <label className="font-medium" htmlFor="">
              Mobile number
            </label>
            <div>
              <input
                type="tel"
                name="mobile"
                value={formdata.mobile}
                onChange={handleChange}
                className="border-2 border-gray-500 py-1 transition-all duration-300 ease-in px-4 rounded-xl focus:outline-2 focus:outline-blue-100 focus:border-sky-400  w-full mt-1"
              />
            </div>
          </div>
          <div className="">
            <label className="font-medium" htmlFor="">
              Pincode
            </label>
            <div>
              <input
                type="text"
                name="pincode"
                value={formdata.pincode}
                onChange={handleChange}
                placeholder="6 digit [0-9] PIN code"
                className="border-2 border-gray-500 py-1 transition-all duration-300 ease-in px-4 rounded-xl focus:outline-2 focus:outline-blue-100 focus:border-sky-400  w-full mt-1"
              />
            </div>
          </div>
          <div className="">
            <label className="font-medium" htmlFor="">
              Flat, House no., Building, Company, Apartment
            </label>
            <div>
              <input
                type="text"
                name="house"
                value={formdata.house}
                onChange={handleChange}
                className="border-2 border-gray-500 py-1 transition-all duration-300 ease-in px-4 rounded-xl focus:outline-2 focus:outline-blue-100 focus:border-sky-400  w-full mt-1"
              />
            </div>
          </div>
          <div className="">
            <label className="font-medium" htmlFor="">
              Area, Street, Sector, Village
            </label>
            <div>
              <input
                type="text"
                name="street"
                value={formdata.street}
                onChange={handleChange}
                className="border-2 border-gray-500 py-1 transition-all duration-300 ease-in px-4 rounded-xl focus:outline-2 focus:outline-blue-100 focus:border-sky-400  w-full mt-1"
              />
            </div>
          </div>
          <div className="">
            <label className="font-medium" htmlFor="">
              Landmark
            </label>
            <div>
              <input
                type="text"
                name="landmark"
                value={formdata.landmark}
                onChange={handleChange}
                className="border-2 border-gray-500 py-1 transition-all duration-300 ease-in px-4 rounded-xl focus:outline-2 focus:outline-blue-100 focus:border-sky-400  w-full mt-1"
              />
            </div>
          </div>
          <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="">
              <label className="font-medium" htmlFor="">
                Town/City
              </label>
              <div>
                <input
                  type="text"
                  name="city"
                  value={formdata.city}
                  onChange={handleChange}
                  className="border-2 border-gray-500 py-1 transition-all duration-300 ease-in px-4 rounded-xl focus:outline-2 focus:outline-blue-100 focus:border-sky-400  w-full mt-1"
                />
              </div>
            </div>

            <div>
              <label className="font-medium" htmlFor="">
                Country/Region
              </label>
              <div>
                <select name="country"
                  value={formdata.country}
                onChange={handleChange}
                 className="border-2 border-gray-500 py-1 transition-all duration-300 ease-in px-4 rounded-xl focus:outline-2 focus:outline-blue-100 focus:border-sky-400  w-full mt-1"  id=""> 
                  <option value="" disabled>-- Select Country -- </option>
                  <option value="TamilNadu">TamilNadu</option>
                  <option value="PandiyaNadu">PandiyaNadu</option>
                  <option value="CheraNadu">CheraNadu</option>
                  <option value="ChozhaNadu">ChozhaNadu</option>
                </select>
                
              </div>
            </div>
          </div>

          <div className="py-6 ">
            <input
              type="submit"
              value="Use this address"
              className="bg-yellow-400 py-2 px-4 rounded-2xl cursor-pointer hover:bg-yellow-300"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
