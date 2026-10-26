import React, { useState } from "react";
import Form from "./Form";
import { useSelector } from "react-redux";

const Checkout = () => {
  const [addressOpen, setAddressOpen] = useState(false);
  const address = useSelector((state) => state.form.address);
  const [change, setChange] = useState(false);
  console.log(address);
  return (
    <>
      <section
        className={`bg-orange-100 h-[88vh] py-6 px-15 flex items-start justify-between ${addressOpen ? "overflow-y-clip" : "overflow-y-auto"}`}
      >
        <div className="flex-1 pr-10">
          {address ? (
            <>
              <div className="bg-white min-h-[100px] h-acto p-5">
                <div className="flex justify-between">
                  <h4 className="text-lg font-medium">
                    Delivering to{" "}
                    <span className="text-xl">{address.name}</span>{" "}
                  </h4>

                  <button
                    onClick={() => setChange((prev) => !prev)}
                    className={`hover:underline cursor-pointer active:text-sky-600 font-normal text-sky-700 `}
                  >
                    Change
                  </button>
                </div>
                <p className="mt-2 mb-2 w-150  text-wrap">
                  {address.street} , {address.house} , {address.street} ,{" "}
                  {address.city} , {address.pincode} , {address.country}
                </p >

              {change && (
                  <>
                    <div className="flex items-center gap-3 border-t pt-2 pb-2">
                      <div>
                        <input type="radio" />
                      </div>
                      <div>
                        <p className="text-xl font-medium">{address.name}</p>
                        <p className=" w-150  text-wrap">
                          {address.street} , {address.house} , {address.street}{" "}
                          , {address.city} , {address.pincode} ,{" "}
                          {address.country}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setAddressOpen((prev) => !prev)}
                      className="ring-2 ring-sky-400 py-1 px-2 rounded-xl mt-2 bg-sky-300 hover:bg-sky-400 cursor-pointer"
                    >
                      Add Delivery Address
                    </button>
                  </>
                )}

              </div>



              <div className="bg-white mt-3 p-5">
                <h3>Payment method</h3>
                <div>
                  <p className="flex items-center gap-1">
                    <input className="w-4 h-4 " type="checkbox" />{" "}
                    <span className="text-lg">Cash on Delivery</span>
                  </p>
                </div>
              </div>

              <div className="bg-white mt-3 p-5">
                <p>items and shipping</p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white min-h-[100px] h-acto p-5">
                <h4 className="text-lg font-medium">No Delivery address</h4>

                <button
                  onClick={() => setAddressOpen((prev) => !prev)}
                  className="ring-2 ring-sky-400 py-1 px-2 rounded-xl mt-2 bg-sky-300 hover:bg-sky-400 cursor-pointer"
                >
                  Add Delivery Address
                </button>
              </div>
              <div className="bg-white mt-3 p-5">
                <h3>Payment method</h3>
              </div>

              <div className="bg-white mt-3 p-5">
                <p>items and shipping</p>
              </div>
            </>
          )}

          


        </div>

         

          



        <div className="bg-white min-h-[100px] h-auto min-w-xs p-3 ">
          <div className="flex flex-col gap-2 mb-2">
            <p>Items : </p>
            <p>Discount : </p>
            <p>Order Total : </p>
          </div>
          <button className="bg-yellow-300 py-1 rounded-xl w-full">
            Place Your Order
          </button>
        </div>
      </section>
      {addressOpen && <Form setAddressOpen={setAddressOpen} />}
    </>
  );
};

export default Checkout;
