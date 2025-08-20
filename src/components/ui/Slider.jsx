// src/components/ui/Slider.jsx - Enhanced with animations and better UX
import React, { useState, useEffect, useRef, forwardRef } from "react";

const Slider = forwardRef(
  (
    {
      label,
      min = 0,
      max = 100,
      step = 1,
      value,
      onChange,
      className = "",
      disabled = false,
      showValue = true,
      showMinMax = false,
      showTicks = false,
      tickStep,
      formatValue = (val) => val,
      color = "blue",
      size = "medium",
      orientation = "horizontal",
      tooltip = true,
      unit = "",
      description,
      ...props
    },
    ref
  ) => {
    const [isDragging, setIsDragging] = useState(false);
    const [localValue, setLocalValue] = useState(value);
    const [showTooltip, setShowTooltip] = useState(false);
    const sliderRef = useRef(null);
    const thumbRef = useRef(null);

    const percentage = ((localValue - min) * 100) / (max - min);
    const actualStep = step || (max - min) / 100;

    // Color themes
    const colors = {
      blue: {
        track: "bg-blue-500",
        thumb: "bg-blue-500 border-blue-400 shadow-blue-500/50",
        fill: "bg-gradient-to-r from-blue-400 to-blue-500",
      },
      green: {
        track: "bg-green-500",
        thumb: "bg-green-500 border-green-400 shadow-green-500/50",
        fill: "bg-gradient-to-r from-green-400 to-green-500",
      },
      purple: {
        track: "bg-purple-500",
        thumb: "bg-purple-500 border-purple-400 shadow-purple-500/50",
        fill: "bg-gradient-to-r from-purple-400 to-purple-500",
      },
      red: {
        track: "bg-red-500",
        thumb: "bg-red-500 border-red-400 shadow-red-500/50",
        fill: "bg-gradient-to-r from-red-400 to-red-500",
      },
      orange: {
        track: "bg-orange-500",
        thumb: "bg-orange-500 border-orange-400 shadow-orange-500/50",
        fill: "bg-gradient-to-r from-orange-400 to-orange-500",
      },
    };

    // Size variants
    const sizes = {
      small: {
        track: "h-1.5",
        thumb: "w-4 h-4",
        label: "text-xs",
      },
      medium: {
        track: "h-2",
        thumb: "w-5 h-5",
        label: "text-sm",
      },
      large: {
        track: "h-3",
        thumb: "w-6 h-6",
        label: "text-base",
      },
    };

    // Sync with external value changes
    useEffect(() => {
      if (value !== localValue && !isDragging) {
        setLocalValue(value);
      }
    }, [value, localValue, isDragging]);

    const handleChange = (newValue) => {
      const clampedValue = Math.min(max, Math.max(min, newValue));
      setLocalValue(clampedValue);
      onChange?.(clampedValue);
    };

    const handleMouseDown = () => {
      if (disabled) return;
      setIsDragging(true);
      setShowTooltip(true);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setShowTooltip(false);
    };

    // Generate tick marks
    const generateTicks = () => {
      if (!showTicks) return [];
      const stepSize = tickStep || (max - min) / 10;
      const ticks = [];
      for (let i = min; i <= max; i += stepSize) {
        ticks.push(i);
      }
      return ticks;
    };

    const ticks = generateTicks();

    // Keyboard handling
    const handleKeyDown = (e) => {
      if (disabled) return;

      let newValue = localValue;
      switch (e.key) {
        case "ArrowLeft":
        case "ArrowDown":
          e.preventDefault();
          newValue = localValue - actualStep;
          break;
        case "ArrowRight":
        case "ArrowUp":
          e.preventDefault();
          newValue = localValue + actualStep;
          break;
        case "Home":
          e.preventDefault();
          newValue = min;
          break;
        case "End":
          e.preventDefault();
          newValue = max;
          break;
        case "PageDown":
          e.preventDefault();
          newValue = localValue - (max - min) * 0.1;
          break;
        case "PageUp":
          e.preventDefault();
          newValue = localValue + (max - min) * 0.1;
          break;
      }

      if (newValue !== localValue) {
        handleChange(newValue);
      }
    };

    useEffect(() => {
      const handleGlobalMouseUp = () => {
        setIsDragging(false);
        setShowTooltip(false);
      };

      if (isDragging) {
        document.addEventListener("mouseup", handleGlobalMouseUp);
        document.addEventListener("mouseleave", handleGlobalMouseUp);

        return () => {
          document.removeEventListener("mouseup", handleGlobalMouseUp);
          document.removeEventListener("mouseleave", handleGlobalMouseUp);
        };
      }
    }, [isDragging]);

    return (
      <div className={`space-y-3 ${className}`}>
        {/* Label and value */}
        {(label || showValue) && (
          <div className="flex items-center justify-between">
            {label && (
              <label
                className={`font-medium text-gray-300 ${sizes[size].label} ${
                  disabled ? "opacity-50" : ""
                }`}
              >
                {label}
              </label>
            )}

            {showValue && (
              <div className="flex items-center space-x-2">
                <span
                  className={`font-mono ${sizes[size].label} ${
                    isDragging
                      ? `${colors[color].track.replace("bg-", "text-")} font-bold`
                      : "text-gray-400"
                  } transition-colors duration-200`}
                >
                  {formatValue(localValue)}
                  {unit}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Description */}
        {description && <p className="text-xs text-gray-500">{description}</p>}

        {/* Slider container */}
        <div className="relative">
          {/* Min/Max labels */}
          {showMinMax && (
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>
                {formatValue(min)}
                {unit}
              </span>
              <span>
                {formatValue(max)}
                {unit}
              </span>
            </div>
          )}

          {/* Slider track */}
          <div className="relative">
            <input
              ref={sliderRef}
              type="range"
              min={min}
              max={max}
              step={actualStep}
              value={localValue}
              onChange={(e) => handleChange(Number(e.target.value))}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onKeyDown={handleKeyDown}
              onMouseEnter={() => tooltip && setShowTooltip(true)}
              onMouseLeave={() => !isDragging && setShowTooltip(false)}
              className={`
              w-full appearance-none bg-transparent cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
              focus:ring-${color}-500 rounded-lg
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
              style={{
                background: `linear-gradient(to right, 
                ${colors[color].fill.replace("bg-gradient-to-r from-", "").replace(" to-", ", ")} ${percentage}%, 
                #374151 ${percentage}%)`,
              }}
              disabled={disabled}
              {...props}
            />

            {/* Custom track styling */}
            <div
              className={`absolute top-1/2 left-0 right-0 ${sizes[size].track} -translate-y-1/2 bg-gray-700 rounded-full pointer-events-none`}
            >
              <div
                className={`h-full ${colors[color].fill} rounded-full transition-all duration-200 relative overflow-hidden`}
                style={{ width: `${percentage}%` }}
              >
                {/* Animated shine effect */}
                {isDragging && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                )}
              </div>
            </div>

            {/* Custom thumb */}
            <div
              ref={thumbRef}
              className={`
              absolute top-1/2 ${sizes[size].thumb} -translate-y-1/2 -translate-x-1/2
              ${colors[color].thumb} rounded-full border-2 border-white
              shadow-lg transition-all duration-200 pointer-events-none
              ${isDragging ? "scale-125 shadow-xl" : "hover:scale-110"}
              ${disabled ? "opacity-50" : ""}
            `}
              style={{ left: `${percentage}%` }}
            >
              {/* Inner glow */}
              <div className="absolute inset-0.5 bg-white/20 rounded-full"></div>
            </div>

            {/* Tooltip */}
            {tooltip && showTooltip && (
              <div
                className="absolute bottom-full mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg shadow-xl pointer-events-none transform -translate-x-1/2 transition-all duration-200"
                style={{ left: `${percentage}%` }}
              >
                {formatValue(localValue)}
                {unit}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            )}
          </div>

          {/* Tick marks */}
          {showTicks && ticks.length > 0 && (
            <div className="absolute top-full mt-1 left-0 right-0">
              {ticks.map((tick) => {
                const tickPercentage = ((tick - min) * 100) / (max - min);
                return (
                  <div
                    key={tick}
                    className="absolute w-px h-2 bg-gray-600"
                    style={{ left: `${tickPercentage}%` }}
                  >
                    <span className="absolute top-full mt-1 text-xs text-gray-500 transform -translate-x-1/2 whitespace-nowrap">
                      {formatValue(tick)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";

// Range slider component (dual thumb)
export const RangeSlider = ({
  label,
  min = 0,
  max = 100,
  step = 1,
  value = [25, 75],
  onChange,
  className = "",
  ...props
}) => {
  const [localValue, setLocalValue] = useState(value);

  const handleMinChange = (newMin) => {
    const newValue = [Math.min(newMin, localValue[1]), localValue[1]];
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  const handleMaxChange = (newMax) => {
    const newValue = [localValue[0], Math.max(newMax, localValue[0])];
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-300">{label}</label>
          <span className="text-sm font-mono text-gray-400">
            {localValue[0]} - {localValue[1]}
          </span>
        </div>
      )}

      <div className="relative">
        <Slider
          min={min}
          max={max}
          step={step}
          value={localValue[0]}
          onChange={handleMinChange}
          className="absolute"
          showValue={false}
          color="blue"
          {...props}
        />
        <Slider
          min={min}
          max={max}
          step={step}
          value={localValue[1]}
          onChange={handleMaxChange}
          showValue={false}
          color="purple"
          {...props}
        />
      </div>
    </div>
  );
};

// Vertical slider variant
export const VerticalSlider = ({ height = "200px", ...props }) => (
  <div style={{ height }} className="flex items-center justify-center">
    <Slider
      {...props}
      orientation="vertical"
      className="transform -rotate-90"
      style={{ width: height }}
    />
  </div>
);

export default Slider;
