'use client';

import { motion } from 'framer-motion';
import { Download, Home, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { useInvestigationStore } from '@/lib/store';
import TrustScoreGauge from '@/components/TrustScoreGauge';
import InvestigationCard from '@/components/InvestigationCard';
import PDFGenerator from '@/lib/pdfGenerator';
import Link from 'next/link';

export default function ResultsScreen() {
  const { investigationData, reset } = useInvestigationStore();

  if (!investigationData) return null;

  const { extracted, result } = investigationData;
  const isHighRisk = result.riskLevel === 'high';
  const isMediumRisk = result.riskLevel === 'medium';

  const handleDownloadReport = async () => {
    const pdf = new PDFGenerator();
    pdf.generate(investigationData);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-display font-bold mb-2">Investigation Complete</h1>
          <p className="text-gray-400">Your job offer has been thoroughly analyzed</p>
        </motion.div>

        {/* Trust Score Section */}
        <motion.div
          className="grid lg:grid-cols-3 gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Gauge */}
          <div className="lg:col-span-1">
            <TrustScoreGauge score={result.trustScore} />
          </div>

          {/* Risk Assessment */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-8 h-full">
              <h2 className="text-2xl font-display font-bold mb-6">Risk Assessment</h2>

              {/* Risk Badge */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  {result.riskLevel === 'low' && (
                    <>
                      <CheckCircle2 className="w-8 h-8 text-success" />
                      <span className="text-2xl font-bold text-success">Low Risk</span>
                    </>
                  )}
                  {result.riskLevel === 'medium' && (
                    <>
                      <AlertCircle className="w-8 h-8 text-warning" />
                      <span className="text-2xl font-bold text-warning">Medium Risk</span>
                    </>
                  )}
                  {result.riskLevel === 'high' && (
                    <>
                      <AlertCircle className="w-8 h-8 text-danger" />
                      <span className="text-2xl font-bold text-danger">High Risk</span>
                    </>
                  )}
                </div>
                <p className="text-gray-300">{result.summary}</p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-xs text-gray-400 mb-1">Trust Score</p>
                  <p className="text-2xl font-bold text-primary">{result.trustScore}%</p>
                </div>
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <p className="text-xs text-gray-400 mb-1">Risk Level</p>
                  <p className="text-2xl font-bold text-accent capitalize">{result.riskLevel}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Suspicious Indicators */}
        {result.suspiciousIndicators.length > 0 && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className={`glass rounded-2xl p-8 border-l-4 ${
              isHighRisk ? 'border-l-danger' : 'border-l-warning'
            }`}>
              <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Suspicious Indicators Found
              </h3>
              <ul className="space-y-3">
                {result.suspiciousIndicators.map((indicator, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.05 }}
                  >
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-warning mt-2" />
                    <span className="text-gray-300">{indicator}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {/* Extracted Information */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-display font-bold mb-6">Extracted Information</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InvestigationCard
              title="Company"
              value={extracted.company}
              icon="🏢"
            />
            <InvestigationCard
              title="Recruiter"
              value={extracted.recruiter}
              icon="👤"
            />
            <InvestigationCard
              title="Email"
              value={extracted.recruiterEmail}
              icon="📧"
            />
            <InvestigationCard
              title="Phone"
              value={extracted.phoneNumber}
              icon="📞"
            />
            <InvestigationCard
              title="Website"
              value={extracted.website}
              icon="🌐"
            />
            <InvestigationCard
              title="Salary"
              value={extracted.salary}
              icon="💰"
            />
            <InvestigationCard
              title="Job Role"
              value={extracted.jobRole}
              icon="💼"
            />
            <InvestigationCard
              title="Joining Date"
              value={extracted.joiningDate}
              icon="📅"
            />
            <InvestigationCard
              title="Links Found"
              value={extracted.links?.length ? `${extracted.links.length} link(s)` : 'None'}
              icon="🔗"
            />
          </div>
        </motion.div>

        {/* Analysis Details */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="glass rounded-2xl p-8">
            <h3 className="text-lg font-display font-bold mb-4">Email Analysis</h3>
            <p className="text-gray-300 text-sm">{result.emailDomainAnalysis}</p>
          </div>
          <div className="glass rounded-2xl p-8">
            <h3 className="text-lg font-display font-bold mb-4">Company Analysis</h3>
            <p className="text-gray-300 text-sm">{result.companyAnalysis}</p>
          </div>
          <div className="glass rounded-2xl p-8">
            <h3 className="text-lg font-display font-bold mb-4">Recruiter Analysis</h3>
            <p className="text-gray-300 text-sm">{result.recruiterAnalysis}</p>
          </div>
          <div className="glass rounded-2xl p-8">
            <h3 className="text-lg font-display font-bold mb-4">Website Analysis</h3>
            <p className="text-gray-300 text-sm">{result.websiteAnalysis}</p>
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-display font-bold mb-6">Recommendations</h2>
          <div className="glass rounded-2xl p-8">
            <div className="space-y-3">
              {result.recommendations.map((rec, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + i * 0.05 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-gray-300">{rec}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={handleDownloadReport}
            className="btn-primary flex-1 sm:flex-none"
          >
            <Download className="w-5 h-5" />
            Download Report
          </button>
          <button
            onClick={reset}
            className="btn-secondary flex-1 sm:flex-none"
          >
            <Home className="w-5 h-5" />
            Analyze Another
          </button>
        </motion.div>
      </div>
    </div>
  );
}
