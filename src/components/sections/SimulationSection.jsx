import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Settings, Zap, Waves } from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 ${className}`}
  >
    {children}
  </div>
);

// Mock Wave Canvas Component
const WaveCanvas = ({
  isPlaying,
  amplitude,
  frequency,
  waveSpeed,
  waveType,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = "#1f2937";
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Draw center line
      ctx.strokeStyle = "#374151";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Draw wave
      ctx.strokeStyle = "#3B82F6";
      ctx.lineWidth = 3;
      ctx.beginPath();

      for (let x = 0; x < canvas.width; x += 2) {
        let y = canvas.height / 2;

        if (waveType === "sine") {
          y +=
            amplitude *
            Math.sin(
              x * frequency * 0.02 + (isPlaying ? time * waveSpeed * 0.1 : 0)
            );
        } else if (waveType === "square") {
          y +=
            amplitude *
            Math.sign(
              Math.sin(
                x * frequency * 0.02 + (isPlaying ? time * waveSpeed * 0.1 : 0)
              )
            );
        } else if (waveType === "triangle") {
          const phase =
            x * frequency * 0.02 + (isPlaying ? time * waveSpeed * 0.1 : 0);
          y +=
            amplitude *
            (2 *
              Math.abs(
                2 *
                  (phase / (2 * Math.PI) -
                    Math.floor(phase / (2 * Math.PI) + 0.5))
              ) -
              1);
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw energy indicators
      if (isPlaying) {
        for (let i = 0; i < 3; i++) {
          const x = (time * waveSpeed * 2 + i * 120) % canvas.width;
          const y =
            canvas.height / 2 +
            amplitude * Math.sin(x * frequency * 0.02 + time * waveSpeed * 0.1);

          ctx.fillStyle = "#F59E0B";
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      time += 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, [isPlaying, amplitude, frequency, waveSpeed, waveType]);

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <canvas
        ref={canvasRef}
        width={800}
        height={200}
        className="w-full border border-gray-700 rounded"
      />
    </div>
  );
};

// Simulation Section Component
const SimulationSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [amplitude, setAmplitude] = useState(50);
  const [frequency, setFrequency] = useState(1);
  const [waveSpeed, setWaveSpeed] = useState(2);
  const [waveType, setWaveType] = useState("sine");

  const resetSimulation = () => {
    setIsPlaying(false);
    setAmplitude(50);
    setFrequency(1);
    setWaveSpeed(2);
    setWaveType("sine");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex p-4 bg-blue-500/20 rounded-full">
            <Zap className="w-12 h-12 text-blue-300" />
          </div>
          <h2 className="text-4xl font-bold">Interactive Wave Simulation ⚡</h2>
          <p className="text-blue-100 text-lg">
            Experiment with wave properties and see how they affect wave
            behavior
          </p>
        </div>

        <Card>
          {/* Controls Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <Waves className="w-7 h-7 text-blue-400" />
              Wave Visualizer
            </h3>

            {/* Control Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isPlaying
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 mr-2" />
                ) : (
                  <Play className="w-4 h-4 mr-2" />
                )}
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button
                onClick={resetSimulation}
                className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </button>
            </div>
          </div>

          {/* Wave Canvas */}
          <WaveCanvas
            isPlaying={isPlaying}
            amplitude={amplitude}
            frequency={frequency}
            waveSpeed={waveSpeed}
            waveType={waveType}
          />

          {/* Wave Parameters */}
          <div className="mt-6 space-y-6">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-400" />
              Wave Parameters
            </h4>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Amplitude Control */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Amplitude: {amplitude}px
                </label>
                <input
                  type="range"
                  min="10"
                  max="80"
                  value={amplitude}
                  onChange={(e) => setAmplitude(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <p className="text-xs text-gray-400">
                  Controls wave height/energy
                </p>
              </div>

              {/* Frequency Control */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Frequency: {frequency}Hz
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="4"
                  step="0.1"
                  value={frequency}
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <p className="text-xs text-gray-400">
                  Controls wave density/pitch
                </p>
              </div>

              {/* Wave Speed Control */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Speed: {waveSpeed}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.1"
                  value={waveSpeed}
                  onChange={(e) => setWaveSpeed(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <p className="text-xs text-gray-400">
                  Controls animation speed
                </p>
              </div>

              {/* Wave Type Control */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Wave Type
                </label>
                <select
                  value={waveType}
                  onChange={(e) => setWaveType(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="sine">Sine Wave</option>
                  <option value="square">Square Wave</option>
                  <option value="triangle">Triangle Wave</option>
                </select>
                <p className="text-xs text-gray-400">Different wave shapes</p>
              </div>
            </div>
          </div>

          {/* Educational Tip */}
          <div className="mt-6 bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg flex-shrink-0">
                💡
              </div>
              <div>
                <h5 className="font-semibold text-blue-300 mb-1">
                  Experiment & Learn
                </h5>
                <p className="text-blue-100 text-sm">
                  Try changing the amplitude and frequency. Notice how amplitude
                  affects the wave height (energy/intensity) while frequency
                  affects how many waves you see (pitch for sound waves).
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #1e40af;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #1e40af;
        }
      `}</style>
    </div>
  );
};

export default SimulationSection;
