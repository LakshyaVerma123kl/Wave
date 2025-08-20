import React from "react";
import Slider from "../ui/Slider";

const WaveParameters = ({
  amplitude,
  frequency,
  waveSpeed,
  waveType,
  onAmplitudeChange,
  onFrequencyChange,
  onWaveSpeedChange,
  onWaveTypeChange,
}) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      <Slider
        label={`Amplitude: ${amplitude}px`}
        min={10}
        max={100}
        value={amplitude}
        onChange={onAmplitudeChange}
      />

      <Slider
        label={`Frequency: ${frequency}Hz`}
        min={0.5}
        max={3}
        step={0.01}
        value={frequency}
        onChange={onFrequencyChange}
      />

      <Slider
        label={`Speed: ${waveSpeed}x`}
        min={0.5}
        max={5}
        step={0.1}
        value={waveSpeed}
        onChange={onWaveSpeedChange}
      />

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Wave Type
        </label>
        <select
          value={waveType}
          onChange={(e) => onWaveTypeChange(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white rounded-lg border border-gray-600"
        >
          <option value="sine">Sine Wave</option>
          <option value="square">Square Wave</option>
        </select>
      </div>
    </div>
  );
};

export default WaveParameters;
