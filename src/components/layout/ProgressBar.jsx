import React from "react";

const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="mb-8">
      <div className="bg-gray-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-400">
        <span>Progress</span>
        <span>
          {current} of {total}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
