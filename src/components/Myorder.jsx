import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Myorder = () => {
  const nav = useNavigate();
  const orders = useSelector((state) => state.order?.order || []);

  return (
    <section className="bg-orange-50 min-h-[90vh] py-6 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] bg-white rounded-2xl shadow-sm p-6 text-center">
            <p className="text-lg text-gray-600 mb-4">You have no orders yet!</p>
            <button
              onClick={() => nav("/")}
              className="bg-yellow-400 hover:bg-yellow-500 font-medium py-2 px-6 rounded-xl cursor-pointer"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {orders.map((item, index) => (
              <div
                key={item.orderId || index}
                className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden"
              >
                {/* Order Top Bar */}
                <div className="bg-gray-100 p-4 border-b flex flex-wrap justify-between items-center gap-2">
                  <div className="flex flex-wrap gap-4 text-sm">
                    <p>
                      <span className="text-gray-500">Order Placed: </span>
                      <span className="font-semibold">{item.date}</span>
                    </p>
                    <p>
                      <span className="text-gray-500">Order ID: </span>
                      <span className="font-semibold text-sky-700">{item.orderId}</span>
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Total: </span>
                    <span className="font-bold text-lg text-gray-900">
                      ₹{Number(item.totalAmount || 0).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Order Info & Address */}
                <div className="p-4 sm:p-6 flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b text-sm">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">Delivering to:</h4>
                      {item.address ? (
                        <p className="text-gray-600">
                          <span className="font-medium text-black">{item.address.name}</span>
                          <br />
                          {item.address.street}, {item.address.house}, {item.address.city}
                          <br />
                          {item.address.pincode}, {item.address.country}
                        </p>
                      ) : (
                        <p className="text-gray-400">No address found</p>
                      )}
                    </div>
                    <div className="md:text-right">
                      <h4 className="font-semibold text-gray-700 mb-1">Payment Method:</h4>
                      <p className="font-medium text-emerald-600">{item.paymentmethod}</p>
                      <p className="text-gray-500 text-xs mt-1">Total Items: {item.itemscount}</p>
                    </div>
                  </div>

                  {/* Ordered Items List */}
                  <div className="flex flex-col gap-3">
                    <h4 className="font-semibold text-gray-700">Products:</h4>
                    {item.Orderitems?.map((prod) => {
                      const discount = (prod.price * (prod.discountPercentage || 0)) / 100;
                      const finalPrice = prod.price - discount;

                      return (
                        <div
                          key={prod.id}
                          className="flex items-center gap-4 border border-gray-100 rounded-xl p-3 bg-gray-50"
                        >
                          <div onClick={() => nav(`/product/${prod.id}`)} className="w-16 h-16 shrink-0 bg-white rounded-lg p-1 border flex items-center justify-center">
                            <img
                              src={prod.thumbnail}
                              alt={prod.title}
                              className="w-full h-full object-contain"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h5
                              onClick={() => nav(`/product/${prod.id}`)}
                              className="font-medium text-gray-800 truncate cursor-pointer hover:underline"
                            >
                              {prod.title}
                            </h5>
                            <p className="text-xs text-gray-500 mt-0.5">
                              Quantity: <span className="font-semibold">{prod.quantity || 1}</span>
                            </p>
                            <p className="text-sm font-semibold text-gray-900 mt-1">
                              ₹{(finalPrice * (prod.quantity || 1)).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Myorder;