// src/components/layout/Footer.jsx - Clean and simplified
import React, { useState, useEffect } from "react";
import {
  Github,
  Mail,
  Globe,
  BookOpen,
  Award,
  Users,
  Star,
} from "lucide-react";

const Footer = ({ progressStats = {} }) => {
  const [currentYear] = useState(new Date().getFullYear());
  const [sessionTime, setSessionTime] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setSessionTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const { completedPercentage = 0, isFullyCompleted = false } = progressStats;

  return (
    <footer className="mt-16">
      <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold">QuazarEdu</h3>
                <p className="text-gray-400 text-xs">Interactive Learning</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Interactive physics education through engaging simulations and
              visualizations.
            </p>

            <div className="flex space-x-2">
              <a
                href="#"
                className="p-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4 text-gray-400" />
              </a>
              <a
                href="mailto:info@quazaredu.com"
                className="p-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors"
                title="Contact"
              >
                <Mail className="w-4 h-4 text-gray-400" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors"
                title="Website"
              >
                <Globe className="w-4 h-4 text-gray-400" />
              </a>
            </div>
          </div>

          {/* Session Stats */}
          <div>
            <h4 className="text-white font-medium mb-3 flex items-center">
              <Users className="w-4 h-4 mr-2 text-green-400" />
              Your Session
            </h4>
            <div className="space-y-3">
              <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3">
                <div className="text-blue-400 font-semibold">
                  {formatTime(sessionTime)}
                </div>
                <div className="text-blue-300 text-xs">Learning Time</div>
              </div>

              <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-3">
                <div className="text-purple-400 font-semibold">
                  {Math.round(completedPercentage)}%
                </div>
                <div className="text-purple-300 text-xs">Progress</div>
              </div>

              {isFullyCompleted && (
                <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-green-400" />
                    <span className="text-green-300 text-xs font-medium">
                      Course Complete!
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Course Info */}
          <div>
            <h4 className="text-white font-medium mb-3 flex items-center">
              <Star className="w-4 h-4 mr-2 text-yellow-400" />
              Course Details
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Subject:</span>
                <span className="text-white">Physics - Waves</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Level:</span>
                <span className="text-white">Class 10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Duration:</span>
                <span className="text-white">~30 minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Sections:</span>
                <span className="text-white">5 Interactive</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-green-900/20 border border-green-700/30 rounded-lg">
              <div className="flex items-center space-x-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <div className="text-green-300 text-xs">Highly Rated Course</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700/30 mt-6 pt-6 text-center text-sm text-gray-500">
          <div className="mb-2">
            © {currentYear} QuazarEdu Interactive Learning Platform
          </div>
          <div className="text-xs text-gray-600">
            Version 2.1.0 | Physics Waves Module | Last Updated: December 2024
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
