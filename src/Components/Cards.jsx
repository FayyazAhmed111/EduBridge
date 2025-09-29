import React from "react";
import clsx from "clsx";

export function Card({ children, className, ...props }) {
  return (
    <div
      className={clsx(
        "bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className, ...props }) {
  return (
    <div
      className={clsx("p-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}
