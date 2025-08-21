import React, { useState, useEffect } from "react";
import {
  Waves,
  Radio,
  Volume2,
  Eye,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 ${className}`}
  >
    {children}
  </div>
);

const TypesSection = ({ onComplete }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [completedTypes, setCompletedTypes] = useState(new Set());

  const waveTypes = [
    {
      id: "mechanical",
      category: "Mechanical Waves",
      description: "Need a medium (solid, liquid, or gas) to travel through",
      icon: <Volume2 className="w-8 h-8" />,
      color: "blue",
      examples: [
        "Sound waves in air",
        "Water waves on ocean surface",
        "Seismic waves in Earth",
        "Waves on a guitar string",
      ],
      keyFeature: "Cannot travel through vacuum",
      details:
        "Mechanical waves require matter to propagate. The particles of the medium vibrate to transfer energy from one location to another.",
      realWorld:
        "When you speak, sound waves travel through air molecules to reach someone's ears.",
      bgGradient: "from-blue-500/10 to-blue-600/10",
      borderColor: "border-blue-500/20",
    },
    {
      id: "electromagnetic",
      category: "Electromagnetic Waves",
      description: "Don't need a medium - can travel through vacuum",
      icon: <Radio className="w-8 h-8" />,
      color: "purple",
      examples: [
        "Visible light waves",
        "Radio and TV waves",
        "X-rays and gamma rays",
        "Microwave radiation",
      ],
      keyFeature: "Travel at speed of light in vacuum (3×10⁸ m/s)",
      details:
        "Electromagnetic waves are oscillating electric and magnetic fields that can propagate through empty space.",
      realWorld:
        "Light from the Sun travels 150 million kilometers through the vacuum of space to reach Earth.",
      bgGradient: "from-purple-500/10 to-purple-600/10",
      borderColor: "border-purple-500/20",
    },
  ];

  const motionTypes = [
    {
      id: "transverse",
      title: "Transverse Waves",
      description: "Particles vibrate perpendicular to wave direction",
      examples: "Light waves, waves on a rope",
      color: "green",
      icon: "⟷",
      details:
        "In transverse waves, the displacement of the medium is perpendicular to the direction of wave propagation.",
      realWorld:
        "When you shake a rope up and down, the wave travels horizontally while the rope moves vertically.",
    },
    {
      id: "longitudinal",
      title: "Longitudinal Waves",
      description: "Particles vibrate parallel to wave direction",
      examples: "Sound waves, compression waves in springs",
      color: "teal",
      icon: "↕",
      details:
        "In longitudinal waves, the displacement of the medium is parallel to the direction of wave propagation.",
      realWorld:
        "Sound waves create areas of compression and rarefaction as air molecules move back and forth.",
    },
  ];

  const colorClasses = {
    blue: {
      bg: "bg-blue-900/30",
      text: "text-blue-400",
      border: "border-blue-700/50",
    },
    purple: {
      bg: "bg-purple-900/30",
      text: "text-purple-400",
      border: "border-purple-700/50",
    },
    green: {
      bg: "bg-green-900/30",
      text: "text-green-400",
      border: "border-green-700/50",
    },
    teal: {
      bg: "bg-teal-900/30",
      text: "text-teal-400",
      border: "border-teal-700/50",
    },
  };

  const handleTypeClick = (typeId) => {
    setSelectedType(typeId === selectedType ? null : typeId);
    setCompletedTypes((prev) => new Set([...prev, typeId]));
  };

  useEffect(() => {
    if (completedTypes.size >= 3) {
      setTimeout(() => onComplete?.(), 1000);
    }
  }, [completedTypes, onComplete]);

  // Calculate completion percentage for internal progress
  const completionPercentage =
    (completedTypes.size / (waveTypes.length + motionTypes.length)) * 100;

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
          <TrendingUp className="w-10 h-10 mr-3 text-purple-400" />
          Types of Waves
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Discover the different categories of waves in our universe and how
          they behave.
        </p>
      </div>

      {/* Main Wave Types */}
      <div className="grid lg:grid-cols-2 gap-6">
        {waveTypes.map((type) => {
          const colors = colorClasses[type.color];
          const isSelected = selectedType === type.id;
          const isCompleted = completedTypes.has(type.id);

          return (
            <Card
              key={type.id}
              className={`${type.bgGradient} ${type.borderColor} cursor-pointer transition-all duration-300 hover:scale-105 ${
                isSelected ? "ring-2 ring-blue-400" : ""
              } ${isCompleted ? "ring-2 ring-green-400" : ""}`}
              onClick={() => handleTypeClick(type.id)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 ${colors.bg} rounded-lg ${colors.text}`}
                    >
                      {type.icon}
                    </div>
                    <h3 className={`text-xl font-bold ${colors.text}`}>
                      {type.category}
                    </h3>
                  </div>
                  {isCompleted && <Eye className="w-5 h-5 text-green-400" />}
                </div>

                <p className="text-white/80">{type.description}</p>

                {isSelected && (
                  <div className="bg-gray-800/40 rounded-lg p-4 space-y-3 border border-gray-700/50">
                    <div>
                      <h4 className="text-gray-300 font-semibold mb-2">
                        Details:
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {type.details}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-gray-300 font-semibold mb-2">
                        Real World Example:
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {type.realWorld}
                      </p>
                    </div>
                  </div>
                )}

                <div className={`${colors.bg} rounded-lg p-4 space-y-3`}>
                  <div>
                    <h4 className={`${colors.text} font-semibold mb-2`}>
                      Examples:
                    </h4>
                    <ul className="text-white/70 space-y-1">
                      {type.examples.map((example, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span
                            className={`w-1.5 h-1.5 bg-${type.color}-400 rounded-full`}
                          />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-800/40 rounded p-3">
                    <h4 className={`${colors.text} font-semibold text-sm mb-1`}>
                      Key Feature:
                    </h4>
                    <p className="text-white/70 text-sm">{type.keyFeature}</p>
                  </div>
                </div>

                {!isCompleted && (
                  <div className="text-center pt-2">
                    <span className="text-gray-500 text-xs">
                      Click to explore this wave type
                    </span>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Wave Motion Types */}
      <Card className="bg-gradient-to-r from-green-500/10 to-teal-500/10 border-green-500/20">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-green-300 mb-2 flex items-center justify-center">
              <Waves className="w-6 h-6 mr-2" />
              Wave Motion Types
            </h3>
            <p className="text-white/70">
              How particles move relative to wave direction
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {motionTypes.map((motion) => {
              const colors = colorClasses[motion.color];
              const isSelected = selectedType === motion.id;
              const isCompleted = completedTypes.has(motion.id);

              return (
                <div
                  key={motion.id}
                  className={`${colors.bg} ${colors.border} rounded-lg p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    isSelected ? "ring-2 ring-blue-400" : ""
                  } ${isCompleted ? "ring-2 ring-green-400" : ""}`}
                  onClick={() => handleTypeClick(motion.id)}
                >
                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-4xl">{motion.icon}</div>
                      {isCompleted && (
                        <Eye className="w-5 h-5 text-green-400" />
                      )}
                    </div>

                    <h4 className={`text-lg font-bold ${colors.text}`}>
                      {motion.title}
                    </h4>
                    <p className="text-white/70 text-sm mb-3">
                      {motion.description}
                    </p>

                    {isSelected && (
                      <div className="bg-gray-800/40 rounded-lg p-3 mb-3">
                        <p className="text-gray-400 text-sm leading-relaxed mb-2">
                          {motion.details}
                        </p>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          <strong>Example:</strong> {motion.realWorld}
                        </p>
                      </div>
                    )}

                    <div className="bg-gray-800/40 rounded p-3">
                      <p className={`${colors.text} text-sm font-medium`}>
                        Examples: {motion.examples}
                      </p>
                    </div>

                    {!isCompleted && (
                      <div className="text-center pt-2">
                        <span className="text-gray-500 text-xs">
                          Click to explore
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Progress with completion indicator */}
      <div className="flex justify-center">
        <div className="bg-gray-800/40 rounded-full px-6 py-3 border border-gray-700/40">
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm">Wave Types Explored:</span>
            <div className="flex space-x-1">
              {[...waveTypes, ...motionTypes].map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index < completedTypes.size ? "bg-green-400" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-white font-semibold">
              {completedTypes.size}/{waveTypes.length + motionTypes.length}
            </span>
            <div className="w-16 bg-gray-700 rounded-full h-2 ml-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <span className="text-green-400 text-sm font-medium">
              {Math.round(completionPercentage)}%
            </span>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      {completedTypes.size >= 3 && (
        <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-700/50 text-center">
          <div className="space-y-4">
            <div className="inline-flex p-3 bg-green-500/20 rounded-full">
              <CheckCircle className="w-8 h-8 text-green-300" />
            </div>
            <h3 className="text-2xl font-bold text-green-400">
              Wave Types Mastered!
            </h3>
            <p className="text-green-300 max-w-2xl mx-auto">
              You now understand the fundamental types of waves and how they
              propagate through different media. This knowledge helps explain
              everything from sound and light to earthquakes and radio
              communication!
            </p>
          </div>
        </Card>
      )}
    </section>
  );
};

export default TypesSection;
