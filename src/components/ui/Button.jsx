// src/components/ui/Button.jsx - Enhanced with variants, states, and accessibility
import React, { forwardRef } from "react";
import { Loader2 } from "lucide-react";

const Button = forwardRef(
  (
    {
      children,
      onClick,
      className = "",
      disabled = false,
      loading = false,
      variant = "primary",
      size = "medium",
      fullWidth = false,
      leftIcon,
      rightIcon,
      loadingText = "Loading...",
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 active:scale-95 select-none";

    const variants = {
      primary:
        "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl focus:ring-blue-500",
      secondary:
        "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white shadow-lg hover:shadow-xl focus:ring-gray-500",
      success:
        "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl focus:ring-green-500",
      danger:
        "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl focus:ring-red-500",
      warning:
        "bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white shadow-lg hover:shadow-xl focus:ring-yellow-500",
      outline:
        "border-2 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white hover:border-gray-500 focus:ring-gray-500",
      ghost:
        "text-gray-300 hover:bg-gray-800/50 hover:text-white focus:ring-gray-500",
      link: "text-blue-400 hover:text-blue-300 underline-offset-4 hover:underline focus:ring-blue-500 p-0",
      gradient:
        "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl focus:ring-purple-500",
      glass:
        "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 shadow-xl hover:shadow-2xl focus:ring-white/50",
    };

    const sizes = {
      small: "px-3 py-2 text-sm h-8",
      medium: "px-4 py-2.5 text-base h-10",
      large: "px-6 py-3 text-lg h-12",
      xlarge: "px-8 py-4 text-xl h-14",
    };

    const disabledClasses =
      "opacity-50 cursor-not-allowed transform-none hover:transform-none active:scale-100 pointer-events-none";
    const loadingClasses = loading ? "cursor-wait" : "";
    const fullWidthClasses = fullWidth ? "w-full" : "";

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${
      disabled || loading ? disabledClasses : ""
    } ${loadingClasses} ${fullWidthClasses} ${className}`;

    const handleClick = (e) => {
      if (disabled || loading) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        onClick={handleClick}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {/* Left icon or loading spinner */}
        {loading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          leftIcon && <span className="mr-2 flex-shrink-0">{leftIcon}</span>
        )}

        {/* Button text */}
        <span className="truncate">{loading ? loadingText : children}</span>

        {/* Right icon */}
        {!loading && rightIcon && (
          <span className="ml-2 flex-shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

// Button group component for related actions
export const ButtonGroup = ({
  children,
  className = "",
  orientation = "horizontal",
  size = "medium",
  variant = "primary",
}) => {
  const orientationClasses = {
    horizontal: "flex-row",
    vertical: "flex-col",
  };

  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      const isFirst = index === 0;
      const isLast = index === React.Children.count(children) - 1;

      let roundedClasses = "";
      if (orientation === "horizontal") {
        if (isFirst) roundedClasses = "rounded-r-none";
        else if (isLast) roundedClasses = "rounded-l-none";
        else roundedClasses = "rounded-none";
      } else {
        if (isFirst) roundedClasses = "rounded-b-none";
        else if (isLast) roundedClasses = "rounded-t-none";
        else roundedClasses = "rounded-none";
      }

      return React.cloneElement(child, {
        size: child.props.size || size,
        variant: child.props.variant || variant,
        className: `${child.props.className || ""} ${roundedClasses} ${
          orientation === "horizontal" && !isLast ? "-mr-px" : ""
        } ${orientation === "vertical" && !isLast ? "-mb-px" : ""}`,
      });
    }
    return child;
  });

  return (
    <div
      className={`inline-flex ${orientationClasses[orientation]} ${className}`}
    >
      {childrenWithProps}
    </div>
  );
};

// Icon button component
export const IconButton = forwardRef(
  (
    {
      icon,
      "aria-label": ariaLabel,
      tooltip,
      size = "medium",
      variant = "ghost",
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      small: "w-8 h-8 p-1",
      medium: "w-10 h-10 p-2",
      large: "w-12 h-12 p-3",
    };

    return (
      <Button
        ref={ref}
        variant={variant}
        className={`${sizeClasses[size]} !px-0 !py-0 relative group`}
        aria-label={ariaLabel}
        title={tooltip || ariaLabel}
        {...props}
      >
        {icon}

        {/* Tooltip */}
        {tooltip && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            {tooltip}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";

// Floating Action Button
export const FAB = forwardRef(
  ({ icon, className = "", size = "medium", ...props }, ref) => {
    const sizeClasses = {
      small: "w-12 h-12",
      medium: "w-14 h-14",
      large: "w-16 h-16",
    };

    return (
      <Button
        ref={ref}
        variant="gradient"
        className={`${sizeClasses[size]} !px-0 !py-0 rounded-full shadow-2xl hover:shadow-3xl fixed bottom-6 right-6 z-40 ${className}`}
        {...props}
      >
        {icon}
      </Button>
    );
  }
);

FAB.displayName = "FAB";

// Loading button with progress
export const ProgressButton = forwardRef(
  ({ progress = 0, children, ...props }, ref) => {
    return (
      <Button ref={ref} className="relative overflow-hidden" {...props}>
        <div
          className="absolute inset-0 bg-white/20 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
        <span className="relative z-10">{children}</span>
      </Button>
    );
  }
);

ProgressButton.displayName = "ProgressButton";

// Toggle button component
export const ToggleButton = forwardRef(
  (
    {
      pressed = false,
      onPressedChange,
      pressedText,
      unpressedText,
      children,
      ...props
    },
    ref
  ) => {
    const handleClick = (e) => {
      onPressedChange?.(!pressed);
      props.onClick?.(e);
    };

    return (
      <Button
        ref={ref}
        variant={pressed ? "primary" : "outline"}
        onClick={handleClick}
        aria-pressed={pressed}
        {...props}
      >
        {pressed ? pressedText || children : unpressedText || children}
      </Button>
    );
  }
);

ToggleButton.displayName = "ToggleButton";

export default Button;
