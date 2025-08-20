import React, { useState } from "react";
import WaveCanvas from "../simulation/WaveCanvas";
import WaveControls from "../simulation/WaveControls";
import WaveParameters from "../simulation/WaveParameters";
import Card from "../ui/Card";

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
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white text-center mb-6">
        Interactive Wave Simulation ⚡
      </h2>

      <Card className="bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Wave Visualizer</h3>
          <WaveControls
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onReset={resetSimulation}
          />
        </div>

        <WaveCanvas
          isPlaying={isPlaying}
          amplitude={amplitude}
          frequency={frequency}
          waveSpeed={waveSpeed}
          waveType={waveType}
        />

        <WaveParameters
          amplitude={amplitude}
          frequency={frequency}
          waveSpeed={waveSpeed}
          waveType={waveType}
          onAmplitudeChange={setAmplitude}
          onFrequencyChange={setFrequency}
          onWaveSpeedChange={setWaveSpeed}
          onWaveTypeChange={setWaveType}
        />

        <div className="mt-4 p-4 bg-blue-900/20 rounded-lg">
          <p className="text-blue-300 text-sm">
            💡 <strong>Experiment:</strong> Try changing the amplitude and
            frequency. Notice how amplitude affects the wave height
            (energy/intensity) while frequency affects how many waves you see
            (pitch for sound waves).
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SimulationSection;
