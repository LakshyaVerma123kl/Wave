export const calculateWaveProperties = (frequency, wavelength) => {
  // Speed of wave = frequency × wavelength
  const speed = frequency * wavelength;

  // Period = 1 / frequency
  const period = 1 / frequency;

  return {
    speed,
    period,
    frequency,
    wavelength,
  };
};

export const calculateWavePosition = (
  x,
  t,
  amplitude,
  frequency,
  phase = 0
) => {
  // y = A * sin(2π * f * t - kx + φ)
  // where k = 2π / λ (wave number)
  const angularFrequency = 2 * Math.PI * frequency;
  return amplitude * Math.sin(angularFrequency * t - x + phase);
};

export const generateWaveData = (
  width,
  amplitude,
  frequency,
  time,
  waveType = "sine"
) => {
  const points = [];

  for (let x = 0; x < width; x++) {
    let y;

    if (waveType === "sine") {
      y = amplitude * Math.sin((x / 50) * frequency * 2 * Math.PI - time);
    } else if (waveType === "square") {
      const sineValue = Math.sin((x / 50) * frequency * 2 * Math.PI - time);
      y = amplitude * Math.sign(sineValue);
    } else if (waveType === "sawtooth") {
      const period = 100 / frequency;
      const position = (x - time * 10) % period;
      y = amplitude * (2 * (position / period) - 1);
    }

    points.push({ x, y });
  }

  return points;
};
