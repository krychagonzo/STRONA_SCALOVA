import React, { useState } from 'react';
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
import ConsultationModal from './components/ConsultationModal';

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="relative w-full min-h-screen font-sans bg-obsidian selection:bg-accent selection:text-obsidian flex flex-col items-center">
      <Navbar />
      <Hero />
      <LogoCloud />
      <Features />
      <ScalingDefinition />
      <div className="h-32 md:h-48 w-full" />
      <Philosophy />
      <Services />
      <Protocol />
      <Team />
      <FooterCTA onOpenModal={() => setModalOpen(true)} />
      <FloatingCTA onOpenModal={() => setModalOpen(true)} />
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}

export default App;
