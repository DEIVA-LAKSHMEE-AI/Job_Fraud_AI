'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface InvestigationStep {
  icon: string;
  label: string;
  description: string;
}

const INVESTIGATION_STEPS: InvestigationStep[] = [
  { icon: '📄', label: 'Reading Document', description: 'Scanning uploaded document' },
  { icon: '✓', label: 'Text Extracted', description: 'Content successfully extracted' },
  { icon: '🧠', label: 'Extracting Information', description: 'Identifying key details' },
  { icon: '✓', label: 'Company Detected', description: 'Company information found' },
  { icon: '👤', label: 'Identifying Recruiter', description: 'Finding recruiter details' },
  { icon: '✓', label: 'Recruiter Extracted', description: 'Recruiter information confirmed' },
  { icon: '📧', label: 'Detecting Email', description: 'Email address identified' },
  { icon: '✓', label: 'Email Detected', description: 'Email verified' },
  { icon: '🌐', label: 'Detecting Website', description: 'Website URL found' },
  { icon: '✓', label: 'Website Detected', description: 'Website information extracted' },
  { icon: '📞', label: 'Detecting Phone', description: 'Phone number identified' },
  { icon: '✓', label: 'Phone Detected', description: 'Phone information confirmed' },
  { icon: '💰', label: 'Detecting Salary', description: 'Salary information found' },
  { icon: '✓', label: 'Salary Extracted', description: 'Salary data confirmed' },
  { icon: '⚠️', label: 'Analyzing Risks', description: 'Checking for suspicious patterns' },
  { icon: '✓', label: 'Risk Analysis Complete', description: 'Suspicious indicators identified' },
  { icon: '🛡️', label: 'AI Fraud Detection', description: 'Running advanced fraud checks' },
  { icon: '📊', label: 'Generating Report', description: 'Creating investigation report' },
];

export default function InvestigationScreen() {
  const [completedSteps, setCompletedSteps] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCompletedSteps((prev) =>
        prev < INVESTIGATION_STEPS.length ? prev + 1 : prev
      );
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-display font-bold mb-4">Investigating Your Job Offer</h1>
          <p className="text-gray-400">Our AI is analyzing every aspect of this offer for fraud indicators...</p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="mb-12 h-2 rounded-full bg-gray-800 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            animate={{ width: `${(completedSteps / INVESTIGATION_STEPS.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Investigation Steps */}
        <div className="space-y-3">
          {INVESTIGATION_STEPS.map((step, index) => {
            const isCompleted = index < completedSteps;
            const isActive = index === completedSteps;

            return (
              <motion.div
                key={index}
                className="glass rounded-lg p-4 flex items-center gap-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {/* Icon/Status */}
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CheckCircle2 className="w-6 h-6 text-success" />
                    </motion.div>
                  ) : isActive ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Loader2 className="w-6 h-6 text-primary" />
                    </motion.div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-600" />
                  )}
                </div>

                {/* Step Info */}
                <div className="flex-1">
                  <motion.div
                    className={`text-sm font-semibold ${
                      isCompleted
                        ? 'text-success'
                        : isActive
                        ? 'text-primary'
                        : 'text-gray-400'
                    }`}
                    animate={isActive ? { opacity: [1, 0.6, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {step.label}
                  </motion.div>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Message */}
        {completedSteps === INVESTIGATION_STEPS.length && (
          <motion.div
            className="mt-12 text-center p-6 rounded-lg bg-success/10 border border-success/20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="text-success font-semibold">✓ Investigation Complete</p>
            <p className="text-sm text-gray-400 mt-2">Generating your detailed report...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
