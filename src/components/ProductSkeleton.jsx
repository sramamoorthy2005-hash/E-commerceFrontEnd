import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 animate-pulse flex flex-col gap-3">
      {/* Product Image placeholder */}
      <div className="w-full h-48 bg-gray-300 rounded-lg"></div>

      {/* Title placeholder */}
      <div className="h-5 bg-gray-300 rounded w-3/4"></div>

      {/* Category / Description placeholder */}
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>

      {/* Price & Discount placeholder */}
      <div className="flex items-center justify-between mt-2">
        <div className="h-6 bg-gray-300 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>

      {/* Add to Cart button placeholder */}
      <div className="h-10 bg-gray-300 rounded-lg w-full mt-2"></div>
    </div>
  );
};

export default ProductSkeleton;