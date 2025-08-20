import React from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import Button from "../ui/Button";

const WaveControls = ({ isPlaying, onPlayPause, onReset }) => {
  return (
    <div className="flex space-x-2">
      <Button
        onClick={onPlayPause}
        className={
          isPlaying
            ? "bg-red-600 hover:bg-red-700"
            : "bg-green-600 hover:bg-green-700"
        }
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 mr-2" />
        ) : (
          <Play className="w-4 h-4 mr-2" />
        )}
        {isPlaying ? "Pause" : "Play"}
      </Button>
      <Button onClick={onReset} className="bg-gray-600 hover:bg-gray-700">
        <RotateCcw className="w-4 h-4 mr-2" />
        Reset
      </Button>
    </div>
  );
};

export default WaveControls;
