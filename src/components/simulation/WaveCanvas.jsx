import React, { useRef, useEffect } from "react";
import { useWaveAnimation } from "../../hooks/useWaveAnimation";

const WaveCanvas = ({
  isPlaying,
  amplitude,
  frequency,
  waveSpeed,
  waveType,
}) => {
  const canvasRef = useRef(null);
  const animationTime = useWaveAnimation(isPlaying);

  useEffect(() => {
    drawWave();
  }, [amplitude, frequency, waveSpeed, waveType, animationTime]);

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
    for (let i = 0; i <= width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let i = 0; i <= height; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = "#6B7280";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Draw wave
    ctx.strokeStyle = waveType === "sine" ? "#3B82F6" : "#10B981";
    ctx.lineWidth = 3;
    ctx.beginPath();

    for (let x = 0; x < width; x++) {
      const time = animationTime * waveSpeed;
      let y;

      if (waveType === "sine") {
        y =
          height / 2 +
          amplitude * Math.sin((x / 50) * frequency * 2 * Math.PI - time);
      } else {
        const wave = Math.sin((x / 50) * frequency * 2 * Math.PI - time);
        y = height / 2 + amplitude * Math.sign(wave);
      }

      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Draw amplitude indicator
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

    // Labels
    ctx.fillStyle = "#EF4444";
    ctx.font = "12px Inter";
    ctx.fillText("Amplitude", 160, height / 2 - amplitude + 5);
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={300}
      className="w-full bg-gray-900 rounded-lg border"
    />
  );
};

export default WaveCanvas;
