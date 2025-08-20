// src/components/layout/Navigation.jsx - Simplified and clean
import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Check, Eye, Lock } from "lucide-react";

const Navigation = ({
  sections,
  currentSection,
  onSectionChange,
  visitedSections = new Set(),
  completedSections = new Set(),
  isTransitioning = false,
}) => {
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const checkScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const needsScroll = scrollWidth > clientWidth;

      setShowScrollButtons(needsScroll);
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    };

    checkScroll();
    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [sections]);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  const getSectionStatus = (index) => {
    if (completedSections.has(index)) return "completed";
    if (visitedSections.has(index)) return "visited";
    if (index <= currentSection) return "current";
    return "locked";
  };

  const getSectionIcon = (section, index, status) => {
    switch (status) {
      case "completed":
        return <Check className="w-4 h-4 text-green-400" />;
      case "visited":
        return <Eye className="w-4 h-4 text-blue-400" />;
      case "locked":
        return <Lock className="w-4 h-4 text-gray-500" />;
      default:
        return <span className="text-lg">{section.icon}</span>;
    }
  };

  const getButtonStyles = (index, status, isActive) => {
    const baseStyles =
      "flex items-center px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap border";

    if (isActive) {
      return `${baseStyles} bg-blue-600 text-white border-blue-500`;
    }

    switch (status) {
      case "completed":
        return `${baseStyles} bg-green-900/30 text-green-300 border-green-700/50 hover:bg-green-900/40`;
      case "visited":
        return `${baseStyles} bg-blue-900/30 text-blue-300 border-blue-700/50 hover:bg-blue-900/40`;
      case "locked":
        return `${baseStyles} bg-gray-800/50 text-gray-500 border-gray-700/50 cursor-not-allowed opacity-60`;
      default:
        return `${baseStyles} bg-gray-800/50 text-gray-300 border-gray-700/50 hover:bg-gray-700/50`;
    }
  };

  return (
    <nav className="mb-8 relative">
      <div className="flex items-center justify-center">
        {showScrollButtons && (
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className="absolute left-0 z-10 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-600"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        <div className="max-w-full overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="flex space-x-3 overflow-x-auto scrollbar-hide px-12 py-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {sections.map((section, index) => {
              const status = getSectionStatus(index);
              const isActive = currentSection === index;
              const isClickable = status !== "locked" && !isTransitioning;

              return (
                <button
                  key={section.id}
                  onClick={() => isClickable && onSectionChange(index)}
                  disabled={!isClickable}
                  className={getButtonStyles(index, status, isActive)}
                  title={`${section.title} (${status})`}
                >
                  <div className="mr-2">
                    {getSectionIcon(section, index, status)}
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">{section.title}</div>
                    <div className="text-xs opacity-75">
                      Section {index + 1}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {showScrollButtons && (
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className="absolute right-0 z-10 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-600"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <div className="flex items-center space-x-4 text-xs text-gray-400">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Completed ({completedSections.size})</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Visited ({visitedSections.size})</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <span>Remaining ({sections.length - visitedSections.size})</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
