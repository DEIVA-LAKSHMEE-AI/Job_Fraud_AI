'use client';

import { motion } from 'framer-motion';

interface InvestigationCardProps {
  title: string;
  value?: string;
  icon: string;
}

export default function InvestigationCard({
  title,
  value,
  icon,
}: InvestigationCardProps) {
  const hasValue = value && value !== 'Not found';

  return (
    <motion.div
      className="glass rounded-lg p-4 h-full hover:border-primary/50 card-hover"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-semibold text-gray-300">{title}</h4>
        <span className="text-lg">{icon}</span>
      </div>

      {hasValue ? (
        <p className="text-sm font-mono text-primary break-all">{value}</p>
      ) : (
        <p className="text-xs text-gray-500 italic">Not found</p>
      )}
    </motion.div>
  );
}
