'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* Animated Shield Illustration */}
        <motion.div
          className="mb-12 inline-flex"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="relative w-24 h-24 md:w-32 md:h-32">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl blur-2xl opacity-40"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl border border-primary/30 flex items-center justify-center glow">
              <Shield className="w-12 h-12 md:w-16 md:h-16 text-primary" />
            </div>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Don't Let Fake Job Offers{' '}
          <span className="gradient-text">Steal Your Future</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Upload a job offer, email, PDF, DOCX, or screenshot and let our AI perform a complete investigation before you share your personal information.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link href="#upload" className="btn-primary text-lg">
            <Shield className="w-5 h-5" />
            Start Investigation
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { number: '10K+', label: 'Offers Analyzed' },
            { number: '99.8%', label: 'Accuracy Rate' },
            { number: '50+', label: 'Fraud Patterns' },
            { number: '24/7', label: 'AI Analysis' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.number}</div>
              <div className="text-xs md:text-sm text-gray-400 mt-2">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
