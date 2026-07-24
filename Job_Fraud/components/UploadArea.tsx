'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, File, AlertCircle } from 'lucide-react';
import { useInvestigationStore } from '@/lib/store';
import { isValidFileType, formatBytes, getFileExtension } from '@/lib/utils';
import FileHandler from '@/lib/fileHandler';

export default function UploadArea() {
  const [isDragging, setIsDragging] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const { setInvestigating, setInvestigationData } = useInvestigationStore();

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const processFile = async (file: File) => {
    if (!isValidFileType(file.name)) {
      setError('Unsupported file type. Supported: PDF, DOCX, PNG, JPG, WEBP, TXT');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit');
      return;
    }

    setError('');
    setFileName(file.name);
    setIsLoading(true);
    setInvestigating(true);

    try {
      const fileHandler = new FileHandler();
      const text = await fileHandler.extractText(file);
      await analyzeText(text, file.name);
    } catch (err) {
      setError('Failed to process file. Please try again.');
      setIsLoading(false);
      setInvestigating(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await processFile(files[0]);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      await processFile(files[0]);
    }
  };

  const analyzeText = async (text: string, sourceFileName: string) => {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error('Analysis failed');

      const { extracted, result } = await response.json();

      // Simulate investigation delay for animation
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setInvestigationData({
        fileName: sourceFileName,
        uploadedAt: new Date(),
        extracted,
        result,
      });
    } catch (err) {
      setError('Analysis failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextAnalysis = async () => {
    if (!textInput.trim()) {
      setError('Please paste text to analyze');
      return;
    }

    setError('');
    setFileName('pasted-text');
    setIsLoading(true);
    setInvestigating(true);

    await analyzeText(textInput, 'pasted-text');
  };

  return (
    <div id="upload" className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className={`glass rounded-2xl p-8 md:p-12 transition-all duration-300 ${
            isDragging ? 'ring-2 ring-primary border-primary' : ''
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          animate={isDragging ? { scale: 1.02 } : { scale: 1 }}
        >
          {/* Title */}
          <h2 className="text-3xl font-display font-bold mb-2">Upload Your Job Offer</h2>
          <p className="text-gray-400 mb-8">Choose one file to analyze</p>

          {/* Upload Area */}
          <motion.div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              isDragging
                ? 'border-primary bg-primary/5'
                : 'border-gray-700 hover:border-primary/50 hover:bg-primary/5'
            }`}
            whileHover={!isDragging && !isLoading ? { scale: 1.01 } : {}}
          >
            {!isLoading ? (
              <>
                <motion.div
                  animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
                  className="inline-block p-4 rounded-lg bg-primary/10 mb-4"
                >
                  <Upload className="w-8 h-8 text-primary" />
                </motion.div>
                <p className="text-lg font-semibold mb-2">Drag and drop your file here</p>
                <p className="text-sm text-gray-400 mb-4">or click to browse</p>

                <input
                  type="file"
                  id="file-input"
                  className="hidden"
                  onChange={handleFileInput}
                  accept=".pdf,.docx,.doc,.png,.jpg,.jpeg,.webp,.txt"
                  disabled={isLoading}
                />
                <label
                  htmlFor="file-input"
                  className="inline-block btn-secondary cursor-pointer"
                >
                  Select File
                </label>

                <p className="text-xs text-gray-500 mt-6">
                  Supported: PDF, DOCX, PNG, JPG, WEBP • Max 10MB
                </p>
              </>
            ) : (
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="inline-block"
                >
                  <File className="w-8 h-8 text-primary" />
                </motion.div>
                <p className="text-sm text-gray-400 mt-4">Processing file...</p>
              </div>
            )}
          </motion.div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-card text-gray-400">or paste text</span>
            </div>
          </div>

          {/* Text Input */}
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            disabled={isLoading}
            placeholder="Paste job offer email or text here..."
            className="w-full h-40 mb-4 rounded-lg bg-card/50 border border-gray-700/50 p-4 text-white placeholder-gray-500 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
          />

          {/* Error Message */}
          {error && (
            <motion.div
              className="flex items-center gap-3 p-4 rounded-lg bg-danger/10 border border-danger/30 text-danger mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </motion.div>
          )}

          {/* Analyze Button */}
          {textInput.trim() && (
            <motion.button
              onClick={handleTextAnalysis}
              disabled={isLoading}
              className="btn-primary w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🕵️ Start Investigation
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
