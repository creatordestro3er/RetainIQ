"use client";

import React from 'react';

const Variant = ({ variant, index, handleVariantChange, addDesign }) => {
  return (
    <div className="flex-1 border border-gray-300 rounded-lg p-4 m-2">
      {variant ? (
        <div className="relative">
          <img src={variant} alt={`Variant ${index + 1}`} className="w-full h-full object-cover" />
          <button
            onClick={() => addDesign()}
            className="absolute top-2 right-2 p-2 bg-white text-black border border-gray-300 rounded-lg"
          >
            Edit
          </button>
        </div>
      ) : (
        <button
          onClick={() => addDesign()}
          className="w-full h-full p-4 border border-dashed border-gray-300 rounded-lg text-gray-500 flex justify-center items-center"
        >
          + Add design
        </button>
      )}
    </div>
  );
};

export default Variant;
