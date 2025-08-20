import React from "react";
import Card from "../ui/Card";

const TypesSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white text-center mb-6">
        Types of Waves 🎵
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-blue-900/30">
          <h3 className="text-blue-400 font-semibold text-xl mb-4">
            Mechanical Waves
          </h3>
          <p className="text-gray-300 mb-4">
            Need a medium (solid, liquid, or gas) to travel
          </p>
          <div className="space-y-3">
            <div className="bg-blue-800/20 rounded p-3">
              <h4 className="text-blue-300 font-semibold">Examples:</h4>
              <ul className="text-gray-300 mt-1 space-y-1">
                <li>• Sound waves in air</li>
                <li>• Water waves</li>
                <li>• Seismic waves</li>
                <li>• Waves on a string</li>
              </ul>
            </div>
            <div className="bg-blue-800/20 rounded p-3">
              <h4 className="text-blue-300 font-semibold">Key Feature:</h4>
              <p className="text-gray-300 text-sm">
                Cannot travel through vacuum
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-purple-900/30">
          <h3 className="text-purple-400 font-semibold text-xl mb-4">
            Electromagnetic Waves
          </h3>
          <p className="text-gray-300 mb-4">
            Don't need a medium - can travel through vacuum
          </p>
          <div className="space-y-3">
            <div className="bg-purple-800/20 rounded p-3">
              <h4 className="text-purple-300 font-semibold">Examples:</h4>
              <ul className="text-gray-300 mt-1 space-y-1">
                <li>• Light waves</li>
                <li>• Radio waves</li>
                <li>• X-rays</li>
                <li>• Microwaves</li>
              </ul>
            </div>
            <div className="bg-purple-800/20 rounded p-3">
              <h4 className="text-purple-300 font-semibold">Key Feature:</h4>
              <p className="text-gray-300 text-sm">
                Travel at speed of light in vacuum
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-green-900/30 to-teal-900/30">
        <h3 className="text-green-400 font-semibold text-xl mb-4">
          Wave Motion Types
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-800/20 rounded p-4">
            <h4 className="text-green-300 font-semibold mb-2">
              Transverse Waves
            </h4>
            <p className="text-gray-300 text-sm mb-2">
              Particles vibrate perpendicular to wave direction
            </p>
            <p className="text-green-400 text-sm">
              Examples: Light waves, waves on a string
            </p>
          </div>
          <div className="bg-teal-800/20 rounded p-4">
            <h4 className="text-teal-300 font-semibold mb-2">
              Longitudinal Waves
            </h4>
            <p className="text-gray-300 text-sm mb-2">
              Particles vibrate parallel to wave direction
            </p>
            <p className="text-teal-400 text-sm">
              Examples: Sound waves, compression waves
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TypesSection;
