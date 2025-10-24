function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
  disabled = false,
}) {
  const baseClasses =
    "px-6 py-2 font-semibold rounded-lg shadow-md transition-colors duration-200";

  const variantClasses = {
    primary: "bg-[#34D399]  text-white hover:bg-green-600",
    danger: "bg-red-500 text-white hover:bg-red-800",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  const disabledClasses = "disabled:bg-gray-400 disabled:cursor-not-allowed";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses}`}
    >
      {children}
    </button>
  );
}

export default Button;
