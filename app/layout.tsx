import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'JobShield AI - Detect Fake Job Offers',
  description: 'AI-powered investigation platform that analyzes job offers, emails, PDFs, and documents to detect fraud and phishing attempts.',
  openGraph: {
    title: 'JobShield AI',
    description: 'Protect yourself from fake job offers with AI-powered analysis',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-background text-white antialiased">
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />
          <div className="absolute inset-0 opacity-40 animate-gradient-shift" style={{
            backgroundImage: `radial-gradient(at 20% 50%, rgba(99, 102, 241, 0.1) 0px, transparent 50%), radial-gradient(at 80% 80%, rgba(139, 92, 246, 0.1) 0px, transparent 50%)`,
            backgroundSize: '200% 200%',
          }} />
          
          {/* Floating particles */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-slow" />
        </div>
        
        {children}
      </body>
    </html>
  );
}
