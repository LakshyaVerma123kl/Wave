// src/components/sections/PropertiesSection.jsx - Simplified and clean
import React, { useState, useEffect, useRef } from "react";
import {
  Calculator,
  Eye,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
} from "lucide-react";
import Card from "../ui/Card";

const PropertiesSection = ({ onComplete }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationTime, setAnimationTime] = useState(0);
  const [userValues, setUserValues] = useState({
    frequency: 2,
    wavelength: 50,
    amplitude: 30,
  });
  const [completedProperties, setCompletedProperties] = useState(new Set());
  const canvasRef = useRef(null);

  const properties = [
    {
      id: "amplitude",
      title: "Amplitude (A)",
      description: "Maximum displacement from the rest position",
      details: "Determines the energy and intensity of the wave",
      formula: "Energy ∝ A²",
      color: "blue",
      unit: "meters (m)",
    },
    {
      id: "frequency",
      title: "Frequency (f)",
      description: "Number of complete waves per second",
      details: "Measured in Hertz (Hz) - cycles per second",
      formula: "f = 1/T",
      color: "green",
      unit: "Hertz (Hz)",
    },
    {
      id: "wavelength",
      title: "Wavelength (λ)",
      description: "Distance between two consecutive identical points",
      details: "Usually measured from crest to crest",
      formula: "λ = v/f",
      color: "purple",
      unit: "meters (m)",
    },
    {
      id: "speed",
      title: "Wave Speed (v)",
      description: "How fast the wave travels through the medium",
      details: "Speed depends on properties of the medium",
      formula: "v = f × λ",
      color: "orange",
      unit: "m/s",
    },
  ];

  const colorClasses = {
    blue: {
      bg: "bg-blue-900/30",
      text: "text-blue-400",
      border: "border-blue-700/50",
    },
    green: {
      bg: "bg-green-900/30",
      text: "text-green-400",
      border: "border-green-700/50",
    },
    purple: {
      bg: "bg-purple-900/30",
      text: "text-purple-400",
      border: "border-purple-700/50",
    },
    orange: {
      bg: "bg-orange-900/30",
      text: "text-orange-400",
      border: "border-orange-700/50",
    },
  };

  useEffect(() => {
    if (!isAnimating) return;
    const interval = setInterval(() => {
      setAnimationTime((prev) => prev + 0.1);
    }, 50);
    return () => clearInterval(interval);
  }, [isAnimating]);

  useEffect(() => {
    drawWave();
  }, [animationTime, userValues, selectedProperty]);

  const drawWave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = "#374151";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let i = 0; i <= height; i += 30) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }

    // Draw center line
    ctx.strokeStyle = "#6B7280";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Draw wave
    ctx.strokeStyle = "#3B82F6";
    ctx.lineWidth = 3;
    ctx.beginPath();

    const { frequency, wavelength, amplitude } = userValues;

    for (let x = 0; x < width; x += 2) {
      const y =
        height / 2 +
        amplitude *
          Math.sin(
            (x * 2 * Math.PI) / wavelength - animationTime * frequency * 0.5
          );

      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Highlight selected property
    if (selectedProperty === "amplitude") {
      ctx.strokeStyle = "#EF4444";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(50, height / 2 - amplitude);
      ctx.lineTo(150, height / 2 - amplitude);
      ctx.moveTo(50, height / 2 + amplitude);
      ctx.lineTo(150, height / 2 + amplitude);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#EF4444";
      ctx.font = "12px sans-serif";
      ctx.fillText("Amplitude", 160, height / 2 - amplitude + 5);
    }

    if (selectedProperty === "wavelength") {
      ctx.strokeStyle = "#8B5CF6";
      ctx.lineWidth = 2;
      ctx.setLineDash([3, 3]);

      const waveStart = 50;
      const waveEnd = waveStart + wavelength;

      ctx.beginPath();
      ctx.moveTo(waveStart, height - 20);
      ctx.lineTo(waveEnd, height - 20);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#8B5CF6";
      ctx.fillText("Wavelength", waveStart + wavelength / 2 - 30, height - 30);
    }
  };

  const calculateSpeed = () => {
    return ((userValues.frequency * userValues.wavelength) / 10).toFixed(1);
  };

  const handlePropertyClick = (propertyId) => {
    setSelectedProperty(propertyId === selectedProperty ? null : propertyId);
    setCompletedProperties((prev) => new Set([...prev, propertyId]));
  };

  const handleValueChange = (property, value) => {
    setUserValues((prev) => ({ ...prev, [property]: Number(value) }));
  };

  const resetValues = () => {
    setUserValues({ frequency: 2, wavelength: 50, amplitude: 30 });
    setAnimationTime(0);
  };

  useEffect(() => {
    if (completedProperties.size >= 3) {
      setTimeout(() => onComplete?.(), 1000);
    }
  }, [completedProperties, onComplete]);

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
          <TrendingUp className="w-10 h-10 mr-3 text-blue-400" />
          Wave Properties
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Discover the fundamental characteristics that define how waves behave.
        </p>
      </div>

      {/* Interactive Visualizer */}
      <Card className="bg-gray-800/40 border-gray-700/40">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-white flex items-center">
            <Eye className="w-6 h-6 mr-2 text-blue-400" />
            Wave Visualizer
          </h3>

          <div className="flex space-x-2">
            <button
              onClick={() => setIsAnimating(!isAnimating)}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isAnimating
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {isAnimating ? (
                <Pause className="w-4 h-4 mr-2" />
              ) : (
                <Play className="w-4 h-4 mr-2" />
              )}
              {isAnimating ? "Pause" : "Play"}
            </button>

            <button
              onClick={resetValues}
              className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </button>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-4 mb-6 border border-gray-700">
          <canvas
            ref={canvasRef}
            width={800}
            height={300}
            className="w-full rounded-lg"
          />

          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">
              {selectedProperty
                ? `Observing: ${properties.find((p) => p.id === selectedProperty)?.title}`
                : "Click on a property below to highlight it in the visualization"}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Amplitude: {userValues.amplitude}px
            </label>
            <input
              type="range"
              min="10"
              max="80"
              value={userValues.amplitude}
              onChange={(e) => handleValueChange("amplitude", e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Frequency: {userValues.frequency}Hz
            </label>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.1"
              value={userValues.frequency}
              onChange={(e) => handleValueChange("frequency", e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Wavelength: {userValues.wavelength}px
            </label>
            <input
              type="range"
              min="20"
              max="120"
              value={userValues.wavelength}
              onChange={(e) => handleValueChange("wavelength", e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Calculated Values */}
        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
          <h4 className="text-blue-400 font-semibold mb-2">
            Calculated Values:
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Wave Speed:</span>
              <span className="text-white font-mono ml-2">
                {calculateSpeed()} units/s
              </span>
            </div>
            <div>
              <span className="text-gray-400">Period:</span>
              <span className="text-white font-mono ml-2">
                {(1 / userValues.frequency).toFixed(2)}s
              </span>
            </div>
            <div>
              <span className="text-gray-400">Energy ∝:</span>
              <span className="text-white font-mono ml-2">
                {Math.pow(userValues.amplitude, 2).toFixed(0)}
              </span>
            </div>
            <div>
              <span className="text-gray-400">Waves/Screen:</span>
              <span className="text-white font-mono ml-2">
                {(800 / userValues.wavelength).toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Properties Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {properties.map((property) => {
          const colors = colorClasses[property.color];
          const isSelected = selectedProperty === property.id;
          const isCompleted = completedProperties.has(property.id);

          return (
            <Card
              key={property.id}
              className={`${colors.bg} ${colors.border} cursor-pointer transition-all duration-300 hover:scale-105 ${
                isSelected ? "ring-2 ring-blue-400" : ""
              } ${isCompleted ? "ring-2 ring-green-400" : ""}`}
              onClick={() => handlePropertyClick(property.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className={`${colors.text} font-semibold text-xl`}>
                  {property.title}
                </h3>
                {isCompleted && <Eye className="w-5 h-5 text-green-400" />}
              </div>

              <div className="space-y-4">
                <p className="text-gray-300">{property.description}</p>

                <div className="bg-gray-800/30 rounded-lg p-3">
                  <p className="text-gray-400 text-sm">{property.details}</p>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className={`${colors.text} text-sm font-mono`}>
                    <strong>Formula:</strong> {property.formula}
                  </p>
                </div>

                <div className="text-gray-400 text-sm">
                  <strong>Unit:</strong> {property.unit}
                </div>

                {!isCompleted && (
                  <div className="text-center pt-2">
                    <span className="text-gray-500 text-xs">
                      Click to explore this property
                    </span>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Wave Equation */}
      <Card className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-700/30 text-center">
        <h3 className="text-yellow-400 font-semibold text-2xl mb-4 flex items-center justify-center">
          <Calculator className="w-6 h-6 mr-2" />
          The Wave Equation
        </h3>

        <div className="bg-gray-900/50 rounded-xl p-6 mb-6">
          <div className="text-4xl font-mono text-white mb-4 font-bold">
            v = f × λ
          </div>
          <div className="text-gray-300 space-y-1 text-sm">
            <p>
              <strong>v</strong> = Wave Speed (m/s)
            </p>
            <p>
              <strong>f</strong> = Frequency (Hz)
            </p>
            <p>
              <strong>λ</strong> = Wavelength (m)
            </p>
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
          <h4 className="text-blue-400 font-semibold mb-2">
            Current Calculation
          </h4>
          <p className="text-gray-300">
            Speed = {userValues.frequency} × {userValues.wavelength / 10}
          </p>
          <p className="text-white font-bold text-lg">
            = {calculateSpeed()} units/s
          </p>
        </div>
      </Card>

      {/* Progress */}
      <div className="flex justify-center">
        <div className="bg-gray-800/40 rounded-full px-6 py-3 border border-gray-700/40">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm">Properties Explored:</span>
            <div className="flex space-x-1">
              {properties.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    completedProperties.has(properties[index].id)
                      ? "bg-green-400"
                      : "bg-gray-600"
                  }`}
                ></div>
              ))}
            </div>
            <span className="text-white font-semibold">
              {completedProperties.size}/{properties.length}
            </span>
          </div>
        </div>
      </div>

      {/* Completion Message */}
      {completedProperties.size >= 3 && (
        <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-700/50 text-center">
          <h4 className="text-2xl font-bold text-green-400 mb-2">
            Properties Mastered!
          </h4>
          <p className="text-green-300">
            You now understand the fundamental properties that define wave
            behavior.
          </p>
        </Card>
      )}
    </section>
  );
};

export default PropertiesSection;
