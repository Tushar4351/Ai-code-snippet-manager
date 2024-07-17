import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-row gap-2">
      <div className="animate-pulse bg-gray-300 w-10 h-10 rounded-full"></div>
      <div className="flex flex-col gap-1">
        <div className="animate-pulse bg-gray-300 w-24 h-4 rounded-full"></div>
        <div className="animate-pulse bg-gray-300 w-36 h-4 rounded-full"></div>
      </div>
    </div>
  );
};

export default Loader;
