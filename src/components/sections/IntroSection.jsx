import React from "react";
import Card from "../ui/Card";

const IntroSection = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          What are Waves? 🌊
        </h2>
        <Card className="bg-blue-900/30 text-left">
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            A <span className="text-blue-400 font-semibold">wave</span> is a
            disturbance that travels through space and time, transferring energy
            from one place to another without transferring matter.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <Card className="bg-green-900/20">
              <h3 className="text-green-400 font-semibold mb-2">
                Examples in Nature:
              </h3>
              <ul className="text-gray-300 space-y-1">
                <li>• Ocean waves</li>
                <li>• Sound waves</li>
                <li>• Light waves</li>
                <li>• Earthquake waves</li>
              </ul>
            </Card>
            <Card className="bg-purple-900/20">
              <h3 className="text-purple-400 font-semibold mb-2">
                Key Characteristic:
              </h3>
              <p className="text-gray-300">
                Waves carry <span className="text-yellow-400">energy</span> but
                not matter. The medium particles vibrate but don't travel with
                the wave.
              </p>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default IntroSection;
