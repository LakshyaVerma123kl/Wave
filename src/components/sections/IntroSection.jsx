import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Lightbulb,
  CheckCircle,
  Waves,
  Zap,
  ArrowRight,
} from "lucide-react";

const Card = ({ children, className = "", onClick }) => (
  <div
    className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

const IntroSection = ({ onComplete }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentExample, setCurrentExample] = useState(0);
  const [hasAudio, setHasAudio] = useState(true);
  const [completedPoints, setCompletedPoints] = useState(new Set());
  const canvasRef = useRef(null);

  const examples = [
    {
      title: "Ocean Waves",
      description: "Water waves transfer energy across the ocean surface",
      icon: "🌊",
      fact: "Tsunamis can travel at speeds up to 800 km/h!",
    },
    {
      title: "Sound Waves",
      description: "Vibrations traveling through air that we hear as sound",
      icon: "🔊",
      fact: "Sound travels at 343 m/s in air at room temperature",
    },
    {
      title: "Light Waves",
      description: "Electromagnetic waves that allow us to see",
      icon: "💡",
      fact: "Light travels at 299,792,458 m/s in vacuum",
    },
    {
      title: "Earthquake Waves",
      description: "Seismic waves that travel through the Earth",
      icon: "🌍",
      fact: "P-waves can travel through both solids and liquids",
    },
  ];

  const keyPoints = [
    {
      id: "definition",
      title: "Wave Definition",
      content:
        "A wave is a disturbance that travels through space and time, transferring energy without transferring matter.",
      icon: <Waves className="w-5 h-5" />,
    },
    {
      id: "energy",
      title: "Energy Transfer",
      content:
        "Waves carry energy from one place to another, but the medium particles only vibrate in place.",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      id: "medium",
      title: "Medium Interaction",
      content:
        "The medium particles return to their original position after the wave passes through.",
      icon: <ArrowRight className="w-5 h-5" />,
    },
  ];

  // Animated wave canvas
  useEffect(() => {
    if (!canvasRef.current || !isAnimating) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw animated sine wave
      ctx.strokeStyle = "#60A5FA";
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let x = 0; x < canvas.width; x += 2) {
        const y = canvas.height / 2 + 25 * Math.sin(x * 0.02 + time);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw energy particles
      for (let i = 0; i < 3; i++) {
        const x = (time * 2 + i * 80) % canvas.width;
        const y = canvas.height / 2 + 25 * Math.sin(x * 0.02 + time);

        ctx.fillStyle = "#F59E0B";
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      time += 0.08;
      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, [isAnimating]);

  // Cycle through examples
  useEffect(() => {
    if (!isAnimating) return;
    const interval = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % examples.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAnimating, examples.length]);

  // Check completion
  useEffect(() => {
    if (completedPoints.size === keyPoints.length) {
      setTimeout(() => onComplete?.(), 1000);
    }
  }, [completedPoints, onComplete, keyPoints.length]);

  const handlePointComplete = (pointId) => {
    setCompletedPoints((prev) => new Set([...prev, pointId]));
  };

  const toggleAnimation = () => setIsAnimating(!isAnimating);
  const toggleAudio = () => setHasAudio(!hasAudio);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex p-4 bg-blue-500/20 rounded-full mb-4">
            <Waves className="w-12 h-12 text-blue-300" />
          </div>

          <h1 className="text-5xl font-bold">
            What are Waves? <span className="text-4xl">🌊</span>
          </h1>

          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Discover how waves shape our universe, from the sound of music to
            the light from stars.
          </p>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={toggleAnimation}
              className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
            >
              {isAnimating ? (
                <Pause className="w-5 h-5 mr-2" />
              ) : (
                <Play className="w-5 h-5 mr-2" />
              )}
              {isAnimating ? "Pause" : "Start"} Animation
            </button>
            <button
              onClick={toggleAudio}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              {hasAudio ? (
                <Volume2 className="w-5 h-5" />
              ) : (
                <VolumeX className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Wave Visualization */}
          <Card className="bg-black/20">
            <canvas
              ref={canvasRef}
              width={600}
              height={120}
              className="w-full max-w-2xl mx-auto rounded-lg"
            />
            <p className="text-sm text-blue-200 mt-3">
              {isAnimating
                ? "Energy travels along the wave!"
                : "Click 'Start Animation' to see waves in action"}
            </p>
          </Card>
        </div>

        {/* Definition */}
        <Card>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Lightbulb className="w-6 h-6 text-blue-300" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Core Definition</h2>
              <p className="text-lg text-blue-100 leading-relaxed mb-4">
                A <span className="text-blue-300 font-semibold">wave</span> is a{" "}
                <span className="text-purple-300 font-semibold">
                  disturbance
                </span>{" "}
                that travels through{" "}
                <span className="text-green-300 font-semibold">
                  space and time
                </span>
                , transferring{" "}
                <span className="text-yellow-300 font-semibold">energy</span>{" "}
                from one place to another{" "}
                <span className="text-red-300 font-semibold">
                  without transferring matter
                </span>
                .
              </p>
              <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-yellow-300" />
                  <span className="text-yellow-300 font-medium">
                    Key Insight
                  </span>
                </div>
                <p className="text-sm text-yellow-100">
                  Think of a wave as nature's way of sending information and
                  energy across distances. The medium helps carry the wave, but
                  doesn't travel with it!
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Key Points */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-center mb-6">
            Essential Wave Concepts
          </h3>

          {keyPoints.map((point) => (
            <Card
              key={point.id}
              className={`cursor-pointer transition-all hover:bg-white/10 ${
                completedPoints.has(point.id)
                  ? "bg-green-900/20 border-green-500/30"
                  : ""
              }`}
              onClick={() => handlePointComplete(point.id)}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-lg ${
                    completedPoints.has(point.id)
                      ? "bg-green-500/20 text-green-300"
                      : "bg-blue-500/20 text-blue-300"
                  }`}
                >
                  {completedPoints.has(point.id) ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    point.icon
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">{point.title}</h4>
                  <p className="text-blue-100">{point.content}</p>
                </div>
                {!completedPoints.has(point.id) && (
                  <ArrowRight className="w-5 h-5 text-white/30" />
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Examples */}
        <Card>
          <h3 className="text-2xl font-bold text-center mb-8">
            Waves in Nature & Technology
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Current Example */}
            <div className="text-center p-6 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <div className="text-6xl mb-4">
                {examples[currentExample].icon}
              </div>
              <h4 className="text-xl font-bold mb-2">
                {examples[currentExample].title}
              </h4>
              <p className="text-blue-100 mb-4">
                {examples[currentExample].description}
              </p>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-sm text-yellow-300">
                  💡 {examples[currentExample].fact}
                </p>
              </div>
            </div>

            {/* Example Grid */}
            <div className="grid grid-cols-2 gap-3">
              {examples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentExample(index)}
                  className={`p-4 rounded-lg text-center transition-colors ${
                    index === currentExample
                      ? "bg-blue-600/30 border border-blue-400"
                      : "bg-white/5 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <div className="text-2xl mb-2">{example.icon}</div>
                  <div className="text-sm font-medium">{example.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {examples.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentExample ? "bg-blue-400" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </Card>

        {/* Completion Message */}
        {completedPoints.size === keyPoints.length && (
          <Card className="bg-green-900/20 border-green-500/30 text-center">
            <div className="flex items-center justify-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <div>
                <h4 className="text-xl font-bold text-green-300 mb-1">
                  Section Complete!
                </h4>
                <p className="text-green-200">
                  Great job understanding the fundamentals of waves. Ready for
                  the next section?
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default IntroSection;
