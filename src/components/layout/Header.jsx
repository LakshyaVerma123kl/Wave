// src/components/layout/Header.jsx - Simplified without theme toggle
import React, { useState, useEffect } from "react";
import { Waves, Award, BookOpen } from "lucide-react";

const Header = ({ progressStats = {} }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    let message = "";

    if (hour < 12) {
      message = "Good morning! Ready to learn about waves?";
    } else if (hour < 17) {
      message = "Good afternoon! Let's dive into wave physics!";
    } else {
      message = "Good evening! Time for some wave exploration!";
    }

    setWelcomeMessage(message);
  }, [currentTime]);

  const {
    visitedPercentage = 0,
    completedPercentage = 0,
    isFullyCompleted = false,
  } = progressStats;

  return (
    <header className="text-center mb-8">
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-400">
          {currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>

        <div className="flex items-center space-x-3">
          {visitedPercentage > 0 && (
            <div className="flex items-center space-x-2 bg-blue-900/30 px-3 py-1 rounded-full border border-blue-700/30">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-sm">
                {visitedPercentage}% Explored
              </span>
            </div>
          )}

          {completedPercentage > 0 && (
            <div className="flex items-center space-x-2 bg-green-900/30 px-3 py-1 rounded-full border border-green-700/30">
              <Award className="w-4 h-4 text-green-400" />
              <span className="text-green-300 text-sm">
                {completedPercentage}% Complete
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
              <Waves className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Waves
            </h1>
          </div>
        </div>

        <p className="text-xl text-gray-300 font-medium mb-2">
          Interactive Physics Learning
        </p>
        <p className="text-gray-400 text-sm italic">{welcomeMessage}</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <p className="text-lg text-gray-300 leading-relaxed">
          Explore wave physics through
          <span className="text-blue-400 font-medium">
            {" "}
            interactive simulations
          </span>
          ,
          <span className="text-purple-400 font-medium">
            {" "}
            engaging visualizations
          </span>
          , and
          <span className="text-green-400 font-medium"> hands-on learning</span>
        </p>
      </div>
    </header>
  );
};

export default Header;
