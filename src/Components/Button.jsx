import React from "react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  let baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  let variants = {
    primary:
      "bg-[oklch(79.2%_0.209_151.711)] text-white hover:bg-blue-700 focus:ring-blue-500",
    outline:
      "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  let sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  let combined =
    baseStyles + " " + variants[variant] + " " + sizes[size] + " " + className;

  return (
    <button className={combined} {...props}>
      {children}
    </button>
  );
}
