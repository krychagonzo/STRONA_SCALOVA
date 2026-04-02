import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { LogoCloud } from './components/ui/logo-cloud';
import IntroText from './components/IntroText';
import FloatingCTA from './components/FloatingCTA';
import Features from './components/Features';
import ScalingDefinition from './components/ScalingDefinition';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import Services from './components/Services';
import FooterCTA from './components/FooterCTA';
import Team from './components/Team';

function App() {
  return (
    <main className="relative w-full min-h-screen font-sans bg-obsidian selection:bg-accent selection:text-obsidian flex flex-col items-center">
      <Navbar />
      <Hero />
      <LogoCloud />
      <Features />
      <ScalingDefinition />
      <Philosophy />
      <Services />
      <Protocol />
      <Team />
      <FooterCTA />
      <FloatingCTA />
    </main>
  );
}

export default App;
