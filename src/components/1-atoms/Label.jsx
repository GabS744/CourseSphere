import React from "react";

function Label({ children }) {
  return (
    <label className="text-[18px] font-bold text-[#434343] mb-1 block font-sans">
      {children}
    </label>
  );
}
export default Label;
