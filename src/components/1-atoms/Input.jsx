function Input({ type = "text", placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 border-2 border-[#AFAFAF] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-[#434343] font-sans placeholder-opacity-50"
    />
  );
}
export default Input;
