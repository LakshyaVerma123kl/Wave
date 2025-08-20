export const WAVE_TYPES = {
  SINE: "sine",
  SQUARE: "square",
  SAWTOOTH: "sawtooth",
  TRIANGLE: "triangle",
};

export const WAVE_COLORS = {
  [WAVE_TYPES.SINE]: "#3B82F6",
  [WAVE_TYPES.SQUARE]: "#10B981",
  [WAVE_TYPES.SAWTOOTH]: "#F59E0B",
  [WAVE_TYPES.TRIANGLE]: "#EF4444",
};

export const DEFAULT_WAVE_PARAMS = {
  amplitude: 50,
  frequency: 1,
  speed: 2,
  type: WAVE_TYPES.SINE,
};

export const CANVAS_CONFIG = {
  width: 800,
  height: 300,
  gridSize: 20,
  backgroundColor: "#111827",
  gridColor: "#374151",
  axisColor: "#6B7280",
};

export const PHYSICS_CONSTANTS = {
  SPEED_OF_LIGHT: 3e8, // m/s
  SPEED_OF_SOUND_AIR: 343, // m/s at 20°C
  GRAVITATIONAL_ACCELERATION: 9.81, // m/s²
};
