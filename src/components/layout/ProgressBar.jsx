// src/components/layout/ProgressBar.jsx - Simplified and aesthetic
import React, { useEffect, useState } from "react";
import { Award, Target } from "lucide-react";

const ProgressBar = ({
  current,
  total,
  visitedSections = new Set(),
  completedSections = new Set(),
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [animatedCompleted, setAnimatedCompleted] = useState(0);

  const currentPercentage = (current / total) * 100;
  const completedPercentage = (completedSections.size / total) * 100;

  useEffect(() => {
    const timer1 = setTimeout(
      () => setAnimatedProgress(currentPercentage),
      200
    );
    const timer2 = setTimeout(
      () => setAnimatedCompleted(completedPercentage),
      400
    );

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [currentPercentage, completedPercentage]);

  return (
    <div className="mb-8">
      <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/40 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-medium">Learning Progress</h3>
          <div className="text-2xl font-bold text-blue-400">
            {Math.round(animatedCompleted)}%
          </div>
        </div>

        <div className="space-y-4">
          {/* Current Position */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300">Current Position</span>
              </div>
              <span className="text-sm text-blue-400">
                {current} of {total}
              </span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${animatedProgress}%` }}
              />
            </div>
          </div>

          {/* Completion Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">Completed</span>
              </div>
              <span className="text-sm text-green-400">
                {completedSections.size} of {total}
              </span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${animatedCompleted}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3 text-center">
            <div className="text-blue-400 text-lg font-semibold">
              {visitedSections.size}
            </div>
            <div className="text-blue-300 text-xs">Explored</div>
          </div>
          <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-3 text-center">
            <div className="text-green-400 text-lg font-semibold">
              {completedSections.size}
            </div>
            <div className="text-green-300 text-xs">Completed</div>
          </div>
          <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-3 text-center">
            <div className="text-purple-400 text-lg font-semibold">
              {total - visitedSections.size}
            </div>
            <div className="text-purple-300 text-xs">Remaining</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
