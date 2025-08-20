import React from "react";

const Navigation = ({ sections, currentSection, onSectionChange }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-gray-800 rounded-lg p-2 flex space-x-2 overflow-x-auto">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(index)}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              currentSection === index
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <span className="mr-2">{section.icon}</span>
            <span className="hidden sm:inline">{section.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
