import React from "react";

function Button({ children }) {
  return (
    <button className="items-center px-8 py-2 font-bold text-white bg-[#34D399] rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
      {children}
    </button>
  );
}
export default Button;
