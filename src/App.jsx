// src/App.jsx - Updated with missing imports
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import ProgressBar from "./components/layout/ProgressBar";
import Footer from "./components/layout/Footer";
import IntroSection from "./components/sections/IntroSection";
import PropertiesSection from "./components/sections/PropertiesSection";
import TypesSection from "./components/sections/TypesSection";
import SimulationSection from "./components/sections/SimulationSection";
import QuizSection from "./components/sections/QuizSection";
import { sections } from "./data/sections";
import "./index.css";
function App() {
  const [currentSection, setCurrentSection] = useState(0);

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return <IntroSection />;
      case 1:
        return <PropertiesSection />;
      case 2:
        return <TypesSection />;
      case 3:
        return <SimulationSection />;
      case 4:
        return <QuizSection />;
      default:
        return <IntroSection />;
    }
  };

  const goToPrevious = () => {
    setCurrentSection((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentSection((prev) => Math.min(sections.length - 1, prev + 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <Navigation
          sections={sections}
          currentSection={currentSection}
          onSectionChange={setCurrentSection}
        />

        <ProgressBar current={currentSection + 1} total={sections.length} />

        <div className="max-w-6xl mx-auto animate-fadeIn">
          {renderSection()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 max-w-6xl mx-auto">
          <button
            onClick={goToPrevious}
            disabled={currentSection === 0}
            className="flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Section {currentSection + 1} of {sections.length}
            </p>
            <p className="text-white font-semibold">
              {sections[currentSection].title}
            </p>
          </div>

          <button
            onClick={goToNext}
            disabled={currentSection === sections.length - 1}
            className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;
