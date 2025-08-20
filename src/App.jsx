// src/App.jsx - Simplified with light mode removed
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, BookOpen } from "lucide-react";
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visitedSections, setVisitedSections] = useState(new Set([0]));
  const [completedSections, setCompletedSections] = useState(new Set());

  const renderSection = useCallback(() => {
    try {
      switch (currentSection) {
        case 0:
          return <IntroSection onComplete={() => handleSectionComplete(0)} />;
        case 1:
          return (
            <PropertiesSection onComplete={() => handleSectionComplete(1)} />
          );
        case 2:
          return <TypesSection onComplete={() => handleSectionComplete(2)} />;
        case 3:
          return (
            <SimulationSection onComplete={() => handleSectionComplete(3)} />
          );
        case 4:
          return <QuizSection onComplete={() => handleSectionComplete(4)} />;
        default:
          return <IntroSection onComplete={() => handleSectionComplete(0)} />;
      }
    } catch (error) {
      console.error("Error rendering section:", error);
      return (
        <div className="text-center p-8">
          <p className="text-red-400">
            Error loading section. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Reload Page
          </button>
        </div>
      );
    }
  }, [currentSection]);

  const handleSectionComplete = useCallback((sectionIndex) => {
    setCompletedSections((prev) => new Set([...prev, sectionIndex]));
  }, []);

  const goToPrevious = useCallback(async () => {
    if (currentSection === 0 || isTransitioning) return;

    setIsTransitioning(true);
    await new Promise((resolve) => setTimeout(resolve, 200));

    const newSection = Math.max(0, currentSection - 1);
    setCurrentSection(newSection);
    setVisitedSections((prev) => new Set([...prev, newSection]));
    setIsTransitioning(false);
  }, [currentSection, isTransitioning]);

  const goToNext = useCallback(async () => {
    if (currentSection === sections.length - 1 || isTransitioning) return;

    setIsTransitioning(true);
    await new Promise((resolve) => setTimeout(resolve, 200));

    const newSection = Math.min(sections.length - 1, currentSection + 1);
    setCurrentSection(newSection);
    setVisitedSections((prev) => new Set([...prev, newSection]));
    setIsTransitioning(false);
  }, [currentSection, isTransitioning, sections.length]);

  const handleSectionChange = useCallback(
    async (index) => {
      if (index === currentSection || isTransitioning) return;

      setIsTransitioning(true);
      await new Promise((resolve) => setTimeout(resolve, 200));

      setCurrentSection(index);
      setVisitedSections((prev) => new Set([...prev, index]));
      setIsTransitioning(false);
    },
    [currentSection, isTransitioning]
  );

  const resetProgress = useCallback(() => {
    setCurrentSection(0);
    setVisitedSections(new Set([0]));
    setCompletedSections(new Set());
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
        return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          goToPrevious();
          break;
        case "ArrowRight":
          e.preventDefault();
          goToNext();
          break;
        case "Home":
          e.preventDefault();
          handleSectionChange(0);
          break;
        case "End":
          e.preventDefault();
          handleSectionChange(sections.length - 1);
          break;
        case "r":
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            resetProgress();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [
    goToPrevious,
    goToNext,
    handleSectionChange,
    resetProgress,
    sections.length,
  ]);

  const progressStats = useMemo(() => {
    const totalSections = sections.length;
    const visitedCount = visitedSections.size;
    const completedCount = completedSections.size;

    return {
      visitedPercentage: Math.round((visitedCount / totalSections) * 100),
      completedPercentage: Math.round((completedCount / totalSections) * 100),
      isFullyCompleted: completedCount === totalSections,
    };
  }, [visitedSections, completedSections, sections.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Header progressStats={progressStats} />

        <Navigation
          sections={sections}
          currentSection={currentSection}
          onSectionChange={handleSectionChange}
          visitedSections={visitedSections}
          completedSections={completedSections}
          isTransitioning={isTransitioning}
        />

        <ProgressBar
          current={currentSection + 1}
          total={sections.length}
          visitedSections={visitedSections}
          completedSections={completedSections}
        />

        <main className="max-w-6xl mx-auto">
          <div
            className={`transition-all duration-300 ${
              isTransitioning ? "opacity-50" : "opacity-100"
            }`}
          >
            {renderSection()}
          </div>
        </main>

        <nav className="flex justify-between items-center mt-12 max-w-6xl mx-auto">
          <button
            onClick={goToPrevious}
            disabled={currentSection === 0 || isTransitioning}
            className="flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">Previous</span>
          </button>

          <div className="text-center px-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span className="text-gray-400 text-sm">
                Section {currentSection + 1} of {sections.length}
              </span>
            </div>
            <h2 className="text-white font-bold text-lg">
              {sections[currentSection].title}
            </h2>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={resetProgress}
              className="flex items-center px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition-all duration-200"
              title="Reset progress (Ctrl+R)"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline font-medium">Reset</span>
            </button>

            <button
              onClick={goToNext}
              disabled={
                currentSection === sections.length - 1 || isTransitioning
              }
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-800 disabled:to-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200"
            >
              <span className="font-medium">Next</span>
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </nav>

        {progressStats.isFullyCompleted && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-800 p-8 rounded-2xl text-center max-w-md mx-4 shadow-2xl border border-gray-600">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Congratulations!
              </h3>
              <p className="text-gray-300 mb-6">
                You've completed all sections of the Waves learning module!
              </p>
              <button
                onClick={() => setCompletedSections(new Set())}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Continue Learning
              </button>
            </div>
          </div>
        )}

        <Footer progressStats={progressStats} />
      </div>

      <div className="fixed bottom-4 right-4 z-40">
        <details className="group">
          <summary className="cursor-pointer bg-gray-800 text-white p-2 rounded-lg shadow-lg hover:bg-gray-700 transition-colors">
            <span className="text-sm">⌨️ Shortcuts</span>
          </summary>
          <div className="absolute bottom-full right-0 mb-2 bg-gray-800 text-white text-xs p-3 rounded-lg shadow-xl whitespace-nowrap border border-gray-600">
            <div>← → Navigate sections</div>
            <div>Home/End: First/Last section</div>
            <div>Ctrl+R: Reset progress</div>
          </div>
        </details>
      </div>
    </div>
  );
}

export default App;
