'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TrustScoreGaugeProps {
  score: number;
}

export default function TrustScoreGauge({ score }: TrustScoreGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = score / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(interval);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [score]);

  // Calculate colors based on score
  const getColor = () => {
    if (score >= 75) return 'text-success';
    if (score >= 50) return 'text-warning';
    return 'text-danger';
  };

  const getGradient = () => {
    if (score >= 75) return 'from-success to-success';
    if (score >= 50) return 'from-warning to-warning';
    return 'from-danger to-danger';
  };

  const rotation = (score / 100) * 180 - 90; // SVG arc rotation

  return (
    <div className="glass rounded-2xl p-8 flex flex-col items-center justify-center">
      <h3 className="text-lg font-display font-bold mb-6">Trust Score</h3>

      {/* Circular Gauge */}
      <div className="relative w-48 h-48 mb-6">
        {/* Background circle */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background arc */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-gray-700/30"
            opacity="0.3"
          />

          {/* Progress arc */}
          <motion.circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            strokeWidth="8"
            className={`transition-colors ${getColor()}`}
            strokeDasharray={`${(animatedScore / 100) * 565.48} 565.48`}
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Animated glow */}
          <circle
            cx="100"
            cy="100"
            r="95"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className={`transition-colors ${getColor()}`}
            opacity="0.3"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            className={`text-5xl font-display font-bold ${getColor()}`}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {animatedScore}
          </motion.div>
          <div className="text-sm text-gray-400 mt-2">%</div>
        </div>
      </div>

      {/* Status text */}
      <div className="text-center">
        <motion.p
          className={`text-lg font-semibold ${getColor()}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {score >= 75 && 'Appears Legitimate'}
          {score >= 50 && score < 75 && 'Requires Verification'}
          {score < 50 && 'High Risk Detected'}
        </motion.p>
        <p className="text-sm text-gray-400 mt-2">
          {score >= 75 && 'Low fraud indicators detected'}
          {score >= 50 && score < 75 && 'Some suspicious elements found'}
          {score < 50 && 'Multiple red flags present'}
        </p>
      </div>
    </div>
  );
}
