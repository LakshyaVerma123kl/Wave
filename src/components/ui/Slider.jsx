import React from "react";

const Slider = ({
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  className = "",
  ...props
}) => {
  const percentage = ((value - min) * 100) / (max - min);

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          background: `linear-gradient(to right, #f97316 ${percentage}%, #374151 ${percentage}%)`,
        }}
        className={`
          w-full h-2 rounded-lg appearance-none bg-gray-700
          transition-[background] duration-150
          focus:outline-none
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-white
          [&::-webkit-slider-thumb]:shadow-md
          [&::-webkit-slider-thumb]:transition-all
          [&::-webkit-slider-thumb]:hover:scale-110
          [&::-moz-range-thumb]:h-4
          [&::-moz-range-thumb]:w-4
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-white
          [&::-moz-range-thumb]:shadow-md
        `}
        {...props}
      />
    </div>
  );
};

export default Slider;
