import React from "react";

const Card = ({
  children,
  className = "",
  padding = "p-6",
  background = "bg-gray-800",
  ...props
}) => {
  const baseClasses = "rounded-lg border border-gray-700";
  const classes = `${baseClasses} ${background} ${padding} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;
