import React from "react";
import { Waves, Radio, Volume2 } from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 ${className}`}
  >
    {children}
  </div>
);

const TypesSection = () => {
  const waveTypes = [
    {
      category: "Mechanical Waves",
      description: "Need a medium (solid, liquid, or gas) to travel",
      icon: <Volume2 className="w-8 h-8" />,
      color: "blue",
      examples: [
        "Sound waves in air",
        "Water waves",
        "Seismic waves",
        "Waves on a string",
      ],
      keyFeature: "Cannot travel through vacuum",
      bgGradient: "from-blue-500/10 to-blue-600/10",
      borderColor: "border-blue-500/20",
    },
    {
      category: "Electromagnetic Waves",
      description: "Don't need a medium - can travel through vacuum",
      icon: <Radio className="w-8 h-8" />,
      color: "purple",
      examples: ["Light waves", "Radio waves", "X-rays", "Microwaves"],
      keyFeature: "Travel at speed of light in vacuum",
      bgGradient: "from-purple-500/10 to-purple-600/10",
      borderColor: "border-purple-500/20",
    },
  ];

  const motionTypes = [
    {
      title: "Transverse Waves",
      description: "Particles vibrate perpendicular to wave direction",
      examples: "Light waves, waves on a string",
      color: "green",
      icon: "⟷",
    },
    {
      title: "Longitudinal Waves",
      description: "Particles vibrate parallel to wave direction",
      examples: "Sound waves, compression waves",
      color: "teal",
      icon: "↕",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex p-4 bg-purple-500/20 rounded-full">
            <Waves className="w-12 h-12 text-purple-300" />
          </div>
          <h2 className="text-4xl font-bold">Types of Waves 🎵</h2>
          <p className="text-purple-100 text-lg">
            Discover the different categories of waves in our universe
          </p>
        </div>

        {/* Main Wave Types */}
        <div className="grid lg:grid-cols-2 gap-6">
          {waveTypes.map((type, index) => (
            <Card
              key={index}
              className={`bg-gradient-to-br ${type.bgGradient} ${type.borderColor}`}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 bg-${type.color}-500/20 rounded-lg text-${type.color}-300`}
                  >
                    {type.icon}
                  </div>
                  <h3 className={`text-xl font-bold text-${type.color}-300`}>
                    {type.category}
                  </h3>
                </div>

                <p className="text-white/80">{type.description}</p>

                <div
                  className={`bg-${type.color}-900/20 rounded-lg p-4 space-y-3`}
                >
                  <div>
                    <h4 className={`text-${type.color}-300 font-semibold mb-2`}>
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

                  <div className={`bg-${type.color}-800/30 rounded p-3`}>
                    <h4
                      className={`text-${type.color}-300 font-semibold text-sm mb-1`}
                    >
                      Key Feature:
                    </h4>
                    <p className="text-white/70 text-sm">{type.keyFeature}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Wave Motion Types */}
        <Card className="bg-gradient-to-r from-green-500/10 to-teal-500/10 border-green-500/20">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-300 mb-2">
                Wave Motion Types
              </h3>
              <p className="text-white/70">
                How particles move relative to wave direction
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {motionTypes.map((motion, index) => (
                <div
                  key={index}
                  className={`bg-${motion.color}-900/20 rounded-lg p-6 border border-${motion.color}-700/30`}
                >
                  <div className="text-center space-y-3">
                    <div className="text-4xl mb-3">{motion.icon}</div>
                    <h4
                      className={`text-lg font-bold text-${motion.color}-300`}
                    >
                      {motion.title}
                    </h4>
                    <p className="text-white/70 text-sm mb-3">
                      {motion.description}
                    </p>
                    <div className={`bg-${motion.color}-800/30 rounded p-3`}>
                      <p
                        className={`text-${motion.color}-300 text-sm font-medium`}
                      >
                        Examples: {motion.examples}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Summary Card */}
        <Card className="bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border-indigo-500/20 text-center">
          <div className="space-y-4">
            <div className="inline-flex p-3 bg-indigo-500/20 rounded-full">
              <Waves className="w-8 h-8 text-indigo-300" />
            </div>
            <h3 className="text-xl font-bold text-indigo-300">Key Takeaway</h3>
            <p className="text-white/80 max-w-2xl mx-auto">
              Understanding wave types helps us comprehend how different
              phenomena in nature work - from the sound we hear to the light we
              see, and even the earthquakes we feel!
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TypesSection;
