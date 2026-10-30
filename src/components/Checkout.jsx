import React, {  useState } from "react";
import Form from "./Form";
import { useDispatch, useSelector } from "react-redux";
import Addcart from "./Addcart";
import { useNavigate } from "react-router-dom";
import { placeorder } from "../products/orderSlice";
import { clearCart } from "../products/cartSlice";

const Checkout = () => {
  const [addressOpen, setAddressOpen] = useState(false);
  const address = useSelector((state) => state.form.address || []);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [addressIndex, setAddressIndex] = useState(0);
  const [change, setChange] = useState(false);
  const currentAddress = address[addressIndex] || address[0];
  const [ispaymet ,setIspayment] = useState('');
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const deliveryItems = cartItems.filter((item) => item.selected !== false);
  const totalItems = deliveryItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );
  const totalprice = deliveryItems.reduce(
    (acc, item) => acc + Number(item.price) * (item.quantity || 1),
    0,
  );
  const discount = deliveryItems.reduce((acc, item) => {
    const todis =
      (Number(item.price) * (Number(item.discountPercentage) || 0)) / 100;
    return acc + todis * (item.quantity || 1);
  }, 0);
  const ordertotal = totalprice - discount;
 const handlePlaceorder = ()=>{
  if(!ispaymet){
    alert("select a payment method")
    return;
  }
  const newOrder = {
    orderId: 'OD' + Math.floor(100000000+ Math.random()* 900000000),
    date:new Date().toLocaleDateString("en-IN",{
      day:"numeric",
      month:"short",
      year:"numeric"
    }),
    address:currentAddress,
    Orderitems:deliveryItems,
    paymentmethod:ispaymet,
    totalAmount:ordertotal,
    itemscount:totalItems
  };
  dispatch(placeorder(newOrder));
  dispatch(clearCart());
  nav('/myorder')
 }
  return (
    <>
      <section
        className={`bg-orange-100 min-h-[88vh] h-auto py-6 px-5 flex items-start justify-between max-lg:flex-col max-lg:gap-5 ${addressOpen ? "overflow-y-clip" : "overflow-y-auto"}`}
      >
        <div className="flex-1 w-full pr-10 max-lg:pr-0">
          {address?.length > 0 && currentAddress ? (
            <>
              <div className="bg-white min-h-[100px] h-acto p-5 ">
                <div className="flex  [@media(max-width:425px)]:flex-col-reverse gap-3   justify-between">
                  <h4 className="text-lg font-normal">
                    Delivering to{" "}
                    <span className="text-xl text-wrap font-medium">
                      {currentAddress.name}
                    </span>{" "}
                  </h4>
                  <div className="max-[425px]:w-full">
                  <button
                    onClick={() => setChange((prev) => !prev)}
                    className={`hover:underline  cursor-pointer active:text-sky-600 font-normal text-sky-700 `}
                  >
                    {change ? "Close" : "Change Address"}
                  </button>
                  </div>
                </div>
                <p className="mt-2 mb-2 w-full pr-30 max-sm:pr-10 break-words text-wrap">
                  {currentAddress.street} , {currentAddress.house} ,{" "}
                  {currentAddress.street} , {currentAddress.city} ,{" "}
                  {currentAddress.pincode} , {currentAddress.country}
                </p>

                {change && (
                  <>
                    <div className="  gap-3 border-t pt-2 pb-2">
                      {address.map((item, index) => {
                        const isSelect = addressIndex == index;
                        return (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 mt-3"
                          >
                            <div>
                              <input
                                type="radio"
                                name="address_choice"
                                checked={isSelect}
                                onChange={() => setAddressIndex(index)}
                              />
                            </div>
                            <div>
                              <p className="text-lg font-medium">{item.name}</p>
                              <p className=" w-full  text-wrap">
                                {item.street} , {item.house} , {item.street} ,{" "}
                                {item.city} , {item.pincode} , {item.country}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-3 mb-3">
                      <button
                        onClick={() => setChange(false)}
                        className="bg-yellow-400 py-1 px-3 rounded-xl cursor-pointer"
                      >
                        Use this address
                      </button>
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

              <div className="bg-white w-auto mt-3 p-5">
                <h3>Payment method</h3>
                <div className="mt-2">
                  <div className="flex items-center gap-1 mb-1">
                    <input name="paymetMethod" value="Cash on Delivery" className="w-4 h-4   " type="radio"
                      checked={ispaymet == "Cash on Delivery"}
                      onChange={(e)=>setIspayment((e.target.value))}
                    />{" "}
                    <span className="text-lg">Cash on Delivery</span>
                  </div>

                  <div className="flex items-center gap-1 mb-1">
                    <input name="paymetMethod" value="Net Banking" className="w-4 h-4   "  type="radio" checked={ispaymet == "Net Banking"}

                      onChange={(e)=>setIspayment((e.target.value))}/>{" "}
                    <span className="text-lg">Net Banking</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <input name="paymetMethod" className="w-4 h-4   " disabled type="radio" />{" "}
                    <span className="text-lg">UPI</span>
                  </div>
                </div>
              </div>

              <div className="bg-white w-auto mt-3 p-5 max-sm:p-2">
                {deliveryItems?.length > 0 ? (
                  <div className="px-1 py-1 ">
                    <h2 className="text-lg">Items and Review Products</h2>

                    {deliveryItems.map((item) => {
                      let price = (item.price * item.discountPercentage) / 100;
                      let Totalprice = item.price - price;
                      return (
                        <div className="flex ring rounded-xl h-auto  mt-5 max-md:flex-col">
                          <div className=" w-auto shrink-0 max-md:h-60  rounded-xl bg-gray-200 border-r">
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="bg-gray-100 py-4 px-3 w-full text-wrap rounded-xl">
                            <h2 className=" text-xl font-medium">
                              {item.title}
                            </h2>
                            <p className="mt-2 text-base font-normal text-gray-700 ">
                              {item.description}
                            </p>
                            <p className="mt-2 font-medium text-gray-700">
                              {" "}
                              <span className="text-xl font-medium">
                                ₹{Totalprice.toFixed(2)}{" "}
                              </span>
                              M.R.P{" "}
                              <span className="line-through">
                                ₹{item.price}
                              </span>
                              <span>({item.discountPercentage}% off)</span>
                            </p>
                            <p>
                              <span className="font-medium">Brand :</span>{" "}
                              {item.brand}
                            </p>
                            <div className="w-49 max-sm:w-auto mt-5">
                              <Addcart item={item} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div>Items and Shipping</div>
                )}
              </div>
            </>
          ) : (
            <>
            <div className="w-full">
              <div className="bg-white min-h-[100px]   h-auto  p-5">
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
              </div>
            </>
          )}
        </div>

        {deliveryItems?.length && address.length > 0 ? (
          <div className="bg-white min-h-[100px]  h-auto min-w-xs max-sm:min-w-full  p-3 ">
            <div className="flex flex-col gap-2 mb-2">
              <h2 className="text-center text-lg font-medium">Order Summary</h2>
              <p>
                <span className="inline-block w-23">Items :</span>{" "}
                {totalItems}{" "}
              </p>
              <p>
                {" "}
                <span className="inline-block w-21">TotalPrice : </span> ₹{" "}
                {totalprice.toFixed(2)}
              </p>
              <p>
                <span className="inline-block w-21">Discount :</span> ₹{" "}
                {discount.toFixed(2)}{" "}
              </p>
              {ispaymet && (
                <div className="text-lg font-medium text-gray-700">
                  <span>Payment : </span>
                  <span>{ispaymet}</span>
                </div>
              )}

              <p className="text-lg font-normal">Order Total: <span className="font-medium">₹ {ordertotal.toFixed(2)}</span></p>
            </div>
            {!ispaymet ? (
              <p className="bg-red-400 text-base py-1 rounded-xl text-white text-center">Please Select a Payment Method</p>
            ):
            (
              <button onClick={handlePlaceorder} disabled={!ispaymet} className="bg-yellow-400 cursor-pointer py-1 rounded-xl w-full">
              Pay With {ispaymet}
            </button>
            )
            }


          </div>
        ) : (
          <div className="bg-white min-h-[100px]  h-auto min-w-xs max-sm:min-w-full  p-3 ">
            <div className="flex flex-col gap-2 mb-2">
              <p>
                <span className="inline-block ">Items : ------</span>
              </p>
              <p>
                {" "}
                <span className="inline-block ">TotalPrice : ------ </span>
              </p>
              <p>
                <span className="inline-block ">Discount : ------</span>
              </p>
              <p>Order Total: ------</p>
            </div>
            <button disabled className="bg-yellow-400 cursor-not-allowed py-1 rounded-xl w-full">
              Place Your Order
            </button>
          </div>
        )}
      </section>
      {addressOpen && <Form setAddressOpen={setAddressOpen} />}
    </>
  );
};

export default Checkout;
