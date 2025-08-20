import React from "react";
import Card from "../ui/Card";

const PropertiesSection = () => {
  const properties = [
    {
      title: "Amplitude (A)",
      description: "Maximum displacement from the rest position",
      details: "Determines the energy and intensity of the wave",
      example: "For sound: Louder = Higher amplitude",
      color: "blue",
    },
    {
      title: "Frequency (f)",
      description: "Number of complete waves per second",
      details: "Measured in Hertz (Hz)",
      example: "For sound: Higher frequency = Higher pitch",
      color: "green",
    },
    {
      title: "Wavelength (λ)",
      description: "Distance between two consecutive identical points",
      details: "Usually measured from crest to crest",
      example: "Inversely related to frequency",
      color: "purple",
    },
    {
      title: "Wave Speed (v)",
      description: "How fast the wave travels through the medium",
      details: "v = f × λ",
      example: "Depends on the medium properties",
      color: "orange",
    },
  ];

  const colorClasses = {
    blue: "bg-blue-900/30 text-blue-400 bg-blue-800/20 text-blue-300",
    green: "bg-green-900/30 text-green-400 bg-green-800/20 text-green-300",
    purple: "bg-purple-900/30 text-purple-400 bg-purple-800/20 text-purple-300",
    orange: "bg-orange-900/30 text-orange-400 bg-orange-800/20 text-orange-300",
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white text-center mb-6">
        Wave Properties 📏
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {properties.map((property, index) => {
          const colors = colorClasses[property.color].split(" ");
          return (
            <Card key={index} className={colors[0]}>
              <h3 className={`${colors[1]} font-semibold text-xl mb-4`}>
                {property.title}
              </h3>
              <div className="space-y-3">
                <p className="text-gray-300">{property.description}</p>
                <div className={colors[2] + " rounded p-3"}>
                  <p className={`${colors[3]} text-sm`}>
                    💡 {property.details}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    {property.example}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="bg-yellow-900/20 text-center">
        <h3 className="text-yellow-400 font-semibold text-lg mb-2">
          Wave Equation
        </h3>
        <div className="text-2xl font-mono text-white bg-gray-800 rounded-lg py-3 px-6 inline-block">
          v = f × λ
        </div>
        <p className="text-gray-400 text-sm mt-2">
          Speed = Frequency × Wavelength
        </p>
      </Card>
    </div>
  );
};

export default PropertiesSection;
