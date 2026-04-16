import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import StronaAI from './pages/StronaAI';
import Kampanie from './pages/Kampanie';
import StatyczneTresci from './pages/StatyczneTresci';
import Automatyzacje from './pages/Automatyzacje';
import SprzedazOferta from './pages/SprzedazOferta';
import AIwFirmie from './pages/AIwFirmie';
import RuchomeTresci from './pages/RuchomeTresci';
import ZlotyNumer from './pages/ZlotyNumer';

function HomePage({ onOpenModal }) {
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
      <FooterCTA onOpenModal={onOpenModal} />
      <FloatingCTA onOpenModal={onOpenModal} />
    </main>
  );
}

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage onOpenModal={() => setModalOpen(true)} />} />
        <Route path="/uslugi/strona-ai" element={<StronaAI onOpenModal={() => setModalOpen(true)} />} />
        <Route path="/uslugi/kampanie" element={<Kampanie onOpenModal={() => setModalOpen(true)} />} />
        <Route path="/uslugi/statyczne-tresci" element={<StatyczneTresci onOpenModal={() => setModalOpen(true)} />} />
        <Route path="/uslugi/automatyzacje" element={<Automatyzacje onOpenModal={() => setModalOpen(true)} />} />
        <Route path="/uslugi/sprzedaz" element={<SprzedazOferta onOpenModal={() => setModalOpen(true)} />} />
        <Route path="/uslugi/ai-w-firmie" element={<AIwFirmie onOpenModal={() => setModalOpen(true)} />} />
        <Route path="/uslugi/ruchome-tresci" element={<RuchomeTresci onOpenModal={() => setModalOpen(true)} />} />
        <Route path="/uslugi/zloty-numer" element={<ZlotyNumer onOpenModal={() => setModalOpen(true)} />} />
      </Routes>
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default App;
