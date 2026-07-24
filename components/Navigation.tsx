'use client';

import { Shield } from 'lucide-react';
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-gray-800/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="font-display font-bold text-xl hidden sm:inline gradient-text">JobShield AI</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-gray-300 hover:text-white underline-gradient transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm text-gray-300 hover:text-white underline-gradient transition-colors">
            How It Works
          </a>
          <a href="#about" className="text-sm text-gray-300 hover:text-white underline-gradient transition-colors">
            About
          </a>
          <a href="#contact" className="text-sm text-gray-300 hover:text-white underline-gradient transition-colors">
            Contact
          </a>
        </div>

        {/* CTA */}
        <div className="hidden sm:block">
          <a href="#upload" className="text-sm font-semibold text-primary hover:text-accent transition-colors">
            Start Free →
          </a>
        </div>
      </div>
    </nav>
  );
}
