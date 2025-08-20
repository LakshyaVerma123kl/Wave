// src/components/ui/Card.jsx - Enhanced with animations and variants
import React, { forwardRef } from "react";

const Card = forwardRef(
  (
    {
      children,
      className = "",
      padding = "p-6",
      background = "bg-gray-800/50",
      variant = "default",
      interactive = false,
      loading = false,
      header,
      footer,
      onClick,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: "backdrop-blur-sm border border-gray-700/50",
      elevated:
        "backdrop-blur-sm border border-gray-700/50 shadow-xl hover:shadow-2xl transform hover:-translate-y-1",
      glass: "backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl",
      gradient:
        "bg-gradient-to-br from-gray-800/50 via-gray-700/30 to-gray-600/20 border border-gray-600/30 backdrop-blur-sm",
      success: "bg-green-900/20 border border-green-700/50 backdrop-blur-sm",
      warning: "bg-yellow-900/20 border border-yellow-700/50 backdrop-blur-sm",
      error: "bg-red-900/20 border border-red-700/50 backdrop-blur-sm",
      info: "bg-blue-900/20 border border-blue-700/50 backdrop-blur-sm",
    };

    const baseClasses = "rounded-xl transition-all duration-300 ease-out";

    const interactiveClasses = interactive
      ? "cursor-pointer hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg"
      : "";

    const loadingClasses = loading ? "animate-pulse pointer-events-none" : "";

    const classes = `${baseClasses} ${variants[variant]} ${background} ${padding} ${interactiveClasses} ${loadingClasses} ${className}`;

    const CardContent = () => (
      <>
        {header && (
          <div className="mb-4 pb-4 border-b border-gray-700/30">{header}</div>
        )}

        {loading ? (
          <div className="space-y-3">
            <div className="h-4 bg-gray-700 rounded animate-shimmer"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4 animate-shimmer"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 animate-shimmer"></div>
          </div>
        ) : (
          children
        )}

        {footer && (
          <div className="mt-4 pt-4 border-t border-gray-700/30">{footer}</div>
        )}
      </>
    );

    if (onClick) {
      return (
        <button
          ref={ref}
          className={`${classes} text-left w-full`}
          onClick={onClick}
          {...props}
        >
          <CardContent />
        </button>
      );
    }

    return (
      <div ref={ref} className={classes} {...props}>
        <CardContent />
      </div>
    );
  }
);

Card.displayName = "Card";

// Card subcomponents for better composition
export const CardHeader = ({ children, className = "" }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = "", level = 2 }) => {
  const Tag = `h${level}`;
  return (
    <Tag className={`font-semibold text-white ${className}`}>{children}</Tag>
  );
};

export const CardDescription = ({ children, className = "" }) => (
  <p className={`text-gray-400 text-sm ${className}`}>{children}</p>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={`${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = "" }) => (
  <div className={`mt-4 pt-4 border-t border-gray-700/30 ${className}`}>
    {children}
  </div>
);

// Specialized card variants
export const FeatureCard = ({ icon, title, description, action, ...props }) => (
  <Card variant="elevated" interactive {...props}>
    <div className="text-center space-y-4">
      <div className="mx-auto w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
      {action && <div className="pt-2">{action}</div>}
    </div>
  </Card>
);

export const StatCard = ({ label, value, change, icon, color = "blue" }) => {
  const colorClasses = {
    blue: "text-blue-400 bg-blue-500/20",
    green: "text-green-400 bg-green-500/20",
    red: "text-red-400 bg-red-500/20",
    yellow: "text-yellow-400 bg-yellow-500/20",
    purple: "text-purple-400 bg-purple-500/20",
  };

  return (
    <Card variant="glass" padding="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          {change && (
            <p
              className={`text-xs ${change > 0 ? "text-green-400" : "text-red-400"}`}
            >
              {change > 0 ? "+" : ""}
              {change}%
            </p>
          )}
        </div>
        {icon && (
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>{icon}</div>
        )}
      </div>
    </Card>
  );
};

export const NotificationCard = ({
  type = "info",
  title,
  message,
  onDismiss,
}) => {
  const typeStyles = {
    info: "bg-blue-900/20 border-blue-700/50 text-blue-300",
    success: "bg-green-900/20 border-green-700/50 text-green-300",
    warning: "bg-yellow-900/20 border-yellow-700/50 text-yellow-300",
    error: "bg-red-900/20 border-red-700/50 text-red-300",
  };

  return (
    <Card className={typeStyles[type]} padding="p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {title && <h4 className="font-semibold mb-1">{title}</h4>}
          <p className="text-sm opacity-90">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-4 text-gray-400 hover:text-white transition-colors"
          >
            ×
          </button>
        )}
      </div>
    </Card>
  );
};

export default Card;
