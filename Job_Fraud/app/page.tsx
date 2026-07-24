'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import UploadArea from '@/components/UploadArea';
import InvestigationScreen from '@/components/InvestigationScreen';
import ResultsScreen from '@/components/ResultsScreen';
import Footer from '@/components/Footer';
import { useInvestigationStore } from '@/lib/store';

export default function Home() {
  const { investigationData, isInvestigating } = useInvestigationStore();

  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      
      {!investigationData ? (
        <>
          <Hero />
          <UploadArea />
        </>
      ) : isInvestigating ? (
        <InvestigationScreen />
      ) : (
        <ResultsScreen />
      )}
      
      {!investigationData && <Footer />}
    </main>
  );
}
